'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('destinations', 'foto1', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('destinations', 'foto2', {
      type: Sequelize.STRING,
      allowNull: true
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('destinations', 'foto1');
    await queryInterface.removeColumn('destinations', 'foto2');
  }
};
