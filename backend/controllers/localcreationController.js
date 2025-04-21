const LocalCreation = require('../models/LocalCreation')
const fs = require("fs");
const path = require("path");

exports.getAllLocalCreations = async (req, res) => {
  try {
    const localcreation = await LocalCreation.findAll();
    
    if (localcreation.length === 0) {
        return res.status(200).json({ message: "Tidak ada kreasi lokal yang tersedia" });
    }

    res.json(localcreation);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};


exports.getLocalCreationById = async (req, res) => {
  try {
    const localcreation = await LocalCreation.findByPk(req.params.id);
    if (!localcreation) {
        return res.status(404).json({ message: 'Kreasi Lokal tidak ditemukan' });
    }
    res.json(localcreation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createLocalCreation = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    console.log("Uploaded File:", req.file);

    const { kategori_ekraf, nama_ekraf, deskripsi_ekraf, jam_operasional, harga_produk, no_whatsapp, alamat, link_gmaps, link_instagram, link_youtube, link_facebook } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ error: "Gambar kreasi lokal wajib diunggah" });
    }

    const newLocalCreation = await LocalCreation.create({
      kategori_ekraf, 
      nama_ekraf, 
      deskripsi_ekraf, 
      jam_operasional, 
      harga_produk,  
      no_whatsapp, 
      alamat, 
      link_gmaps,
      link_instagram, 
      link_youtube, 
      link_facebook,
      gambar_kreasilokal: req.file.filename,
    });

    res.status(201).json(newLocalCreation);
  } catch (error) {
    console.error("Error creating localcreation:", error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.updateLocalCreation = async (req, res) => {
  try {
    console.log("Request Body:", req.body); 
    console.log("Uploaded File:", req.file); 
    
    const localcreation = await LocalCreation.findByPk(req.params.id);
    if (!localcreation) {
      return res.status(404).json({ message: "Kreasi Lokal tidak ditemukan" });
    }

    let updatedData = {
      kategori_ekraf: req.body.kategori_ekraf || localcreation.kategori_ekraf,
      nama_ekraf: req.body.nama_ekraf || localcreation.nama_ekraf,
      deskripsi_ekraf: req.body.deskripsi_ekraf || localcreation.deskripsi_ekraf,
      jam_operasional: req.body.jam_operasional || localcreation.jumlah_kamar_tersedia,
      harga_produk: req.body.harga_produk || localcreation.harga_produk,
      no_whatsapp: req.body.no_whatsapp || localcreation.no_whatsapp,
      alamat: req.body.alamat || localcreation.alamat,
      link_gmaps: req.body.link_gmaps || localcreation.link_gmaps,
      link_instagram: req.body.link_instagram || localcreation.link_instagram,
      link_youtube: req.body.link_youtube || localcreation.link_youtube,
      link_facebook: req.body.link_facebook || localcreation.link_facebook,
    };

    if (req.file) {
      if (localcreation.gambar_kreasilokal) {
        const oldImagePath = path.join(__dirname, "../uploads", localcreation.gambar_kreasilokal);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      updatedData.gambar_kreasilokal = req.file.filename;
    } else {
      updatedData.gambar_kreasilokal = localcreation.gambar_kreasilokal;
    }

    await localcreation.update(updatedData);
    res.json({ message: "Kreasi Lokal berhasil diperbarui", localcreation });
  } catch (error) {
    console.error("Error updating local creation:", error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.deleteLocalCreation = async (req, res) => {
  try {
    const localcreation = await LocalCreation.findByPk(req.params.id);
    if (!localcreation) {
        return res.status(404).json({ message: 'Kreasi Lokal tidak ditemukan' });
    }
    await localcreation.destroy();
    res.json({ message: 'Kreasi Lokal berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteFile = async (req, res) => {
  try {
    const localcreation = await LocalCreation.findByPk(req.params.id);
    if (!localcreation) {
      return res.status(404).json({ message: "Kreasi Lokal tidak ditemukan" });
    }

    const oldImagePath = path.join(__dirname, "../uploads", localcreation.gambar_kreasilokal);
    if (fs.existsSync(oldImagePath)) {
      fs.unlinkSync(oldImagePath);
    }

    res.json({ message: "File lama berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};