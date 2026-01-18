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
        auth0Id: 'user1',
        email: 'yann.takougangmbuko@mail.mcgill.ca',
        password: await bcrypt.hash('password123', 10),
        username: 'jojoFan',
        profile: {
        firstName: 'Yann Cesar',
        lastName: 'Takougang Mbuko',
        age: 20
        },
        socialMedia: {
            instagram: 'https://www.instagram.com/taky_stream/',
            facebook: 'https://www.facebook.com/yann.mbuko/',
            discord: 'yann_476'
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
        auth0Id: 'user2',
        email: 'ibrahim.temzi@mail.mcgill.ca',
        password: await bcrypt.hash('password123', 10),
        username: 'Za_powar',
        profile: {
        firstName: 'Ibrahim',
        lastName: 'Temzi',
        age: 80
        },
        socialMedia: {
            instagram: 'https://www.instagram.com/ibrahim_temzi/',
            facebook: 'https://www.facebook.com/ibrahim.temzi.2025',
        },
        createdAt: faker.date.past(),
        topics: await Promise.all([
            getTopicId('Outdoors'),
            getTopicId('Sports'),
            getTopicId('Party'),
        ])
    });

    users.push({
        auth0Id: 'user3',
        email: 'elodie.su@mail.mcgill.ca',
        password: await bcrypt.hash('password123', 10),
        username: 'genie',
        profile: {
        firstName: 'Elodie',
        lastName: 'Su',
        age: 20
        },
        socialMedia: {
            instagram: 'https://www.instagram.com/elod.e_su/'
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
        auth0Id: 'user4',
      email: 'harini.reddy@mail.mcgill.ca',
      password: await bcrypt.hash('password123', 10),
      username: 'TemziHaterNo1',
      profile: {
        firstName: 'Harini',
        lastName: 'V. Reddy',
        age: 20
      },
      createdAt: faker.date.past()
    });

    users.push({
      auth0Id: 'user5',
      email: 'nadeem.samaali@mail.mcgill.ca',
      password: await bcrypt.hash('password123', 10),
      username: 'DDRevolution',
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
      auth0Id: 'user6',
      email: 'dragos.bajanica@mail.mcgill.ca',
      password: await bcrypt.hash('password123', 10),
      username: 'THEengineer',
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