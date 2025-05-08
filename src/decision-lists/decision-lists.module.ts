import { Module } from '@nestjs/common';
import { DecisionListsService } from './services/decision-lists.service';
import { DecisionListsController } from './controllers/decision-lists.controller';
import { DecisionListsDatabaseRepository } from './repositories/decision-lists-database.repository';
import { DecisionListsCacheRespository } from './repositories/decision-lists-cache-repository';

@Module({
  controllers: [DecisionListsController],
  providers: [DecisionListsService,
    DecisionListsDatabaseRepository,
    DecisionListsCacheRespository],
})
export class DecisionListsModule { }
