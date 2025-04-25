import { Get, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {


    @Get(':name')
    getHelloWithParam(name: string): string {
        console.log(name);
        return `¡Hola ${name} desde NestJS!`;
    }

    @Get()
    getHello(): string {
        return '¡Hola Mundo desde NestJS!';
    }

}