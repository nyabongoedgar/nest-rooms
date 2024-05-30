import { Type } from 'class-transformer';
import { IsNumber, IsString, IsArray } from 'class-validator';
import { TransformJsonStringArrayToClassArray } from './transform-utility';

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

export class FilterContainerDto {
  @TransformJsonStringArrayToClassArray()
  @IsArray()
  filters: Filter[];
}

export class SortContainerDto {
  @TransformJsonStringArrayToClassArray()
  @IsArray()
  sorts: Sort[];
}

export class GetRoomsQueryDto {
  @IsNumber()
  @Type(() => Number)
  page: number;

  @IsNumber()
  @Type(() => Number)
  limit: number;

  @TransformJsonStringArrayToClassArray()
  @Type(() => Filter)
  filters?: Filter[];

  @TransformJsonStringArrayToClassArray()
  @IsArray()
  sort?: Sort[];
}
