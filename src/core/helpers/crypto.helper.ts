import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
import { ResponseGeneratorService } from '../responses';
import { AppErrorCode } from '../enums';

@Injectable()
export class CryptoHelper {
  constructor(
    private readonly configService: ConfigService,
    private readonly response: ResponseGeneratorService,
  ) {}

  /**
   * Generate a 256-bit key based on the configured key.
   * This method is used to generate a key for AES-GCM encryption.
   */
  generateKey(): string {
    const configKey = this.configService.get<string>('CRYPTO_PASSWORD_KEY');

    if (configKey === undefined) {
      throw this.response.badRequest(AppErrorCode.CONFIGURATION_ERROR);
    }

    const sha256 = crypto.createHash('sha256');
    const hash = sha256.update(configKey).digest('hex');
    return hash.substring(0, 32);
  }

  encryptAesGcm(plainText: string | object): string | undefined {
    try {
      if (typeof plainText === 'object') {
        plainText = JSON.stringify(plainText);
      } else {
        plainText = String(plainText);
      }

      const iv = crypto.randomBytes(16);
      const encryptionKey = this.generateKey();

      const cipher = crypto.createCipheriv('aes-256-gcm', encryptionKey, iv);
      let encrypted = cipher.update(plainText, 'utf8', 'hex');
      encrypted += cipher.final('hex');

      return iv.toString('hex') + encrypted;
    } catch (error) {
      console.log('error encrypt aes gcm :>> ', error);
      return undefined;
    }
  }

  decryptAesGcm(cipherText: string): string {
    try {
      const iv = Buffer.from(cipherText.slice(0, 32), 'hex');
      const encryptedText = cipherText.slice(32);
      const encryptionKey = this.generateKey();
      const decipher = crypto.createDecipheriv(
        'aes-256-gcm',
        encryptionKey,
        iv,
      );
      const decrypted = decipher.update(encryptedText, 'hex', 'utf8');

      return decrypted;
    } catch (error) {
      console.log('error decrypt aes gcm :>> ', error);
      return '';
    }
  }

  decryptHmacSha256(plainText: string): string | undefined {
    try {
      const cryptoKey = this.configService.get<string>('CRYPTO_PASSWORD_KEY');

      if (cryptoKey === undefined) {
        throw this.response.badRequest(AppErrorCode.CONFIGURATION_ERROR);
      }

      return crypto
        .createHmac('sha256', cryptoKey)
        .update(plainText)
        .digest('base64');
    } catch (error) {
      console.log('error decrypt hmac sha256 :>> ', error);
      return undefined;
    }
  }
}
