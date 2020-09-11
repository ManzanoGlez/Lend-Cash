'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Users", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        name: {
            type: Sequelize.STRING(191),
            allowNull: false,
        },
        lastName: {
            type: Sequelize.STRING(191),
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING(191),
            allowNull: false,
        },
        password: {
            type: Sequelize.STRING(191),
            allowNull: false,
        },
        telephone: {
            type: Sequelize.STRING(191),
            allowNull: false,
        },
        img: {
            type: Sequelize.STRING(191),
            allowNull: true,
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
        },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};