const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const LocalCreation = sequelize.define('LocalCreation', {
  id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
  },
  kategori_ekraf: {
      type: DataTypes.STRING,
      allowNull: false
  },
  nama_ekraf: {
      type: DataTypes.TEXT,
      allowNull: false
  },
  deskripsi_ekraf: {
      type: DataTypes.TEXT,
      allowNull: false
  },
  jam_operasional: {
      type: DataTypes.TEXT,
      allowNull: false
  },
  harga_produk: {
      type: DataTypes.TEXT,
      allowNull: false
  },
  no_whatsapp: {
      type: DataTypes.TEXT,
      allowNull: false
  },
  alamat: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  link_gmaps: {
      type: DataTypes.TEXT,
      allowNull: false
  },
}, {
  tableName: 'localcreations',
  timestamps: false
});

module.exports = LocalCreation;