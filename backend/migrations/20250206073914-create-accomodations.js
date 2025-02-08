'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('accomodations', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      kategori_akomodasi: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nama_akomodasi: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      deskripsi_akomodasi: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      jumlah_kamar_tersedia: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      harga_kamar: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fasilitas: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      no_whatsapp: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      alamat: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      link_gmaps: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('accomodations');
  }
};
