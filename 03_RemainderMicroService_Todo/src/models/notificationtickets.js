"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class NotificationTickets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  NotificationTickets.init(
    {
      subject: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: null,
        defaultValue: null
      },
      recepientEmail: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { isEmail: true },
      },

      status: {
        type: DataTypes.ENUM,
        allowNull: false,
        defaultValue: "PENDING",
        values: ["PENDING", "SUCCESS", "FAILED"],
      },
      notificationTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      typeMail: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ["WELCOME", "VERIFY", "FORGET", "TASKREMAINDER"],
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,

      },
      token: {
        type: DataTypes.STRING,
        

      },
    },
    {
      sequelize,
      modelName: "NotificationTickets",
    }
  );
  return NotificationTickets;
};
