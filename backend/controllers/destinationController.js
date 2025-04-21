const Destination = require('../models/Destination');
const fs = require("fs");
const path = require("path");

exports.getAllDestinations = async (req, res) => {
  try {
    const destination = await Destination.findAll();
    
    if (destination.length === 0) {
      return res.status(200).json({ message: "Tidak ada destinasi yang tersedia" });
    }

    res.json(destination);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getDestinationById = async (req, res) => {
  try {
    const destination = await Destination.findByPk(req.params.id);
    if (!destination) {
        return res.status(404).json({ message: 'Destinasi tidak ditemukan' });
    }
    res.json(destination);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createDestination = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    console.log("Uploaded File:", req.file);

    const { kategori_destinasi, nama_destinasi, deskripsi_destinasi, jam_operasional, harga_tiket, fasilitas, aktivitas, alamat, link_gmaps, link_whatsapp, link_instagram, link_youtube, link_facebook } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "Gambar destinasi wajib diunggah" });
    }

    const newDestination = await Destination.create({
      kategori_destinasi, 
      nama_destinasi, 
      deskripsi_destinasi, 
      jam_operasional, 
      harga_tiket, 
      fasilitas, 
      aktivitas, 
      alamat, 
      link_gmaps,
      link_whatsapp,
      link_instagram,
      link_youtube,
      link_facebook,
      gambar_destinasi: req.file.filename,
    });

    res.status(201).json(newDestination);
  } catch (error) {
    console.error("Error creating destination:", error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.updateDestination = async (req, res) => {
  try {
    console.log("Request Body:", req.body); 
    console.log("Uploaded File:", req.file); 
    
    const destination = await Destination.findByPk(req.params.id);
    if (!destination) {
      return res.status(404).json({ message: "Destinasi tidak ditemukan" });
    }

    let updatedData = {
      kategori_destinasi: req.body.kategori_destinasi || destination.kategori_destinasi,
      nama_destinasi: req.body.nama_destinasi || destination.nama_destinasi,
      deskripsi_destinasi: req.body.deskripsi_destinasi || destination.deskripsi_destinasi,
      jam_operasional: req.body.jam_operasional || destination.jam_operasional,
      harga_tiket: req.body.harga_tiket || destination.harga_tiket,
      fasilitas: req.body.fasilitas || destination.fasilitas,
      aktivitas: req.body.aktivitas || destination.aktivitas,
      alamat: req.body.alamat || destination.alamat,
      link_gmaps: req.body.link_gmaps || destination.link_gmaps,
      link_whatsapp: req.body.link_whatsapp || destination.link_whatsapp,
      link_instagram: req.body.link_instagram || destination.link_instagram,
      link_youtube: req.body.link_youtube || destination.link_youtube,
      link_facebook: req.body.link_facebook || destination.link_facebook,
    };
    
    if (req.file) {
      if (destination.gambar_destinasi) {
        const oldImagePath = path.join(__dirname, "../uploads", destination.gambar_destinasi);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      updatedData.gambar_destinasi = req.file.filename;
    } else {
      updatedData.gambar_destinasi = destination.gambar_destinasi;
    }

    await destination.update(updatedData);
    res.json({ message: "Destinasi berhasil diperbarui", destination });
  } catch (error) {
  console.error("Error updating destination:", error.message);
  res.status(500).json({ error: error.message });
  }
};

exports.deleteDestination = async (req, res) => {
    try {
        const destination = await Destination.findByPk(req.params.id);
        if (!destination) {
            return res.status(404).json({ message: 'Destinasi tidak ditemukan' });
        }
        await destination.destroy();
        res.json({ message: 'Destinasi berhasil dihapus' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteFile = async (req, res) => {
  try {
    const destination = await Destination.findByPk(req.params.id);
    if (!destination) {
      return res.status(404).json({ message: "Destinasi tidak ditemukan" });
    }

    const oldImagePath = path.join(__dirname, "../uploads", destination.gambar_destinasi);
    if (fs.existsSync(oldImagePath)) {
      fs.unlinkSync(oldImagePath);
    }

    res.json({ message: "File lama berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};