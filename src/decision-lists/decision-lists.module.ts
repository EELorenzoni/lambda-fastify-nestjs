import { Module } from '@nestjs/common';
import { DecisionListsService } from './services/decision-lists.service';
import { DecisionListsController } from './controllers/decision-lists.controller';
import { DecisionListsRepository } from './repositories/decision-lists.repository';

@Module({
  controllers: [DecisionListsController],
  providers: [DecisionListsService, DecisionListsRepository],
})
export class DecisionListsModule { }
