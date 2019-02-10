import * as express from 'express';
import { Express } from 'express';
import * as cors from 'cors';
import * as bodyparser from 'body-parser';

import { requestLoggerMiddleware } from './middlewares/requestLogger.middelware';
import './controllers/todo.controller';

import { RegisterRoutes } from './routes';
import * as swaggerUi from 'swagger-ui-express';

// Creamos una instancia de la aplicación express
const app: Express = express();

console.info(__dirname);

app.use(cors());
app.use(bodyparser.json());


/* MIDDLEWARES */
/*-------------*/
app.use(requestLoggerMiddleware);


/* ROUTES */
/*-------------*/
RegisterRoutes(app);

try {
    const swaggerDocument = require('../swagger.json');
    app.use('/docApi', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}catch (err) {
    console.error('Unable to read swagger.json', err);
}


export { app };

