const Event = require("../models/Event");
const fs = require("fs");
const path = require("path");

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.findAll();

    if (events.length === 0) {
      return res.status(200).json({ message: "Tidak ada acara yang tersedia" });
    }

    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Acara tidak ditemukan" });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createEvent = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    console.log("Uploaded File:", req.file);

    const { penyelenggara_acara, judul_acara, deskripsi_acara, status_acara, tanggal_mulai_acara, tanggal_selesai_acara, waktu_acara } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "Gambar acara wajib diunggah" });
    }

    const newEvent = await Event.create({
      penyelenggara_acara,
      judul_acara,
      deskripsi_acara,
      status_acara,
      tanggal_mulai_acara,
      tanggal_selesai_acara,
      waktu_acara,
      gambar_acara: req.file.filename,
    });

    res.status(201).json(newEvent);
  } catch (error) {
    console.error("Error creating event:", error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    console.log("Request Body:", req.body); 
    console.log("Uploaded File:", req.file);
    
    const event = await Event.findByPk(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Acara tidak ditemukan" });
    }

    // Simpan nama gambar lama jika tidak ada gambar baru diunggah
    let updatedData = {
      penyelenggara_acara: req.body.penyelenggara_acara || event.penyelenggara_acara,
      judul_acara: req.body.judul_acara || event.judul_acara,
      deskripsi_acara: req.body.deskripsi_acara || event.deskripsi_acara,
      status_acara: req.body.status_acara || event.status_acara,
      tanggal_mulai_acara: req.body.tanggal_mulai_acara || event.tanggal_mulai_acara,
      tanggal_selesai_acara: req.body.tanggal_selesai_acara || event.tanggal_selesai_acara,
      waktu_acara: req.body.waktu_acara || event.waktu_acara,
    };
    
    if (req.file) {
      if (event.gambar_acara) {
        const oldImagePath = path.join(__dirname, "../uploads", event.gambar_acara);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      updatedData.gambar_acara = req.file.filename;
    } else {
      updatedData.gambar_acara = event.gambar_acara;
    }

    await event.update(updatedData);
    res.json({ message: "Event berhasil diperbarui", event });
  } catch (error) {
    console.error("Error updating event:", error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Acara tidak ditemukan" });
    }
    await event.destroy();
    res.json({ message: "Acara berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteFile = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Acara tidak ditemukan" });
    }

    const oldImagePath = path.join(__dirname, "../uploads", event.gambar_acara);
    if (fs.existsSync(oldImagePath)) {
      fs.unlinkSync(oldImagePath);
    }

    res.json({ message: "File lama berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
