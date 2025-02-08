const express = require('express');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const destinationRoutes = require('./routes/destinationRoutes');
const localcreationRoutes = require('./routes/localCreationRoutes');
const accomodationRoutes = require('./routes/accomodationRoutes');
const eventRoutes = require('./routes/eventRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/api/auth", authRoutes);
app.use('/api/destinations', destinationRoutes);
app.use('/api/localcreations', localcreationRoutes);
app.use('/api/accomodations', accomodationRoutes);
app.use('/api/events', eventRoutes);


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
