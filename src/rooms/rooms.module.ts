import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { QueryHelperModule } from '../query-helper/query-helper.module';
import { Room } from './room.entity';

@Module({
  imports: [QueryHelperModule, TypeOrmModule.forFeature([Room])],
  providers: [RoomsService],
  controllers: [RoomsController],
})
export class RoomsModule {}
