const request = require('supertest');
const app = require('../server');

describe('Empresa Endpoints', () => {
    test('deberia obtener todos las empresas', async () => {
        const res = await request(app)
            .get('/api/empresas/')
            .send();
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toEqual(true);
    });

    test('deberia obtener empresa por su identificacion', async () => {
        const res = await request(app)
            .get('/api/empresas/'+5821484)
            .send();
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toEqual(true);
    });
});

