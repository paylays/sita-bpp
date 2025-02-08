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
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('destinations');
  }
};
