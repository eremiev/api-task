import express, {Request, Response} from 'express';
import {body} from 'express-validator';
import {validateRequest} from '../middlewares/validateRequest';
import {KeyValueStore} from '../services/inMemoryKeyValueStore';

const router = express.Router();
const store = new KeyValueStore();

router.post('/api/store',
    [
        body('key')
            .not().isEmpty().withMessage('Key is required.')
            .isString().withMessage('Key must be string.'),
        body('value').not().isEmpty().withMessage('Value is required'),
        body('ttl').optional().isInt({min: 0}).withMessage('TTL must be number grater than 0')
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        store.add(req.body.key, req.body.value, req.body.ttl);
        res.sendStatus(201);
    });

router.get('/api/store/:key', async (req: Request, res: Response) => {
    const value = store.get(req.params.key);
    res.send({value: value || null});
});

router.delete('/api/store/:key', async (req: Request, res: Response) => {
    store.delete(req.params.key);
    res.send({});
});

export {router as keyValueStoreRouter};