import { Test, TestingModule } from '@nestjs/testing';
import { RoomsController } from '../rooms.controller';
import { RoomsService } from '../rooms.service';
import { GetRoomsQueryDto } from '../dto/GetRoomsQueryDto.dto';
import { InternalServerErrorException } from '@nestjs/common';
import { Logger } from '@nestjs/common';

describe('RoomsController', () => {
  let controller: RoomsController;
  let service: RoomsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomsController],
      providers: [
        {
          provide: RoomsService,
          useValue: {
            getRooms: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<RoomsController>(RoomsController);
    service = module.get<RoomsService>(RoomsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getRooms', () => {
    it('should call RoomsService.getRooms with correct parameters', async () => {
      const query: GetRoomsQueryDto = {
        page: 1,
        limit: 10,
        filters: [{ field: 'name', value: 'Room A', operator: 'equals' }],
        sort: [{ field: 'name', order: 'ASC' }],
      };

      jest.spyOn(service, 'getRooms').mockResolvedValue([]);
      const loggerSpy = jest.spyOn(Logger.prototype, 'log');

      await controller.getRooms(query);

      expect(service.getRooms).toHaveBeenCalledWith(
        1,
        10,
        [{ field: 'name', value: 'Room A', operator: 'equals' }],
        [{ field: 'name', order: 'ASC' }],
      );
      expect(loggerSpy).toHaveBeenCalledWith(
        `Fetching rooms with query: ${JSON.stringify(query)}`,
      );
    });

    it('should handle missing filters and sort', async () => {
      const query: GetRoomsQueryDto = {
        page: 1,
        limit: 10,
        filters: undefined,
        sort: undefined,
      };

      jest.spyOn(service, 'getRooms').mockResolvedValue([]);
      const loggerSpy = jest.spyOn(Logger.prototype, 'log');

      await controller.getRooms(query);

      expect(service.getRooms).toHaveBeenCalledWith(
        1,
        10,
        undefined,
        undefined,
      );
      expect(loggerSpy).toHaveBeenCalledWith(
        `Fetching rooms with query: ${JSON.stringify(query)}`,
      );
    });

    it('should handle service errors', async () => {
      const query: GetRoomsQueryDto = {
        page: 1,
        limit: 10,
        filters: undefined,
        sort: undefined,
      };

      jest
        .spyOn(service, 'getRooms')
        .mockRejectedValue(new Error('Something went wrong'));
      const loggerSpy = jest.spyOn(Logger.prototype, 'error');

      await expect(controller.getRooms(query)).rejects.toThrow(
        InternalServerErrorException,
      );
      expect(loggerSpy).toHaveBeenCalledWith(
        'Failed to retrieve rooms',
        expect.any(String),
      );
    });
  });
});
