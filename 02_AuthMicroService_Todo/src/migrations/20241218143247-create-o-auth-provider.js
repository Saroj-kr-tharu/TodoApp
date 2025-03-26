"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("oAuthProviders", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      providerUserId: {
        allowNull: false,
        type: Sequelize.STRING(255),
      },
      provider: {
        allowNull: false,
        type: Sequelize.ENUM("google", "facebook", "linkedin", "github"),
      },

      providerUserName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      providerPhoto: {
        allowNull: true,
        type: Sequelize.STRING,
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("oAuthProviders");
  },
};
