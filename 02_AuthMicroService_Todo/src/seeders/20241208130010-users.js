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
      "Users",
      [
        {
          email: "saroj@gmail.com",
          password: "Sarojis a good boy",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "john.doe@example.com",
          password: "JohnDoePassword",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "jane.doe@example.com",
          password: "JaneDoePassword",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "alice@example.com",
          password: "AlicePassword",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "bob@example.com",
          password: "BobPassword",
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
