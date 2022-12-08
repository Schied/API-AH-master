const request = require('supertest');
const app = require('../server');

describe('Material Endpoints', () => {
    test('deberia obtener todos los materiales', async () => {
        const res = await request(app)
            .get('/api/materials/')
            .send();
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toEqual(true);
    });

    test('deberia obtener material por su codigo', async () => {
        const res = await request(app)
            .get('/api/materials/'+'S902LA')
            .send();
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toEqual(true);
    });

    test('deberia obtener materiales filtrados por color', async () => {
        const res = await request(app)
            .post('/api/materials/filter')
            .send({
                codigo_mat: "",
                nombre_mat: "",
                color_mat: "Negro",
                unidad_mat: ""
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toEqual(true);
    })
});