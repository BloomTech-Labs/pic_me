const router = require('express').Router();

/**
 * /api/pictures
 *
 * routes for picture endpoint
 */
router.use('/', require('./routes/root'));
router.use('/myuploads', require('./routes/myuploads'));
router.use('/upload', require('./routes/upload'));

module.exports = router;
