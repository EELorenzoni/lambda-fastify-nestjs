# Proyecto Lambda con NestJS y Fastify

Este proyecto es una aplicación construida con NestJS y Fastify, desplegada en AWS Lambda utilizando Serverless Framework.

## Prerrequisitos

Asegúrate de tener instalado lo siguiente en tu entorno de desarrollo:

* **Node.js** (versión recomendada: >= 18)
* **npm** o **yarn** como gestor de paquetes
* **Serverless Framework** (`npm install -g serverless`)
* **AWS CLI** configurado con tus credenciales de AWS

## Pasos para la Configuración y Despliegue

1.  **Clonar el Repositorio (si aún no lo has hecho):**
    ```bash
    git clone TU_REPOSITORIO.git
    cd lambda-fastify-nestjs
    ```

2.  **Instalar las Dependencias:**
    ```bash
    npm install
    # o
    yarn install
    ```
    Este comando instalará todas las librerías necesarias definidas en el `package.json`, incluyendo NestJS, Fastify, el adaptador para AWS Lambda y las dependencias de desarrollo.

3.  **Configurar las Variables de Entorno (Opcional):**
    Si tu aplicación requiere variables de entorno, crea un archivo `.env` en la raíz del proyecto y define tus variables. El archivo `serverless.yml` está configurado para cargar estas variables automáticamente gracias a `useDotenv: true`.

    ```
    # Ejemplo de .env
    # DATABASE_URL=tu_url_de_base_de_datos
    ```

4.  **Construir la Aplicación NestJS:**
    Ejecuta el siguiente comando para compilar el código TypeScript de NestJS a JavaScript. Los archivos compilados se generarán en la carpeta `dist`, según lo configurado en el `tsconfig.json` y referenciado en `serverless.yml`.

    ```bash
    npm run build
    # o
    yarn build
    ```

5.  **Desplegar a AWS Lambda con Serverless:**
    Utiliza el siguiente comando para desplegar tu aplicación a AWS Lambda. Serverless Framework se encargará de empaquetar tu código, crear la función Lambda y configurar las rutas de API Gateway definidas en `serverless.yml`.

    ```bash
    npx sls deploy
    # o
    yarn sls deploy
    ```
    Este proceso puede tardar unos minutos. Una vez completado, Serverless Framework mostrará la URL del endpoint de tu API Gateway.

6.  **Probar la Aplicación:**
    Una vez desplegada, puedes acceder a tu aplicación a través de la URL proporcionada por Serverless.

    * La ruta raíz (`/`) está configurada para responder a peticiones `GET`.
    * Cualquier otra ruta (`/{proxy+}`) también está configurada para reenviar las peticiones a tu aplicación NestJS/Fastify.

    Puedes usar herramientas como `curl`, Postman o un navegador web para probar tus endpoints.

7.  **Despliegue Local (Opcional):**
    Para probar tu aplicación localmente sin necesidad de desplegarla en AWS, puedes usar el plugin `serverless-offline`.

    ```bash
    npm run local
    # o
    yarn local
    ```
    Esto iniciará un servidor local que emula el entorno de AWS Lambda y API Gateway. Podrás acceder a tus rutas en `http://localhost:3000`.

## Comandos Útiles

* `npm run build`: Compila la aplicación NestJS.
* `npm run local`: Inicia el servidor local de Serverless Offline.
* `npx sls deploy`: Despliega la aplicación a AWS Lambda.
* `npx sls remove`: Elimina la aplicación de AWS Lambda.
* `npx sls info`: Muestra información sobre el despliegue actual.

## Estructura de Carpetas básica

├── LICENSE
├── package-lock.json
├── package.json
├── README.md                  # Este archivo
├── serverless.yml            # Configuración de Serverless Framework
├── src                      # Código fuente de la aplicación NestJS
│   ├── app.controller.ts    # Controlador principal de la aplicación
│   ├── app.module.ts        # Módulo principal de la aplicación
│   ├── app.service.ts       # Servicio principal de la aplicación
│   ├── lambda.ts            # Handler para AWS Lambda
│   └── main.ts              # Punto de entrada principal de NestJS
└── tsconfig.json            # Configuración del compilador TypeScript
