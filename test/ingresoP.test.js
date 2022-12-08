const request = require('supertest');
const app = require('../server');

describe('Ingreso producto Endpoints', () => {
    test('deberia obtener todos los ingresos de productos', async () => {
        const res = await request(app)
            .get('/api/ingresosP/')
            .send();
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toEqual(true);
    });

    test('deberia obtener ingreso producto por su id', async () => {
        const res = await request(app)
            .get('/api/ingresosP/id/'+1)
            .send();
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toEqual(true);
    });

    test('deberia obtener ingreso producto por usuario', async () => {
        const res = await request(app)
            .get('/api/ingresosP/usu/'+1004845348)
            .send();
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toEqual(true);
    });
});

