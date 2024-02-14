import express, {Request, Response} from 'express';
import {body} from 'express-validator';
import {validateRequest} from '../middlewares/validateRequest';
import {InMemoryStack} from '../services/inMemoryStack';

const router = express.Router();
const stack = new InMemoryStack();

router.post('/api/stack',
    [
        body('item').not().isEmpty().withMessage('Item is required')
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        stack.push(req.body.item);
        res.sendStatus(201);
    });

router.get('/api/stack', async (req: Request, res: Response) => {
    const item = stack.pop();
    res.send({item: item || null});
});

export {router as stackRouter};