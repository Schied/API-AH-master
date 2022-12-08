const   express     = require('express'),
        router      = express.Router(),
        magic       = require('../util/magic'),
        egresosP       = require('../domain/services/service-egresoP');

console.log('[[ EGRESO PRODUCTOS ]]'); 
magic.LogInfo('[GET] = /egresosP/')
magic.LogInfo('[GET] = /egresosP/id/:id')
magic.LogInfo('[GET] = /egresosP/usu/:id')
magic.LogSuccess('[POST] = /egresosP/')

router.get('/egresosP/', egresosP.GetAll);
router.get('/egresosP/id/:id', egresosP.GetById);
router.get('/egresosP/usu/:id', egresosP.GetByUsu);
router.get('/egresosP/cli/:id', egresosP.GetByCli);
router.post('/egresosP/date/', egresosP.GetByDate);
router.post('/egresosP/', egresosP.Store);


module.exports = router;