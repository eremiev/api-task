import express, {Request, Response} from 'express';
import 'express-async-errors';
import {json} from 'body-parser';

import {stackRouter} from './routes/stack';
import {keyValueStoreRouter} from './routes/keyValueStore';
import {NotFoundError} from './errors';
import {errorHandler} from './middlewares/errorHandler';

const app = express();
app.use(json());

app.use(stackRouter);
app.use(keyValueStoreRouter);

app.all('*', async (req: Request, res: Response) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export {app};
