require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { faker } = require('@faker-js/faker');

const topicList = ['Outdoors', 'Sports', 'Shopping', 'Cooking', 'Watch Party'];

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

// 1. CREATE THE SCHEMA (you define this based on what data you want)
const userSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
        unique: true
    },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  username: { 
    type: String, 
    required: true, 
  },
  password: { 
    type: String, 
    required: true 
  },
  profile: {
    firstName: String,
    lastName: String,
    age: Number
  },
  avatar: {
    type: String,  // URL from hosting service
    default: 'https://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=identicon'
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

// 2. CREATE THE MODEL from the schema
const User = mongoose.model('User', userSchema);

// 3. USE THE MODEL to create mock users
async function generateMockUsers(count = 0) {
  const users = [];

  users.push({
        _id: 'user1',
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
        _id: 'user2',
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
        _id: 'user3',
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
        _id: 'user4',
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
        _id: 'user' + (i + 5),
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

  try {
    await User.insertMany(users);
    console.log(`${count} mock users created!`);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    mongoose.connection.close();
  }
}

// 4. RUN THE FUNCTION
generateMockUsers();