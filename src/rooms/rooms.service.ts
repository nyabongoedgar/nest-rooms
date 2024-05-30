import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from './room.entity';

import { QueryHelperService } from '../query-helper/query-helper.service';
import { Filter, Sort } from '../query-helper/types';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private readonly roomsRepository: Repository<Room>,
    private readonly queryHelperService: QueryHelperService,
  ) {}

  private readonly logger = new Logger(RoomsService.name);

  async getRooms(
    page: number,
    limit: number,
    filters: Filter[],
    sort: Sort[],
  ): Promise<Room[]> {
    try {
      const queryBuilder = this.roomsRepository.createQueryBuilder('room');

      this.queryHelperService.applyFilters(queryBuilder, filters);

      this.queryHelperService.applySorting(queryBuilder, sort);

      queryBuilder.skip((page - 1) * limit).take(limit);

      const rooms = await queryBuilder.getMany();

      return rooms;
    } catch (error) {
      this.logger.error('Failed to get rooms', error.stack);
      throw new InternalServerErrorException('Failed to get rooms');
    }
  }
}
