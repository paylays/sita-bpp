const express = require("express");
const { login } = require("../controllers/authController");

const router = express.Router();

let blacklist = [];

router.post("/login", login);

const checkBlacklist = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Token tidak ditemukan" });
  }
  if (blacklist.includes(token)) {
    return res.status(401).json({ message: "Token telah dinonaktifkan" });
  }
  next();
};

// Endpoint logout
router.post("/logout", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(400).json({ message: "Token tidak ditemukan" });
  }

  blacklist.push(token);
  return res.status(200).json({ message: "Logout berhasil!" });
});

router.get("/protected", checkBlacklist, (req, res) => {
  res.json({ message: "Anda dapat mengakses halaman ini" });
});

module.exports = router;
