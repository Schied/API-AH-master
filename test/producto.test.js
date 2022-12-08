const request = require('supertest');
const app = require('../server');

describe('Producto Endpoints', () => {
    test('deberia obtener todos los productos', async () => {
        const res = await request(app)
            .get('/api/products/')
            .send();
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toEqual(true);
    });

    test('deberia obtener producto por su id', async () => {
        const res = await request(app)
            .get('/api/products/'+1)
            .send();
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toEqual(true);
        expect(res.body.Resp.data[0].nombre_prod).toEqual('Corte de sandalia')
    });

    test('deberia obtener productos filtrados por calzado', async () => {
        const res = await request(app)
            .post('/api/products/filter')
            .send({
                nombre_prod: "",
                tipo_prod: "",
                calzado_prod: "Sandalia",
                genero_prod: ""
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toEqual(true);
    })
});
