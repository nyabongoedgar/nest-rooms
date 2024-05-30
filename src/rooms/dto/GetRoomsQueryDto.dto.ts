import { Type } from 'class-transformer';
import { IsNumber, IsString, IsArray } from 'class-validator';
import { TransformJsonStringArrayToClassArray } from './transform-utility';
import { ApiProperty } from '@nestjs/swagger';

class Filter {
  @IsString()
  field: string;

  @IsString()
  value: string | number;

  @IsString()
  operator: string;
}

class Sort {
  @IsString()
  field: string;
  @IsString()
  order: 'ASC' | 'DESC';
}

export class GetRoomsQueryDto {
  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  page: number;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  limit: number;

  @ApiProperty()
  @TransformJsonStringArrayToClassArray()
  @Type(() => Filter)
  filters?: Filter[];

  @ApiProperty()
  @TransformJsonStringArrayToClassArray()
  @IsArray()
  sort?: Sort[];
}
