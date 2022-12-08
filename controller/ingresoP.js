const   express     = require('express'),
        router      = express.Router(),
        magic       = require('../util/magic'),
        ingresosP       = require('../domain/services/service-ingresoP');

console.log('[[ INGRESO PRODUCTOS ]]'); 
magic.LogInfo('[GET] = /ingresosP/')
magic.LogInfo('[GET] = /ingresosP/id/:id')
magic.LogInfo('[GET] = /ingresosP/usu/:id')
magic.LogSuccess('[POST] = /ingresosP/')

router.get('/ingresosP/', ingresosP.GetAll);
router.get('/ingresosP/id/:id', ingresosP.GetById);
router.get('/ingresosP/usu/:id', ingresosP.GetByUsu);
router.post('/ingresosP/date/', ingresosP.GetByDate);
router.post('/ingresosP/', ingresosP.Store);


module.exports = router;