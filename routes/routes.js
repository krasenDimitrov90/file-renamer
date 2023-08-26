const router = require('express').Router();

const homeRoutes = require('./home');
const songsRoutes = require('./songs');
const pageNotFoundController = require('../controllers/404');

router.use(homeRoutes);
router.use(songsRoutes);
router.use(pageNotFoundController);

module.exports = router;