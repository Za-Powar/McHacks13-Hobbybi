require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { faker } = require('@faker-js/faker');

const User = require('../Models/userModel');
const Topic = require('../Models/topicModel');
const Project = require('../Models/projectModel');

mongoose.connect(process.env.MONGODB_URI);

async function getTopicId(topicName) {
  const topic = await Topic.findOne({ name: topicName });
  return topic ? topic._id : null;
}

async function generateUsers(count = 0) {

    await User.deleteMany({});
    const users = [];

    users.push({
        email: 'yann.takougangmbuko@mail.mcgill.ca',
        username: 'jojoFan',
        password: await bcrypt.hash('password123', 10),
        profile: {
        firstName: 'Yann Cesar',
        lastName: 'Takougang Mbuko',
        age: 20
        },
        avatar: 'https://www.gravatar.com/avatar/?d=identicon',
        createdAt: faker.date.past(),
        topics: await Promise.all([
            getTopicId('Outdoors'),
            getTopicId('Robotics'),
            getTopicId('Watch Party'),
        ])
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
      createdAt: faker.date.past(),
      topics: await Promise.all([
            getTopicId('Outdoors'),
            getTopicId('Sports'),
            getTopicId('Party'),
        ])
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
      createdAt: faker.date.past(),
      topics: await Promise.all([
            getTopicId('Outdoors'),
            getTopicId('Robotics'),
            getTopicId('Watch Party'),
            getTopicId('Sports'),
            getTopicId('Party'),
        ]),
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
      createdAt: faker.date.past()
    });

    users.push({
      email: 'nadeem.samaali@mail.mcgill.ca',
      username: 'DDRevolution',
      password: await bcrypt.hash('password123', 10),
      profile: {
        firstName: 'Nadeem',
        lastName: 'Samaali',
        age: 20
      },
      createdAt: faker.date.past(),
      topics: await Promise.all([
            getTopicId('Outdoors'),
            getTopicId('Robotics'),
            getTopicId('Watch Party'),
            getTopicId('Sports'),
            getTopicId('Party'),
        ]),
    });

    users.push({
      email: 'dragos.bajanica@mail.mcgill.ca',
      username: 'THEengineer',
      password: await bcrypt.hash('password123', 10),
      profile: {
        firstName: 'Dragos',
        lastName: 'Bajanica',
        age: 20
      },
      createdAt: faker.date.past(),
      topics: await Promise.all([
            getTopicId('Outdoors'),
            getTopicId('Robotics'),
            getTopicId('Watch Party'),
            getTopicId('Sports'),
            getTopicId('Party'),
        ]),
    });

  //Creates additional random users if desired
  /*
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
      createdAt: faker.date.past()
    });
  }
  */
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