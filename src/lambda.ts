import { NestFactory } from "@nestjs/core";
import { APIGatewayProxyEvent, Callback, Context, Handler } from "aws-lambda";
import serverlessFastify from "@fastify/aws-lambda";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";

import { AppModule } from "./app.module";

let cachedHandler: Handler;

async function initFastify(): Promise<Handler> {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter()
    );
    await app.init();

    const fastifyApp = app.getHttpAdapter().getInstance();

    return serverlessFastify(fastifyApp);
}

export const handler = async (event: APIGatewayProxyEvent, context: Context, callback: Callback) => {
    cachedHandler = cachedHandler ?? (await initFastify());
    return cachedHandler(event, context, callback);
};