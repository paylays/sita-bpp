const express = require('express');
const router = express.Router();
const accomodationController = require('../controllers/accomodationController');

router.get('/', accomodationController.getAllAccomodations);
router.get('/:id', accomodationController.getAccomodationById);
router.post('/create', accomodationController.createAccomodation);
router.put('/edit/:id', accomodationController.updateAccomodation);
router.delete('/delete/:id', accomodationController.deleteAccomodation);

module.exports = router;