const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Destination = sequelize.define('Destination', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nama_destinasi: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    deskripsi_destinasi: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    jam_operasional: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    harga_tiket: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    fasilitas: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    aktivitas: {
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
    kategori_destinasi: {
        type: DataTypes.STRING,
        allowNull: true
    },
    gambar_destinasi: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    link_whatsapp: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    link_instagram: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    link_youtube: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    link_facebook: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    tableName: 'destinations',
    timestamps: true
});

module.exports = Destination;