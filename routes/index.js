const userServices = require('../controller/user');
const productServices = require('../controller/product');
const materialServices = require('../controller/material');
const empresaServices = require('../controller/empresa');
const clienteServices = require('../controller/cliente');
const ingresoPServices = require('../controller/ingresoP');
const egresoPServices = require('../controller/egresoP');
const ingresoMServices = require('../controller/ingresoM');
const egresoMServices = require('../controller/egresoM');

const routers = (app) =>{
    app.use('/api/', userServices);
    app.use('/api/', productServices);
    app.use('/api/', materialServices);
    app.use('/api/', empresaServices);
    app.use('/api/', clienteServices);
    app.use('/api/', ingresoPServices);
    app.use('/api/', egresoPServices);
    app.use('/api/', ingresoMServices);
    app.use('/api/', egresoMServices);
};

module.exports = routers;