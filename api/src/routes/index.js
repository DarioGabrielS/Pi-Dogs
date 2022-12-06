const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const breedRouter = require('./breedRouter')
const tempRouter = require('./tempRouter')
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/breeds', breedRouter)
router.use('/temperament', tempRouter)

module.exports = router;
