# Proyecto: SWAGGER-DOC 

Vamos a crear la documentación de una API RESTful, e interactuar con ella desde una interfaz de usuario.

> La Iniciativa OpenAPI (OAI) fue creada por un consorcio de expertos de la industria, con visión de futuro que reconocen el inmenso valor de la estandarización sobre cómo se describen las API de REST. Como una estructura de gobierno dependiendo de la Fundación Linux, la OAI se centra en crear, evolucionar y promover un formato de descripción neutral del proveedor. SmartBear Software está donando la especificación Swagger directamente a la OAI como base de esta especificación abierta.  


# Comandos iniciales

Para generar nuestro fichero inicial **'package.json'**

> npm init

Ahora instalamos las dependencias necesarias para iniciar nuestro proyecto.

Dependencias de proyecto:

> npm install --save express typescript ts-node cors body-parser nodemon mongodb mongoose tsoa swagger-ui-express dotenv

Dependencias de desarrollo:

> npm install --save-dev tslint @types/node @types/express @types/cors @types/body-parser @types/mongodb @types/mongoose @types/swagger-ui-express @types/dotenv

# Configurar sección de scripts en package.json

```javascript
"scripts": {
    "start": "nodemon -x src/main.ts",
    "generate": "tsoa routes && tsoa swagger"
}
```

- npm run start --> para iniciar la aplicación
- npm run generate --> para generar los ficheros **'swagger.json'** y **'routes.ts'**

# Generar los ficheros .env necesarios

En el directorio **'src/config'** generar los ficheros de entornos correspondiente, acorde a los requirimientos del fichero **'config.ts'**, para nuestro caso necesitaríamos:

> .env.development .env.production

Como parámetros necesarios confgurar los siguientes:

> PORT=(number)

> MONGO_URI=(string)

Para este último parámetro ver la sección anterior de MongoDB Atlas.

# MongoDB Atlas

Al usar la cadena de conexión recordar utilizar la parametrización adecuada usando 'user', 'password', 'databaseName'

> mongodb://**USER**:**PASSWORD**@testing-shard-00-00-ezk1l.mongodb.net:27017,testing-shard-00-01-ezk1l.mongodb.net:27017,testing-shard-00-02-ezk1l.mongodb.net:27017/**DATABASENAME**?ssl=true&replicaSet=testing-shard-0&authSource=admin&retryWrites=true

# Swagger

> Documentation for the REST API is created with <**tsoa**>, a tool providing scaffolding of code and generation of Swagger JSON for showing RESTful documentation of the application with Swagger UI tools

### 1. Crear el fichero de configuración **tsoa.json**
```json
{
    "swagger": {
        "outputDirectory": ".",
        "entryFile": "./src/app.ts"
    },
    "routes": {
        "basePath": "/",
        "entryFile": "./src/app.ts",
        "routesDir": "./src"
    }
}
```

### 2. Generar los ficheros **swagger.json** y **routes.ts** ejecutando el siguiente comando:

> npm run generate

Para ello en el fichero **package.json** añadir el script:
```json
"scripts": {
    "generate": "tsoa routes && tsoa swagger"
  },
```

### 3. Modificar el fichero **tsconfig.json**

```json
{
    "compilerOptions": {
        "target": "esnext", 
        "moduleResolution": "node",
        "experimentalDecorators": true,
    }
}
```

[Opciones Fuente Oficial](https://www.typescriptlang.org/docs/handbook/compiler-options.html)

> MUY IMPORTANTE activar la opción **experimentalDecorators** para trabajar con **tsoa**

### 4. Acceso a la interfaz API

Configuramos la ruta desde donde queremos acceder a la interfaz API:

```javascript
try {
    const swaggerDocument = require('../swagger.json');
    app.use('/docApi', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}catch (err) {
    console.error('Unable to read swagger.json', err);
}
```

Para nuestro caso desde el navegador sería:
> http://domain/docApi

- Para el entorno development --> domain = 'localhost:PORT'


