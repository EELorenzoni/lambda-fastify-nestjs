import { Module } from '@nestjs/common';
import { DecisionListsModule } from './decision-lists/decision-lists.module';

@Module({
    imports: [DecisionListsModule],
})
export class AppModule { }