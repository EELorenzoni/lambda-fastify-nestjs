import { Module } from '@nestjs/common';
import { DecisionListsService } from './decision-lists.service';
import { DecisionListsController } from './decision-lists.controller';

@Module({
  controllers: [DecisionListsController],
  providers: [DecisionListsService],
})
export class DecisionListsModule {}
