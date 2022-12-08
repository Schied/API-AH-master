const   express     = require('express'),
        router      = express.Router(),
        magic       = require('../util/magic'),
        products       = require('../domain/services/service-product');

console.log('[[ PRODUCTS ]]'); 
magic.LogInfo('[GET] = /products/')
magic.LogInfo('[GET] = /products/:id')
magic.LogInfo('[GET] = /products/filters')
magic.LogSuccess('[POST] = /products/')
magic.LogSuccess('[POST] = /products/filter')

router.get('/products/', products.GetAll);
router.get('/products/filters', products.GetFilters);
router.get('/products/:id', products.GetById);
router.post('/products/', products.Store);
router.post('/products/filter', products.GetByFilter);


module.exports = router;