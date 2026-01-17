require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../Models/userModel');

mongoose.connect(process.env.MONGODB_URI);

async function generateUsers(count = 0) {

    await User.deleteMany({});
  const users = [];

  users.push({
      email: 'yann.takougangmbuko@mail.mcgill.ca',
      username: 'theJojoFan',
      password: await bcrypt.hash('password123', 10),
      profile: {
        firstName: 'Yann Cesar',
        lastName: 'Takougang Mbuko',
        age: 20
      },
      avatar: 'https://www.gravatar.com/avatar/?d=identicon'
    });

    users.push({
      email: 'ibrahim.temzi@mail.mcgill.ca',
      username: 'Za_powar',
      password: await bcrypt.hash('password123', 10),
      profile: {
        firstName: 'Ibrahim',
        lastName: 'Temzi',
        age: 80
      },
      //topics: faker.helpers.arrayElements(topicList, faker.number.int({ min: 0, max: topicList.length })), // Random list of random topics
    });

    users.push({
      email: 'elodie.su@mail.mcgill.ca',
      username: 'genie',
      password: await bcrypt.hash('password123', 10),
      profile: {
        firstName: 'Elodie',
        lastName: 'Su',
        age: 20
      },
    });

    users.push({
      email: 'harini.reddy@mail.mcgill.ca',
      username: 'TemziHaterNo1',
      password: await bcrypt.hash('password123', 10),
      profile: {
        firstName: 'Harini',
        lastName: 'V. Reddy',
        age: 20
      },
    });

  //Creates additional random users if desired
  for (let i = 0; i < count; i++) {
    users.push({
      email: faker.internet.email(),
      username: faker.internet.username(),
      password: await bcrypt.hash('password123', 10),
      profile: {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        age: faker.number.int({ min: 17, max: 40 })
      },
    });
  }

  await User.insertMany(users);
  console.log(`${users.length} users created!`);
}

generateUsers()
  .then(() => {
    console.log('Users seeded successfully!');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error seeding users:', err);
    mongoose.connection.close();
  });