const express = require('express');
const router = express.Router();
const localcreationController = require('../controllers/localcreationController');

router.get('/', localcreationController.getAllLocalCreations);
router.get('/:id', localcreationController.getLocalCreationById);
router.post('/create', localcreationController.createLocalCreation);
router.put('/edit/:id', localcreationController.updateLocalCreation);
router.delete('/delete/:id', localcreationController.deleteLocalCreation);

module.exports = router;