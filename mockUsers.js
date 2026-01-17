require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { faker } = require('@faker-js/faker');

const topicList = ['Outdoors', 'Sports', 'Shopping', 'Cooking', 'Watch Party'];

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

// 1. CREATE THE SCHEMA (you define this based on what data you want)
const userSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  username: { 
    type: String, 
    required: true, 
    unique: true 
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
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  topics: {
    type: [String],  // Array of strings
    default: []      // Empty array by default
  },
  likedProjects: {
    type: [String],  // Array of strings (interested projects)
    default: []
  },
  unlikedProjects: {
    type: [String],  // Array of strings (not interested projects)
    default: []
  }
});

// 2. CREATE THE MODEL from the schema
const User = mongoose.model('User', userSchema);

// 3. USE THE MODEL to create mock users
async function generateMockUsers(count = 50) {
  const users = [];
  
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
      topics: faker.helpers.arrayElements(topicList, faker.number.int({ min: 0, max: topicList.length })), // Random list of random topics
      /*likedProjects: , THEY WILL BE FETCHED FROM THE DATABASE
      unlikedProjects:*/
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
generateMockUsers(10);