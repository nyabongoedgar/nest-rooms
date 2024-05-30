import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SelectQueryBuilder } from 'typeorm/query-builder/SelectQueryBuilder';
import { QueryHelperService } from '../query-helper.service';
import { Room } from '../../rooms/room.entity';
import { Sort } from '../types';

describe('QueryHelperService', () => {
  let service: QueryHelperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QueryHelperService,
        {
          provide: getRepositoryToken(Room),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<QueryHelperService>(QueryHelperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('applyFilters', () => {
    it('should apply filters correctly', () => {
      const queryBuilderMock = {
        andWhere: jest.fn(),
      } as unknown as SelectQueryBuilder<any>;

      const filters = [{ field: 'name', value: 'John', operator: 'equals' }];
      service.applyFilters(queryBuilderMock, filters);

      expect(queryBuilderMock.andWhere).toHaveBeenCalledWith('name = :value', {
        value: 'John',
      });
    });
  });

  describe('applySorting', () => {
    it('should apply sorting correctly', () => {
      const queryBuilderMock = {
        addOrderBy: jest.fn(),
      } as unknown as SelectQueryBuilder<any>;

      const sorting: Sort[] = [{ field: 'name', order: 'ASC' }];
      service.applySorting(queryBuilderMock, sorting);

      expect(queryBuilderMock.addOrderBy).toHaveBeenCalledWith('name', 'ASC');
    });
  });

  describe('applyPagination', () => {
    it('should apply pagination correctly', () => {
      const queryBuilderMock = {
        skip: jest.fn().mockReturnThis(),
        take: jest.fn().mockReturnThis(),
      } as unknown as SelectQueryBuilder<any>;

      const page = 2;
      const limit = 10;
      service.applyPagination(queryBuilderMock, page, limit);

      expect(queryBuilderMock.skip).toHaveBeenCalledWith((page - 1) * limit);
      expect(queryBuilderMock.take).toHaveBeenCalledWith(limit);
    });
  });
});
