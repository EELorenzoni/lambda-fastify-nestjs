import { Test, TestingModule } from '@nestjs/testing';
import { DecisionListsController } from './decision-lists.controller';
import { DecisionListsService } from './decision-lists.service';

describe('DecisionListsController', () => {
  let controller: DecisionListsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DecisionListsController],
      providers: [DecisionListsService],
    }).compile();

    controller = module.get<DecisionListsController>(DecisionListsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
