const   express     = require('express'),
        router      = express.Router(),
        magic       = require('../util/magic'),
        egresosM       = require('../domain/services/service-egresoM');

console.log('[[ EGRESO MATERIALES ]]'); 
magic.LogInfo('[GET] = /egresosM/')
magic.LogInfo('[GET] = /egresosM/id/:id')
magic.LogInfo('[GET] = /egresosM/usu/:id')
magic.LogSuccess('[POST] = /egresosM/')

router.get('/egresosM/', egresosM.GetAll);
router.get('/egresosM/id/:id', egresosM.GetById);
router.get('/egresosM/usu/:id', egresosM.GetByUsu);
router.post('/egresosM/date/', egresosM.GetByDate);
router.post('/egresosM/', egresosM.Store);


module.exports = router;