const request = require('supertest');
const app = require('../server');

describe('Usuario Endpoints', () => {
    
    it('deberia obtener todos los usuarios', async () => {
        const res = await request(app)
            .get('/api/users/')
            .send();
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toEqual(true);
    });

    test('deberia obtener usuario por su cedula', async () => {
        const res = await request(app)
            .get('/api/users/'+1004845348)
            .send();
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toEqual(true);
        expect(res.body.Resp.data[0].nombre_usu).toEqual('David Celis')
    });

    test('deberia crear un usuario', async () => {
        const res = await request(app)
            .post('/api/users/')
            .send({
                cedula_usu: 1004845322,
                nombre_usu: "David Celis",
                correo_usu: "david@gmail.com",
                nick_usu: "DavidC0205",
                contra_usu: "12345789A!",
                tipo_usu: "Operador"
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body.status).toEqual(true);
    });

    test('deberia iniciar sesion un usuario', async () => {
        const res = await request(app)
            .post('/api/users/signin')
            .send({
                "nick_usu": "DavidC0205",
                "contra_usu": "12345789A!"
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toEqual(true);
        expect(res.body.Resp.message).toEqual('Valid Credentials');
    });

    test('deberia eliminar un usuario', async () => {
        const res = await request(app)
            .delete('/api/users/'+1004845322)
            .send();
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toEqual(true);
    });
    
});

