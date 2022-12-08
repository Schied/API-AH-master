const request = require('supertest');
const app = require('../server');

describe('Ingreso material Endpoints', () => {
    test('deberia obtener todos los ingresos de materiales', async () => {
        const res = await request(app)
            .get('/api/ingresosM/')
            .send();
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toEqual(true);
    });

    test('deberia obtener ingreso material por su id', async () => {
        const res = await request(app)
            .get('/api/ingresosM/id/'+1)
            .send();
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toEqual(true);
    });

    test('deberia obtener ingreso material por usuario', async () => {
        const res = await request(app)
            .get('/api/ingresosM/usu/'+1004845348)
            .send();
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toEqual(true);
    });
});

