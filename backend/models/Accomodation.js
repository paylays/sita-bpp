const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Accomodation = sequelize.define('Accomodation', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nama_akomodasi: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    deskripsi_akomodasi: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    jumlah_kamar_tersedia: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    harga_kamar: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    fasilitas: {
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
    kategori_akomodasi: {
        type: DataTypes.STRING,
        allowNull: true
    },
    gambar_akomodasi: {
        type: DataTypes.STRING,
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
    tableName: 'accomodations',
    timestamps: true
});

module.exports = Accomodation;