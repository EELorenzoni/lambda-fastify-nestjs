# Proyecto NestJS Serverless en AWS Lambda con Fastify

Este proyecto demuestra cómo crear y desplegar una aplicación NestJS en AWS Lambda utilizando Serverless Framework y Fastify, sin depender del CLI de NestJS.

## Requisitos Previos

* Node.js y npm instalados.
* Cuenta de AWS y AWS CLI configurado.
* Cuenta de GitHub.
* Serverless Framework instalado (`npm install -g serverless`).
* Configuración de claves SSH para GitHub (opcional, pero recomendado).

## Configuración de claves SSH para GitHub (Opcional)

Si deseas usar claves SSH separadas para diferentes cuentas de GitHub, sigue estos pasos:

1. **Crea el archivo `~/.ssh/config`:**

    ```bash
    mkdir ~/.ssh
    touch ~/.ssh/config
    nano ~/.ssh/config
    ```

2. **Configura el archivo `config`:**

    Añade la siguiente configuración, ajustando las rutas y nombres de host según tus necesidades:

    ```
    # Cuenta personal
    Host github.com-personal
      HostName github.com
      User git
      IdentityFile ~/.ssh/id_ed25519_personal

    # Cuenta de trabajo
    Host github.com-trabajo
      HostName github.com
      User git
      IdentityFile ~/.ssh/id_ed25519_trabajo
    ```

3. **Genera las claves SSH:**

    ```bash
    ssh-keygen -t ed25519 -C "tu_correo_personal@ejemplo.com" -f ~/.ssh/id_ed25519_personal
    ssh-keygen -t ed25519 -C "tu_correo_trabajo@ejemplo.com" -f ~/.ssh/id_ed25519_trabajo
    ```

4. **Añade las claves públicas a tus cuentas de GitHub:**

    Copia el contenido de `~/.ssh/id_ed25519_personal.pub` y `~/.ssh/id_ed25519_trabajo.pub` y añádelas a la configuración SSH de tus cuentas de GitHub.

5. **Clona el repositorio usando la URL SSH correcta:**

    ```bash
    git clone git@github.com-personal:usuario/repositorio.git
    # o
    git clone git@github.com-trabajo:organizacion/repositorio.git
    ```

## Crear el Proyecto NestJS sin CLI

1. **Crea el directorio del proyecto:**

    ```bash
    mkdir mi-proyecto-nestjs
    cd mi-proyecto-nestjs
    ```

2. **Inicializa un proyecto Node.js:**

    ```bash
    npm init -y
    ```

3. **Instala NestJS y dependencias:**

    ```bash
    npm install @nestjs/core @nestjs/common rxjs reflect-metadata @nestjs/platform-fastify aws-lambda-fastify
    npm install typescript ts-node @types/node --save-dev
    ```

4. **Configura TypeScript (tsconfig.json):**

    Crea un archivo `tsconfig.json` con la siguiente configuración:

    ```json
    {
      "compilerOptions": {
        "module": "commonjs",
        "esModuleInterop": true,
        "target": "es2017",
        "noImplicitAny": true,
        "moduleResolution": "node",
        "sourceMap": true,
        "outDir": "dist",
        "baseUrl": ".",
        "emitDecoratorMetadata": true,
        "experimentalDecorators": true,
        "resolveJsonModule": true,
        "paths": {
          "*": [
            "node_modules/*"
          ]
        }
      },
      "include": [
        "src/**/*"
      ]
    }
    ```

5. **Estructura del proyecto:**

    * `src/main.ts`:

        ```typescript
        import { NestFactory } from '@nestjs/core';
        import { AppModule } from './app.module';
        import { configure as serverlessFastify } from '@vendia/serverless-fastify';
        import { Callback, Context, Handler } from 'aws-lambda';
        import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

        let cachedServer: Handler;

        async function bootstrap(): Promise<Handler> {
          if (!cachedServer) {
            const app = await NestFactory.create<NestFastifyApplication>(
              AppModule,
              new FastifyAdapter(),
            );
            await app.init();
            await app.getHttpAdapter().getInstance().ready();
            cachedServer = serverlessFastify({ app: app.getHttpAdapter().getInstance() });
          }
          return cachedServer;
        }

        export const handler: Handler = async (
          event: any,
          context: Context,
          callback: Callback,
        ) => {
          const cachedServer = await bootstrap();
          return cachedServer(event, context, callback);
        };
        ```

    * `src/app.module.ts`:

        ```typescript
        import { Module } from '@nestjs/common';
        import { AppController } from './app.controller';
        import { AppService } from './app.service';

        @Module({
          imports: [],
          controllers: [AppController],
          providers: [AppService],
        })
        export class AppModule {}
        ```

    * `src/app.controller.ts`:

        ```typescript
        import { Controller, Get } from '@nestjs/common';
        import { AppService } from './app.service';

        @Controller()
        export class AppController {
          constructor(private readonly appService: AppService) {}

          @Get()
          getHello(): string {
            return this.appService.getHello();
          }
        }
        ```

    * `src/app.service.ts`:

        ```typescript
        import { Injectable } from '@nestjs/common';

        @Injectable()
        export class AppService {
          getHello(): string {
            return '¡Hola Mundo desde NestJS!';
          }
        }
        ```

## Configuración para Serverless Framework

1. **Instala Serverless Framework y dependencias:**

    ```bash
    npm install serverless serverless-http --save-dev
    npm install serverless-plugin-typescript@latest -D ## tener en cuenta que no siempre tine compatibilidad con todas las versiones de serverles framework
    ```

2. **Crea `serverless.yml`:**

    ```yaml
    service: mi-proyecto-nestjs

    provider:
      name: aws
      runtime: nodejs18.x
      region: us-east-1 # Reemplaza con tu región

    functions:
      main:
        handler: dist/lambda.handler
        events:
          - http:
              method: ANY
              path: /{proxy+}
    plugins:
      - serverless-offline
      - serverless-plugin-typescript

    ```

## Despliegue en AWS Lambda

1. **Construye el proyecto:**

    ```bash
    npx tsc
    ```

2. **Despliega el proyecto:**

    ```bash
    npx serverless deploy
    ```

## Pruebas locales

```bash
npm install serverless-offline --save-dev
npm run local # o npx sls offline
