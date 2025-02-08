const jwt = require("jsonwebtoken");
require('dotenv').config(); 
const users = require("../models/User");

exports.login = (req, res) => {
  const { email, password } = req.body;

  // Cari user berdasarkan email dan password
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Buat token JWT
  const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET || "secretKey", { expiresIn: "1h" });

  // Kirimkan token sebagai response
  res.json({ token });
};
