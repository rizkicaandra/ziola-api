import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class CommonHelper {
  generatePassword(
    length: number = 20,
    characters: string = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  ): string {
    return Array.from(crypto.randomFillSync(new Uint32Array(length)))
      .map((x) => characters[x % characters.length])
      .join('');
  }
}
