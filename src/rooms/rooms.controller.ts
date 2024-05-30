import {
  Get,
  Query,
  Controller,
  ValidationPipe,
  UsePipes,
  BadRequestException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { GetRoomsQueryDto } from './dto/GetRoomsQueryDto.dto';
import { RoomsService } from './rooms.service';

@Controller('api/rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  private readonly logger = new Logger(RoomsController.name);

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  async getRooms(@Query() query: GetRoomsQueryDto) {
    const { page, limit, filters, sort } = query;
    if (page < 1 || limit < 1) {
      throw new BadRequestException('Page and limit must be greater than 0');
    }
    try {
      this.logger.log(`Fetching rooms with query: ${JSON.stringify(query)}`);
      const rooms = await this.roomsService.getRooms(
        Number(page),
        Number(limit),
        filters,
        sort,
      );
      this.logger.log(`Successfully fetched rooms: ${JSON.stringify(rooms)}`);
      return rooms;
    } catch (error) {
      this.logger.error('Failed to retrieve rooms', error.stack);
      throw new InternalServerErrorException('Failed to retrieve rooms');
    }
  }
}
