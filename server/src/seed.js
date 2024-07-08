const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { faker } = require("@faker-js/faker");

const seed = async () => {
  const users = [];
  for (let i = 0; i < 10; i++) {
    const user = await prisma.user.create({
      data: {
        username: faker.internet.userName(),
        password: faker.internet.password(),
      },
    });
    users.push(user);
  }
  console.log(users);

  for (let i = 0; i < 3; i++) {
    const randomUSer = users[Math.floor(Math.random() * users.length)];
    await prisma.post.create({
      data: {
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraphs(3),
        userId: randomUSer.id,
      },
    });
  }
};

seed()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

module.exports = seed;
