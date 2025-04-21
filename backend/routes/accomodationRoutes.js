const express = require('express');
const router = express.Router();
const accomodationController = require('../controllers/accomodationController');
const upload = require("../config/multer");

router.get('/', accomodationController.getAllAccomodations);
router.get('/:id', accomodationController.getAccomodationById);
router.post('/create', upload.single('gambar_akomodasi'), accomodationController.createAccomodation);
router.put('/edit/:id', upload.single('gambar_akomodasi'), accomodationController.updateAccomodation);
router.delete('/delete-file/:id', accomodationController.deleteFile)
router.delete('/delete/:id', accomodationController.deleteAccomodation);

module.exports = router;