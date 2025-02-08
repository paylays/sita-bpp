'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('destinations', 'kategori_destinasi', {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: 'Tidak Diketahui'
    });

    await queryInterface.addColumn('destinations', 'kelurahan', {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: 'Tidak Diketahui'
    });

    await queryInterface.addColumn('destinations', 'kecamatan', {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: 'Tidak Diketahui'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('destinations', 'kategori_destinasi');
    await queryInterface.removeColumn('destinations', 'kelurahan');
    await queryInterface.removeColumn('destinations', 'kecamatan');
  }
};
