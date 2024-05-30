import { Injectable } from '@nestjs/common';
import { SelectQueryBuilder } from 'typeorm';
import { Filter, Sort } from './types';

@Injectable()
export class QueryHelperService {
  applyFilters(
    queryBuilder: SelectQueryBuilder<any>,
    filters: Filter[],
  ): SelectQueryBuilder<any> {
    filters.forEach((filter) => {
      const { field, value, operator } = filter;
      switch (operator) {
        case 'equals':
          queryBuilder.andWhere(`${field} = :value`, { value });
          break;
        case 'not':
          queryBuilder.andWhere(`${field} != :value`, { value });
          break;
        case 'gt':
          queryBuilder.andWhere(`${field} > :value`, { value });
          break;
        case 'gte':
          queryBuilder.andWhere(`${field} >= :value`, { value });
          break;
        case 'lt':
          queryBuilder.andWhere(`${field} < :value`, { value });
          break;
        case 'lte':
          queryBuilder.andWhere(`${field} <= :value`, { value });
          break;
        case 'like':
          queryBuilder.andWhere(`${field} LIKE :value`, {
            value: `%${value}%`,
          });
          break;
        case 'in':
          queryBuilder.andWhere(`${field} IN (:...values)`, { values: value });
          break;
        case 'notIn':
          queryBuilder.andWhere(`${field} NOT IN (:...values)`, {
            values: value,
          });
          break;
        case 'isNull':
          queryBuilder.andWhere(`${field} IS NULL`);
          break;
        case 'isNotNull':
          queryBuilder.andWhere(`${field} IS NOT NULL`);
          break;
        default:
          break;
      }
    });
    return queryBuilder;
  }

  applySorting(
    queryBuilder: SelectQueryBuilder<any>,
    sort: Sort[],
  ): SelectQueryBuilder<any> {
    sort.forEach(({ field, order }) => {
      queryBuilder.addOrderBy(field, order.toUpperCase() as 'ASC' | 'DESC');
    });
    return queryBuilder;
  }

  applyPagination(
    queryBuilder: SelectQueryBuilder<any>,
    page: number,
    limit: number,
  ): SelectQueryBuilder<any> {
    const skip = (page - 1) * limit;
    return queryBuilder.skip(skip).take(limit);
  }
}
