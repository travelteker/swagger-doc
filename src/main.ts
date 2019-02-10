import { app } from './app';
import { Server, createServer } from 'http';
import * as mongoose from 'mongoose';

import './config/config';

const PORT: string = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

const server: Server = createServer(app);
server.listen(PORT);
server.on('listening', async () => {
    console.info(`Listening on port ${PORT}`);
    mongoose.connect(MONGO_URI, { useNewUrlParser: true, useFindAndModify: false});
    mongoose.connection.on('open', () => {
        console.info('Connected to Mongo DB testing');
    });
    mongoose.connection.on('error', (err: any) => {
        console.error('Connection Mongo DB failed: ' + err);
    });
});
