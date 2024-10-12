import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import * as AWS from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { UploadInput } from './uploads.dto';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

@Controller('uploads')
export class UploadsController {
  constructor(private readonly configService: ConfigService) {}
  @Post('')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@Body() uploadInput: UploadInput, @UploadedFile() file) {
    const BUCKET_NAME = this.configService.get('AWS_BUCKEY_NAME');
    AWS.config.update({
      credentials: {
        accessKeyId: this.configService.get('AWS_ACCESS_KEY'),
        secretAccessKey: this.configService.get('AWS_SECRET_KEY'),
      },
    });
    try {
      const hasCustomPath = uploadInput && uploadInput.path;
      const objectName = `${uuidv4() + '_' + Date.now()}`;
      const Key = hasCustomPath
        ? uploadInput.path + '/' + objectName
        : objectName;
      await new AWS.S3()
        .putObject({
          Body: file.buffer,
          Bucket: BUCKET_NAME,
          Key,
          ACL: 'public-read',
          ContentType: file.mimetype,
        })
        .promise();

      const url = hasCustomPath
        ? `${this.configService.get('CLOUD_FRONT_DOMAIN')}/${
            uploadInput.path
          }/${objectName}`
        : `${this.configService.get('CLOUD_FRONT_DOMAIN')}/${objectName}`;
      return { url };
    } catch (e) {
      return {
        ok: false,
        error: 'upload failed',
      };
    }
  }

  @Get('base64')
  async uploadImageBase64(@Query() query: { url: string }) {
    const response = await axios.get(query.url, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers':
          'Content-Type, Authorization, X-Requested-With',
        'Content-Type': 'application/json',
      },
      responseType: 'arraybuffer',
    });
    // ArrayBuffer를 Base64 문자열로 변환
    const base64 = Buffer.from(response.data, 'binary').toString('base64');
    return `data:${response.headers['content-type']};base64,${base64}`;
  }

  @Post('/pdf')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (req, file, callback) => {
        if (file.mimetype !== 'application/pdf') {
          return callback(new Error('Only PDF files are allowed!'), false);
        }
        callback(null, true);
      },
      limits: {
        fileSize: 50 * 1024 * 1024, // 50MB
      },
    }),
  )
  async uploadPDF(@Body() uploadInput: UploadInput, @UploadedFile() file) {
    const BUCKET_NAME = this.configService.get('AWS_BUCKEY_NAME');
    AWS.config.update({
      credentials: {
        accessKeyId: this.configService.get('AWS_ACCESS_KEY'),
        secretAccessKey: this.configService.get('AWS_SECRET_KEY'),
      },
    });
    try {
      const hasCustomPath = uploadInput && uploadInput.path;
      const objectName = `${uuidv4() + Date.now()}`;
      const Key = hasCustomPath
        ? uploadInput.path + '/' + objectName
        : objectName;

      await new AWS.S3()
        .putObject({
          Body: file.buffer,
          Bucket: BUCKET_NAME,
          Key,
          ACL: 'public-read',
          ContentType: file.mimetype,
        })
        .promise();
      const url = hasCustomPath
        ? `${this.configService.get('CLOUD_FRONT_DOMAIN')}/${
            uploadInput.path
          }/${objectName}`
        : `${this.configService.get('CLOUD_FRONT_DOMAIN')}/${objectName}`;

      return { url };
    } catch (e) {
      if (e.message && e.message.includes('File too large')) {
        throw new BadRequestException('File size exceeds the 50MB limit.');
      }
    }
  }
}
