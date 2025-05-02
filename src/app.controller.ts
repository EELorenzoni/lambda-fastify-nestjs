import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('v1/api/decisionsLists')
export class AppController {
    constructor(private readonly appService: AppService) { }

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Get(':name')
    getHelloWithParam(@Param('name') name: string): string {
        console.log(name);
        return this.appService.getHelloWithParam(name);
    }
}