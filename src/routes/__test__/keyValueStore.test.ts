import request from 'supertest';
import {app} from '../../app';

describe('keyValueStoreAPI', () => {

    afterEach(() => {
        jest.clearAllTimers();
    });

    const keyValueWithoutTTL = {
        key: 'key',
        value: 'value'
    };
    const keyValueWithTTL = {
        key: 'key-ttl',
        value: 'value-ttl',
        ttl: 5000
    };

    it('should return 400 when add a key-value pair with invalid TTL', async () => {
        await request(app)
            .post('/api/store')
            .send({
                key: keyValueWithTTL.key,
                value: keyValueWithTTL.value,
                ttl: 'invalid'
            })
            .expect(400);

        await request(app)
            .post('/api/store')
            .send({
                key: keyValueWithTTL.key,
                value: keyValueWithTTL.value,
                ttl: -20
            })
            .expect(400);
    });

    it('should return status code 400 when add a key-value pair with invalid key', async () => {
        await request(app)
            .post('/api/store')
            .send({
                key: 123,
                value: keyValueWithoutTTL.value
            })
            .expect(400);

        await request(app)
            .post('/api/store')
            .send({
                value: keyValueWithoutTTL.value
            })
            .expect(400);
    });

    it('should return status code 201 when add a key-value pair without TTL', async () => {
        await request(app)
            .post('/api/store')
            .send({
                key: keyValueWithoutTTL.key,
                value: keyValueWithoutTTL.value
            })
            .expect(201);
    });

    it('should return status code 201 when add a key-value pair with TTL', async () => {
        await request(app)
            .post('/api/store')
            .send({
                key: keyValueWithTTL.key,
                value: keyValueWithTTL.value,
                ttl: keyValueWithTTL.ttl
            })
            .expect(201);
    });

    it('should return the value with status code 200 without set TTL', async () => {
        const response = await request(app)
            .get(`/api/store/${keyValueWithoutTTL.key}`)
            .send()
            .expect(200);

        expect(response.body.value).toEqual(keyValueWithoutTTL.value);
    });

    it('should return the value with status code 200 with valid TTL', async () => {
        const response = await request(app)
            .get(`/api/store/${keyValueWithTTL.key}`)
            .send()
            .expect(200);

        expect(response.body.value).toEqual(keyValueWithTTL.value);
    });

    it('should return an empty value with status code 200 with expired TTL', async () => {
        jest.useFakeTimers();
        let response = await request(app)
            .get(`/api/store/${keyValueWithTTL.key}`)
            .send()
            .expect(200);
        jest.advanceTimersByTime(keyValueWithTTL.ttl);
        response = await request(app)
            .get(`/api/store/${keyValueWithTTL.key}`)
            .send()
            .expect(200);
        expect(response.body.value).toEqual(null);
    });

    it('should return 200 after delete a key-value', async () => {
        await request(app)
            .delete(`/api/store/${keyValueWithTTL.key}`)
            .send()
            .expect(200);
        const response = await request(app)
            .get(`/api/store/${keyValueWithTTL.key}`)
            .send()
            .expect(200);
        expect(response.body.value).toEqual(null);
    });

});
