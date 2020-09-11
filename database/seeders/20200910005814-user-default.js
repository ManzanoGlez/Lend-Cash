'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
 return queryInterface.bulkInsert("Users", [
     {
         name: "Jorge Manzano",
         lastName: "Manzano Gonzalez",
         email: "manzano@gmail.com",
         password: bcrypt.hashSync("123456", bcrypt.genSaltSync()),
         telephone: "3314598239",
         img: null,
         createdAt: new Date(),
         updatedAt: new Date(),
     },
 ]);
  },

  down: async (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete("Users", null, {});

  }
};
