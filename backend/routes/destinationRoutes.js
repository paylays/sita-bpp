const express = require('express');
const router = express.Router();
const destinationController = require('../controllers/destinationController');
const upload = require("../config/multer");

router.get('/', destinationController.getAllDestinations);
router.get('/:id', destinationController.getDestinationById);
router.post('/create', upload.single('gambar_destinasi'), destinationController.createDestination);
router.put('/edit/:id', upload.single('gambar_destinasi'), destinationController.updateDestination);
router.delete('/delete-file/:id', destinationController.deleteFile);
router.delete('/delete/:id', destinationController.deleteDestination);

module.exports = router;