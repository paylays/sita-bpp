const Accomodation = require('../models/Accomodation')
const fs = require("fs");
const path = require("path");

exports.getAllAccomodations = async (req, res) => {
  try {
    const accomodation = await Accomodation.findAll();
    
    if (accomodation.length === 0) {
        return res.status(200).json({ message: "Tidak ada akomodasi yang tersedia" });
    }

    res.json(accomodation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getAccomodationById = async (req, res) => {
  try {
    const accomodation = await Accomodation.findByPk(req.params.id);
    if (!accomodation) {
        return res.status(404).json({ message: 'Akomodasi tidak ditemukan' });
    }
    res.json(accomodation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createAccomodation = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    console.log("Uploaded File:", req.file);

    const { kategori_akomodasi, nama_akomodasi, deskripsi_akomodasi, jumlah_kamar_tersedia, harga_kamar, fasilitas, no_whatsapp, alamat, link_gmaps, link_instagram, link_youtube, link_facebook } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "Gambar akomodasi wajib diunggah" });
    }

    const newAccomodation = await Accomodation.create({
      kategori_akomodasi, 
      nama_akomodasi, 
      deskripsi_akomodasi, 
      jumlah_kamar_tersedia, 
      harga_kamar, 
      fasilitas, 
      no_whatsapp, 
      alamat, 
      link_gmaps,
      link_instagram, 
      link_youtube, 
      link_facebook,
      gambar_akomodasi: req.file.filename,
    });

    res.status(201).json(newAccomodation);
  } catch (error) {
    console.error("Error creating accomodation:", error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.updateAccomodation = async (req, res) => {
  try {
    console.log("Request Body:", req.body); 
    console.log("Uploaded File:", req.file); 
    
    const accomodation = await Accomodation.findByPk(req.params.id);
    if (!accomodation) {
      return res.status(404).json({ message: "Akomodasi tidak ditemukan" });
    }

    let updatedData = {
      kategori_akomodasi: req.body.kategori_akomodasi || accomodation.kategori_akomodasi,
      nama_akomodasi: req.body.nama_akomodasi || accomodation.nama_akomodasi,
      deskripsi_akomodasi: req.body.deskripsi_akomodasi || accomodation.deskripsi_akomodasi,
      jumlah_kamar_tersedia: req.body.jumlah_kamar_tersedia || accomodation.jumlah_kamar_tersedia,
      harga_kamar: req.body.harga_kamar || accomodation.harga_kamar,
      fasilitas: req.body.fasilitas || accomodation.fasilitas,
      no_whatsapp: req.body.no_whatsapp || accomodation.no_whatsapp,
      alamat: req.body.alamat || accomodation.alamat,
      link_gmaps: req.body.link_gmaps || accomodation.link_gmaps,
      link_instagram: req.body.link_instagram || accomodation.link_instagram,
      link_youtube: req.body.link_youtube || accomodation.link_youtube,
      link_facebook: req.body.link_facebook || accomodation.link_facebook,
    };
    
    if (req.file) {
      if (accomodation.gambar_akomodasi) {
        const oldImagePath = path.join(__dirname, "../uploads", accomodation.gambar_akomodasi);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      updatedData.gambar_akomodasi = req.file.filename;
    } else {
      updatedData.gambar_akomodasi = accomodation.gambar_akomodasi;
    }

    await accomodation.update(updatedData);
    res.json({ message: "Akomodasi berhasil diperbarui", accomodation });
  } catch (error) {
  console.error("Error updating accomodation:", error.message);
  res.status(500).json({ error: error.message });
  }
};

exports.deleteAccomodation = async (req, res) => {
  try {
    const accomodation = await Accomodation.findByPk(req.params.id);
    if (!accomodation) {
        return res.status(404).json({ message: 'Akomodasi tidak ditemukan' });
    }
    await accomodation.destroy();
    res.json({ message: 'Akomodasi berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteFile = async (req, res) => {
  try {
    const accomodation = await Accomodation.findByPk(req.params.id);
    if (!accomodation) {
      return res.status(404).json({ message: "Akomodasi tidak ditemukan" });
    }

    const oldImagePath = path.join(__dirname, "../uploads", accomodation.gambar_akomodasi);
    if (fs.existsSync(oldImagePath)) {
      fs.unlinkSync(oldImagePath);
    }

    res.json({ message: "File lama berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};