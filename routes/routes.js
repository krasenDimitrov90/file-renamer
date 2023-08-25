const router = require('express').Router();

const songsRoutes = require('./songs');

router.use(songsRoutes);

module.exports = router;