import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class BcryptHelper {
  async hash(secret: string): Promise<string> {
    const salt = 10;
    return bcrypt.hash(secret, salt);
  }

  async compare(secret: string, hashedSecret: string): Promise<boolean> {
    return bcrypt.compare(secret, hashedSecret);
  }
}
