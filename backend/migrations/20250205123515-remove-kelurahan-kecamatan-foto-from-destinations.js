'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('destinations', 'kelurahan');
    await queryInterface.removeColumn('destinations', 'kecamatan');
    await queryInterface.removeColumn('destinations', 'foto1');
    await queryInterface.removeColumn('destinations', 'foto2');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('destinations', 'kelurahan', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('destinations', 'kecamatan', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('destinations', 'foto1', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('destinations', 'foto2', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  }
};
