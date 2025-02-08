const Accomodation = require('../models/Accomodation')

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
    console.log("Request Body:", req.body);
    try {
        const newAccomodation = await Accomodation.create(req.body);
        res.status(201).json(newAccomodation);
    } catch (error) {
        console.error("Error creating accomodation:", error.message);
        res.status(500).json({ error: error.message });
    }
};

exports.updateAccomodation = async (req, res) => {
    try {
        const accomodation = await Accomodation.findByPk(req.params.id);
        if (!accomodation) {
            return res.status(404).json({ message: 'Akomodasi tidak ditemukan' });
        }
        await accomodation.update(req.body);
        res.json(accomodation);
    } catch (error) {
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