import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonUtils {
  // transform string to boolean
  transformBoolean(value: string): boolean | string {
    let result;

    if (value === 'true' || value === '1') {
      result = true;
    } else if (value === 'false' || value === '0') {
      result = false;
    } else {
      result = value;
    }

    return result;
  }

  isEpoch(value?: number): boolean {
    if (!value) {
      return false;
    }

    if (!Number.isInteger(value) || value <= 0) {
      return false;
    }

    // Check if the value is a reasonable timestamp (e.g., within a reasonable date range)
    const date = new Date(value * 1000);
    return date.getTime() > 0;
  }
}
