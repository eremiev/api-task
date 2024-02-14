import request from 'supertest';
import {app} from '../../app';

describe('inMemoryStackAPI', () => {

    it('should return status code 400 when send an empty value for item', async () => {
        await request(app)
            .post('/api/stack')
            .send({
                item: ''
            })
            .expect(400);
        await request(app)
            .post('/api/stack')
            .send({})
            .expect(400);
    });

    it('should return status code 200 when return item from empty stack', async () => {
        const response = await request(app)
            .get('/api/stack')
            .send()
            .expect(200);

        expect(response.body.item).toEqual(null);
    });

    it('should return status code 201 when add an item to the stack', async () => {
        await request(app)
            .post('/api/stack')
            .send({
                item: 'first item'
            })
            .expect(201);
    });

    it('should return status code 200 when return item from the stack', async () => {
        const item = 'first item';
        const response = await request(app)
            .get('/api/stack')
            .send()
            .expect(200);

        expect(response.body.item).toEqual(item);
    });

});