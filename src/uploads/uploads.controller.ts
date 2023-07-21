import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import * as AWS from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { UploadInput } from './uploads.dto';

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
      const objectName = `${
        (uploadInput.id + '_' || '') + Date.now() + '_' + file.originalname
      }`;
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
      console.log(e);
    }
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
      const objectName = `${
        (uploadInput.id + '_' || '') + Date.now() + '_' + file.originalname
      }`;
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
