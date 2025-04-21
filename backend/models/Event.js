const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Event = sequelize.define('Event', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    penyelenggara_acara: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    judul_acara: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    deskripsi_acara: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status_acara: {
      type: DataTypes.ENUM("upcoming", "past"),
      allowNull: false,
      defaultValue: "upcoming",
    },
    tanggal_mulai_acara: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    tanggal_selesai_acara: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    waktu_acara: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    gambar_acara: { 
      type: DataTypes.STRING,
      allowNull: true,
    },
}, {
    tableName: 'events',
    timestamps: true
});

module.exports = Event;