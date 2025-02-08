const LocalCreation = require('../models/LocalCreation')

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
  console.log("Request Body:", req.body);
  try {
    const newLocalCreation = await LocalCreation.create(req.body);
    res.status(201).json(newLocalCreation);
  } catch (error) {
    console.error("Error creating localcreation:", error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.updateLocalCreation = async (req, res) => {
  try {
    const localcreation = await LocalCreation.findByPk(req.params.id);
    if (!localcreation) {
        return res.status(404).json({ message: 'Kreasi Lokal tidak ditemukan' });
    }
    await localcreation.update(req.body);
    res.json(localcreation);
  } catch (error) {
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