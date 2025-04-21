'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('localcreations', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      kategori_ekraf: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nama_ekraf: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      deskripsi_ekraf: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      jam_operasional: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      harga_produk: {
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
      gambar_kreasilokal: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      link_instagram: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      link_youtube: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      link_facebook: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.TIMESTAMP,
        allowNull: true,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updateAt: {
        type: Sequelize.TIMESTAMP,
        allowNull: true,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('localcreations');
  },
};
