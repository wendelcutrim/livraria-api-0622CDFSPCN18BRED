const { faker } = require('@faker-js/faker');
const bcrypt = require("bcryptjs");

const users = [];

    for(let i = 1; i <= 5; i++) {
      users.push({
        id: i,
        name: faker.name.fullName(),
        email: faker.internet.email().toLowerCase(),
        nickname: users[i].name.toLowerCase(),
        password: bcrypt.hashSync("123456", 10),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }

    console.log(users)