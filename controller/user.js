const   express     = require('express'),
        router      = express.Router(),
        magic       = require('../util/magic'),
        users       = require('../domain/services/service-user');

console.log('[[ USERS ]]'); 
magic.LogInfo('[GET] = /users/')
magic.LogInfo('[GET] = /users/:id')
magic.LogSuccess('[POST] = /users/')
magic.LogSuccess('[POST] = /users/signin')
magic.LogSuccess('[POST] = /users/verify')
magic.LogWarning('[PUT] = /users/')
magic.LogDanger('[DELETE] = /users/:id')

router.get('/users/', users.GetAll);
router.get('/users/:id', users.GetById);
router.get('/users/email/:email', users.GetByEmail);
router.get('/users/nick/:nick', users.GetByNick);
router.post('/users/exist', users.GetByForm);
router.post('/users/', users.Store);
router.post('/users/signin', users.Signin);
router.post('/users/verify', users.verifyToken);
router.post('/users/email/codigo', users.obtnCodigo)
router.post('/users/email/usuario', users.recuperarUsuario)
router.delete('/users/:id', users.DeleteById);
router.put('/users/id', users.UpdateById);
router.put('/users/email', users.UpdateByEmail);

module.exports = router;