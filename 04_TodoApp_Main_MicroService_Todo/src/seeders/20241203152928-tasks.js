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
      "tasks",
      [
        {
          title: "Music class",
          email: "sarojc11345@gmail.com",
          description: " Music class at  ",
          complete: true,
          status: "pending",
          priority: "low",
          dueDate: new Date(),
          completedAt: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Dance class",
          email: "sarojc11345@gmail.com",
          description: " Dance class at  ",
          complete: false,
          status: "complete",
          priority: "meduim",
          dueDate: new Date(),
          completedAt: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Mobile Repair",
          email: "sarojc11345@gmail.com",
          description: " Mobile Repairing at 2500 cost ",
          complete: false,
          status: "incomplete",
          priority: "high",
          dueDate: new Date(),
          completedAt: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Bank Deposit",
          email: "sarojc11345@gmail.com",
          description: " Bank Deposit 25000  ",
          complete: false,
          status: "complete",
          priority: "low",
          dueDate: new Date(),
          completedAt: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
