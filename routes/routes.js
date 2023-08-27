const router = require('express').Router();

const foldersRoutes = require('./folders');
const songsRoutes = require('./songs');
const pageNotFoundController = require('../controllers/404');

router.use(songsRoutes);
router.use(foldersRoutes);
router.use(pageNotFoundController);

module.exports = router;