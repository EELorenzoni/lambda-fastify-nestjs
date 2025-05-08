import { NestFactory } from "@nestjs/core/nest-factory";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import { AppModule } from "./app.module";


async function bootstrap() {
    //   app con fastify
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter()
    );
    // app con express
    // const app = await NestFactory.create(AppModule);
    await app.listen(3000);
}
bootstrap();