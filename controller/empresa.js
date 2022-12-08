const   express     = require('express'),
        router      = express.Router(),
        magic       = require('../util/magic'),
        empresas       = require('../domain/services/service-empresa');

console.log('[[ EMPRESAS ]]'); 
magic.LogInfo('[GET] = /empresas/')
magic.LogInfo('[GET] = /empresas/:id')
magic.LogSuccess('[POST] = /empresas/')

router.get('/empresas/', empresas.GetAll);
router.get('/empresas/:id', empresas.GetById);
router.post('/empresas/', empresas.Store);


module.exports = router;