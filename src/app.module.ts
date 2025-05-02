import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DecisionListsModule } from './decision-lists/decision-lists.module';

@Module({
    imports: [DecisionListsModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }