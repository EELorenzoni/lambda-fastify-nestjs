module.exports = () => ({
    /** @see {@link https://github.com/floydspace/serverless-esbuild#options} */
    exclude: ['@nestjs/microservices', '@nestjs/websockets'],

    /** @see {@link https://esbuild.github.io/api/#legal-comments} */
    legalComments: 'none',

    /** @see {@link https://esbuild.github.io/api/#format} */
    // format: 'esm',

    /** @see {@link https://esbuild.github.io/api/#minify} */
    minify: false,

    /** @see {@link https://esbuild.github.io/api/#source-maps} */
    sourcemap: true,

    /** @see {@link https://esbuild.github.io/api/#alias} */
    alias: {
        'class-transformer/storage': 'class-transformer/cjs/storage',
    },

    /** @see {@link https://esbuild.github.io/api/#define} */
    define: {
        'process.env.ENVIRONMENT': JSON.stringify('production'),
        'process.env.NODE_ENV': JSON.stringify('production'),
    },

    /** @see {@link https://github.com/floydspace/serverless-esbuild#options} */
    // outputFileExtension: '.mjs',
})
/**
 * exclude: ['@nestjs/microservices', '@nestjs/websockets']:
 * Esta opción específica de serverless-esbuild indica qué módulos no deben incluirse en el bundle final.
 * Aquí se excluyen los módulos @nestjs/microservices y @nestjs/websockets.
 * Esto se hace para reducir el tamaño del bundle final, especialmente si estos módulos no son necesarios
 * en el entorno serverless o se gestionan de otra manera.
 *
 * legalComments: 'none':
 * Esta opción le indica a esbuild cómo manejar los comentarios de licencia en el código fuente de las dependencias.
 * Al establecerlo en 'none', se eliminan todos los comentarios de licencia del bundle final.
 *
 * // format: 'esm':
 * Esta línea está comentada, pero si estuviera activa, configuraría el formato de salida del bundle a ECMAScript Modules (esm).
 *
 * minify: false:
 * Esta opción indica si el código JavaScript resultante debe ser minificado (por ejemplo, eliminando espacios en blanco,
 * acortando nombres de variables, etc.) para reducir su tamaño. Al estar en false, el código no se minificará,
 * lo que puede hacer que el bundle sea más legible (útil para depuración) pero también más grande.
 *
 * sourcemap: true:
 * Similar a la opción sourceMap en tsconfig.json, esta opción le dice a esbuild que genere archivos de mapa de origen (.js.map).
 * Estos archivos son cruciales para depurar el código que se ejecuta en el entorno serverless, ya que permiten mapear
 * el código empaquetado y minificado de vuelta al código fuente original.
 *
 * alias: { 'class-transformer/storage': 'class-transformer/cjs/storage' }:
 * Esta opción permite definir alias para las rutas de los módulos. Aquí, cualquier importación de 'class-transformer/storage'
 * se redirigirá a 'class-transformer/cjs/storage'. Esto puede ser útil para solucionar problemas de compatibilidad
 * entre diferentes formatos de módulos (por ejemplo, CommonJS vs. ES Modules) dentro de las dependencias.
 *
 * define: { 'process.env.ENVIRONMENT': JSON.stringify('production'), 'process.env.NODE_ENV': JSON.stringify('production') }:
 * Esta opción permite reemplazar variables globales en el código durante el proceso de bundling.
 * Aquí se definen las variables de entorno process.env.ENVIRONMENT y process.env.NODE_ENV con el valor 'production'.
 * Esto es común en entornos de producción para optimizar el código o habilitar funcionalidades específicas.
 *
 * // outputFileExtension: '.mjs':
 * Esta línea también está comentada. Si estuviera activa, configuraría la extensión de los archivos de salida del bundle a .mjs,
 * que se utiliza para indicar archivos ECMAScript Modules.
 *
 * En resumen, este archivo esbuild.js configura el plugin serverless-esbuild para que utilice esbuild de la siguiente manera:
 * - Excluye ciertos módulos de NestJS del bundle.
 * - Elimina los comentarios de licencia.
 * - No minifica el código.
 * - Genera sourcemaps para la depuración.
 * - Define un alias para una ruta específica de class-transformer.
 * - Establece las variables de entorno process.env.ENVIRONMENT y process.env.NODE_ENV a 'production'.
 */                       
