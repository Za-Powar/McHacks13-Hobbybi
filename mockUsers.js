require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { faker } = require('@faker-js/faker');

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
        age: faker.number.int({ min: 18, max: 80 })
      }
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