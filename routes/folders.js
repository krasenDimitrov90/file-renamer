const foldersController = require('../controllers/folders');
const router = require('express').Router();

router.get(/^(.*)$/, foldersController.getDirectory);
// router.get('/', foldersController.getDirectory);

module.exports = router;

