'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('destinations', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      nama_destinasi: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      deskripsi_destinasi: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      jam_operasional: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      harga_tiket: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      fasilitas: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      aktivitas: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      alamat: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      link_gmaps: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      kategori_destinasi: {
        type: Sequelize.STRING,
        allowNull: true
      },
      gambar_destinasi: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      link_whatsapp: {
        type: Sequelize.TEXT,
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

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('destinations');
  }
};
