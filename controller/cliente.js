const   express     = require('express'),
        router      = express.Router(),
        magic       = require('../util/magic'),
        clientes       = require('../domain/services/service-cliente');

console.log('[[ CLIENTES ]]'); 
magic.LogInfo('[GET] = /clientes/')
magic.LogInfo('[GET] = /clientes/:id')
magic.LogSuccess('[POST] = /clientes/')

router.get('/clientes/', clientes.GetAll);
router.get('/clientes/:id', clientes.GetById);
router.post('/clientes/', clientes.Store);
router.post('/clientes/exist', clientes.GetByForm);


module.exports = router;