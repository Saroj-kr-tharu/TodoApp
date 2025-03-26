"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("NotificationTickets", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      subject: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      content: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      recepientEmail: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      status: {
        type: Sequelize.ENUM,
        allowNull: false,
        values: ["PENDING", "SUCCESS", "FAILED"],
        defaultValue: "PENDING",
      },
      notificationTime: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      typeMail: {
        type: Sequelize.ENUM,
        allowNull: false,
        values: ["WELCOME", "VERIFY", "FORGET", "TASKREMAINDER"],
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      token: {
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
    await queryInterface.dropTable("NotificationTickets");
  },
};
