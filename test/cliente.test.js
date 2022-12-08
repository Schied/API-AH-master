const request = require('supertest');
const app = require('../server');

describe('Cliente Endpoints', () => {
    test('deberia obtener todos los clientes', async () => {
        const res = await request(app)
            .get('/api/clientes/')
            .send();
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toEqual(true);
    });

    test('deberia obtener cliente por su cedula', async () => {
        const res = await request(app)
            .get('/api/clientes/'+1004852147)
            .send();
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toEqual(true);
    });
});

