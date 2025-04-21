const express = require('express');
const router = express.Router();
const localcreationController = require('../controllers/localcreationController');
const upload = require("../config/multer");

router.get('/', localcreationController.getAllLocalCreations);
router.get('/:id', localcreationController.getLocalCreationById);
router.post('/create', upload.single('gambar_kreasilokal'), localcreationController.createLocalCreation);
router.put('/edit/:id', upload.single('gambar_kreasilokal'), localcreationController.updateLocalCreation);
router.delete('/delete-file/:id', localcreationController.deleteFile);
router.delete('/delete/:id', localcreationController.deleteLocalCreation);

module.exports = router;