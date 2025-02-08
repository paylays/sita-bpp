const Destination = require('../models/Destination');

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
    console.log("Request Body:", req.body);
    try {
        const newDestination = await Destination.create(req.body);
        res.status(201).json(newDestination);
    } catch (error) {
        console.error("Error creating destination:", error.message);
        res.status(500).json({ error: error.message });
    }
};

exports.updateDestination = async (req, res) => {
    try {
        const destination = await Destination.findByPk(req.params.id);
        if (!destination) {
            return res.status(404).json({ message: 'Destinasi tidak ditemukan' });
        }
        await destination.update(req.body);
        res.json(destination);
    } catch (error) {
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