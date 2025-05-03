import { Test, TestingModule } from '@nestjs/testing';
import { DecisionListsService } from './decision-lists.service';

describe('DecisionListsService', () => {
  let service: DecisionListsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DecisionListsService],
    }).compile();

    service = module.get<DecisionListsService>(DecisionListsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
