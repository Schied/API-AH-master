const   express     = require('express'),
        router      = express.Router(),
        magic       = require('../util/magic'),
        materials       = require('../domain/services/service-material');

console.log('[[ MATERIALS ]]'); 
magic.LogInfo('[GET] = /materials/')
magic.LogInfo('[GET] = /materials/:id')
magic.LogSuccess('[POST] = /materials/')
magic.LogSuccess('[POST] = /materials/filter')

router.get('/materials/', materials.GetAll);
router.get('/materials/filters', materials.GetFilters);
router.get('/materials/:id', materials.GetById);
router.post('/materials/', materials.Store);
router.post('/materials/filter', materials.GetByFilter);


module.exports = router;