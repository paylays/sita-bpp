const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const JWT_SECRET = process.env.JWT_SECRET;

app.post('/admin/login', async (req, res) => {
  const { email, password } = req.body;

  if (email !== ADMIN_EMAIL) {
    return res.status(400).json({ message: 'Email tidak valid' });
  }

  // Verifikasi password
  const isPasswordValid = await bcrypt.compare(password, ADMIN_PASSWORD);
  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Password salah' });
  }

  // Jika valid, buat JWT token
  const token = jwt.sign({ email: ADMIN_EMAIL }, JWT_SECRET, { expiresIn: '4h' });
  res.json({ token });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
