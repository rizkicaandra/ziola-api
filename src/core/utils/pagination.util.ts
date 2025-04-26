import { Injectable } from '@nestjs/common';
import { PaginationParams } from '../interfaces';

@Injectable()
export class PaginationUtil {
  applyPagination<T extends { skip?: number; take?: number }>(
    paginationDto: PaginationParams,
    options: T,
  ) {
    if (!paginationDto.isPagination) return options;

    const page = paginationDto.page ?? 1;
    const pageSize = paginationDto.pageSize ?? 5;
    const skip = (page - 1) * pageSize;

    options.skip = skip;
    options.take = pageSize;

    return options;
  }
}
