import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  SettlementRequest,
  SettlementRequestStatus,
} from './entities/settlement-request.entity';
import {
  CreateSettlementRequestInput,
  CreateSettlementRequestOutput,
} from './dtos/settlement-request/create-settlement-request.dto';
import { TelegramService } from 'src/telegram/telegram.service';
import { User } from 'src/users/entities/user.entity';
import { GetSettlementRequestsOutput } from './dtos/settlement-request/get-settlement-requests.dto';
import { GetMySettlementRequestOutput } from './dtos/settlement-request/get-my-settlement-request.dto';
import {
  UpdateSettlementRequestInput,
  UpdateSettlementRequestOutput,
} from './dtos/settlement-request/update-settlement-request.dto';
import { GetMySettlementRequestsOutput } from './dtos/settlement-request/get-my-settlement-requests.dto';
import { PointTransactionService } from './point-transaction.service';
import { TransactionType } from './entities/point-transaction.entity';

@Injectable()
export class SettlementRequestService {
  constructor(
    @InjectRepository(SettlementRequest)
    private readonly settlementRequest: Repository<SettlementRequest>,
    private readonly telegramService: TelegramService,
    private readonly pointTransactionService: PointTransactionService,
  ) {}

  async createSettlementRequest(
    user: User,
    createSettlementRequestInput: CreateSettlementRequestInput,
  ): Promise<CreateSettlementRequestOutput> {
    try {
      const existingSettlementRequest = await this.settlementRequest.findOne({
        where: {
          user: {
            id: user.id,
          },
          status: SettlementRequestStatus.Pending,
        },
      });
      if (existingSettlementRequest) {
        await this.settlementRequest.delete(existingSettlementRequest.id);
      }
      const newSettlementRequest = this.settlementRequest.create({
        ...createSettlementRequestInput,
        user,
      });
      await this.settlementRequest.save(newSettlementRequest);
      await this.telegramService.sendMessageToTelegram({
        message: `
              정산신청이 들어왔습니다.
              계좌주: ${newSettlementRequest.accountHolder}
              계좌번호: ${newSettlementRequest.accountNumber}
              은행명: ${newSettlementRequest.bankName}
              금액: ${newSettlementRequest.amount}
              이메일: ${user.email}
            `,
        channelId: Number(process.env.TELEGRAM_ALRAM_CHANNEL),
      });
      return { ok: true };
    } catch (e) {
      return { ok: false, error: 'Cannot create settlement request' };
    }
  }

  async getSettlementRequests(): Promise<GetSettlementRequestsOutput> {
    try {
      const settlementRequests = await this.settlementRequest.find({
        relations: {
          user: true,
        },
        order: {
          created_at: 'DESC',
        },
      });
      return { ok: true, settlementRequests };
    } catch {
      return { ok: false, error: 'Cannot get settlement requests' };
    }
  }

  async updateSettlementRequest(
    updateSettlementRequestInput: UpdateSettlementRequestInput,
  ): Promise<UpdateSettlementRequestOutput> {
    try {
      const { id, status } = updateSettlementRequestInput;
      const settlementRequest = await this.settlementRequest.findOne({
        where: {
          id,
        },
        relations: {
          user: true,
        },
      });
      if (!settlementRequest) {
        return { ok: false, error: 'Settlement request not found' };
      }
      // 정산 승인시, 포안트 차감
      if (status === SettlementRequestStatus.Approved) {
        await this.pointTransactionService.createPointTransaction(
          settlementRequest.user,
          {
            point: -settlementRequest.amount,
            type: TransactionType.WITHDRAW,
            description: '포인트 출금',
          },
        );
      }
      await this.settlementRequest.save({
        id: settlementRequest.id,
        status,
      });
      return { ok: true };
    } catch {
      return { ok: false, error: 'Cannot update settlement request' };
    }
  }

  async getMySettlementRequest(
    user: User,
  ): Promise<GetMySettlementRequestOutput> {
    try {
      const settlementRequest = await this.settlementRequest.findOne({
        where: {
          user: {
            id: user.id,
          },
          status: SettlementRequestStatus.Pending,
        },
      });
      if (!settlementRequest) {
        return { ok: false, error: 'Settlement request not found' };
      }
      return { ok: true, settlementRequest };
    } catch {
      return { ok: false, error: 'Cannot get my settlement request' };
    }
  }

  async getMySettlementRequests(
    user: User,
  ): Promise<GetMySettlementRequestsOutput> {
    try {
      const settlementRequests = await this.settlementRequest.find({
        where: {
          user: {
            id: user.id,
          },
        },
        order: {
          created_at: 'DESC',
        },
      });
      return { ok: true, settlementRequests };
    } catch {
      return { ok: false, error: 'Cannot get my settlement requests' };
    }
  }
}
