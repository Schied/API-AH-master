const request = require('supertest');
const app = require('../server');

describe('Egreso producto Endpoints', () => {
    test('deberia obtener todos los egresos de productos', async () => {
        const res = await request(app)
            .get('/api/egresosP/')
            .send();
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toEqual(true);
    });

    test('deberia obtener egreso producto por su id', async () => {
        const res = await request(app)
            .get('/api/egresosP/id/'+1)
            .send();
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toEqual(true);
    });

    test('deberia obtener egreso producto por usuario', async () => {
        const res = await request(app)
            .get('/api/egresosP/usu/'+1004845348)
            .send();
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toEqual(true);
    });
});

