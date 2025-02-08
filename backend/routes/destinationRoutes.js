const express = require('express');
const router = express.Router();
const destinationController = require('../controllers/destinationController');

router.get('/', destinationController.getAllDestinations);
router.get('/:id', destinationController.getDestinationById);
router.post('/create', destinationController.createDestination);
router.put('/edit/:id', destinationController.updateDestination);
router.delete('/delete/:id', destinationController.deleteDestination);

module.exports = router;