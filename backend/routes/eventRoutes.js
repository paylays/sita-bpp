const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");
const upload = require("../config/multer");

router.get("/", eventController.getAllEvents);
router.get("/:id", eventController.getEventById);
router.post("/create", upload.single("gambar_acara"), eventController.createEvent);
router.put("/edit/:id", upload.single("gambar_acara"), eventController.updateEvent);
router.delete("/delete-file/:id", eventController.deleteFile);
router.delete("/delete/:id", eventController.deleteEvent);

module.exports = router;
