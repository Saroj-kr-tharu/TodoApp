"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert(
      "notificationtickets",
      [
        {
          id: 1,
          subject: "Meeting Reminder",
          content: "Don't forget about the meeting at 10 AM.",
          recepientEmail: "sarojc11345@gmail.com",
          status: "PENDING",
          notificationTime: "2024-12-25 10:00:00",
          typeMail: "TASKREMAINDER",
          username: "Alice",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          subject: "Project Deadline",
          content: "The project deadline is approaching. Please submit your work.",
          recepientEmail: "sarojc11345@gmail.com",
          status: "PENDING",
          notificationTime: "2024-12-25 11:00:00",
          typeMail: "WELCOME",
          username: "Bob",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          subject: "System Maintenance",
          content: "The system will be down for maintenance from 12 PM to 1 PM.",
          recepientEmail: "sarojc11345@gmail.com",
          status: "PENDING",
          notificationTime: "2024-12-25 12:00:00",
          typeMail: "VERIFY",
          username: "Charlie",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          subject: "Password Reset",
          content: "Click the link to reset your password.",
          recepientEmail: "sarojc11345@gmail.com",
          status: "PENDING",
          notificationTime: "2024-12-25 13:00:00",
          typeMail: "FORGET",
          username: "David",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("notificationtickets", null, {});
  },
};
