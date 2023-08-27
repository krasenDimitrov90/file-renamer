const foldersController = require('../controllers/folders');
const router = require('express').Router();

router.post(/^(.*)$/, foldersController.getDirectory);
router.get('/', foldersController.getDirectory);

module.exports = router;

