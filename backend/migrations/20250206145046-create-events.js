'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("events", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      penyelenggara_acara: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      judul_acara: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      deskripsi_acara: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      status_acara: {
        type: Sequelize.ENUM("upcoming", "past"),
        allowNull: false,
        defaultValue: "upcoming",
      },
      tanggal_mulai_acara: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      tanggal_selesai_acara: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      gambar_acara: {
        type: Sequelize.STRING,
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

  }
};
