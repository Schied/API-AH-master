const request = require('supertest');
const app = require('../server');

describe('Egreso material Endpoints', () => {
    test('deberia obtener todos los egresos de materiales', async () => {
        const res = await request(app)
            .get('/api/egresosM/')
            .send();
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toEqual(true);
    });

    test('deberia obtener egreso material por su id', async () => {
        const res = await request(app)
            .get('/api/egresosM/id/'+1)
            .send();
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toEqual(true);
    });

    test('deberia obtener egreso material por usuario', async () => {
        const res = await request(app)
            .get('/api/egresosM/usu/'+1004845348)
            .send();
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toEqual(true);
    });
});
