const router = require('express').Router();

const songsRoutes = require('./songs');
const pageNotFoundController = require('../controllers/404');

router.use(songsRoutes);
router.use(pageNotFoundController);

module.exports = router;