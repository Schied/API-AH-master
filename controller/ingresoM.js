const   express     = require('express'),
        router      = express.Router(),
        magic       = require('../util/magic'),
        ingresosM       = require('../domain/services/service-ingresoM');

console.log('[[ INGRESO MATERIALES ]]'); 
magic.LogInfo('[GET] = /ingresosM/')
magic.LogInfo('[GET] = /ingresosM/id/:id')
magic.LogInfo('[GET] = /ingresosM/usu/:id')
magic.LogSuccess('[POST] = /ingresosM/')

router.get('/ingresosM/', ingresosM.GetAll);
router.get('/ingresosM/id/:id', ingresosM.GetById);
router.get('/ingresosM/usu/:id', ingresosM.GetByUsu);
router.post('/ingresosM/date/', ingresosM.GetByDate);
router.post('/ingresosM/', ingresosM.Store);


module.exports = router;