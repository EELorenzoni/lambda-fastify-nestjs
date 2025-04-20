/**
 * AWS Lambda handler for a NestJS application using Fastify as the HTTP adapter.
 * This handler initializes a Fastify-based NestJS application and serves it
 * using the `@fastify/aws-lambda` package to handle API Gateway events.
 *
 * The handler uses a cached instance of the Fastify server to improve performance
 * by avoiding reinitialization on subsequent invocations.
 *
 * @param event - The API Gateway Proxy Event containing the HTTP request details.
 * @param context - The Lambda execution context.
 * @param callback - The callback function to return the response.
 * @returns A Promise resolving to the Lambda response.
 */
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
