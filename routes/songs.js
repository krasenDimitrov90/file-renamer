const router = require('express').Router();
const songsController = require('../controllers/songs');

const patern = /^(.*)$/;

router.get(`/songs/*`, songsController.getCurrentSongs);
router.get(`/songs`, songsController.getCurrentSongs);
router.post('/check-songs', songsController.checkSongs);
router.post('/save-changes', songsController.saveChanges);
router.post('/discard-changes', songsController.discardChanges);

module.exports = router;