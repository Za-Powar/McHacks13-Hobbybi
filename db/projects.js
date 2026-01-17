require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { faker } = require('@faker-js/faker');


const randActivities = ['Photography', 'Hiking', 'Cooking', 'Gaming', 'Reading'];
const randNouns = ['Workshop', 'Meetup', 'Session', 'Event', 'Club'];

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

// 1. CREATE THE SCHEMA (you define this based on what data you want)
const projectSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    unique: true
  },
  name: { 
    type: String, 
    required: true, 
    unique: true 
  },
  members: {
    type: [  // Array of subdocuments
      {
        userID: {
          type: String,
          required: true
        },
        joinedAt: {
          type: Date,
          default: Date.now
        }
      }
    ],
    default: []  // ← Add this for empty array default
  },
  nonMembers: {
    type: [  // Array of subdocuments
      {
        userID: {
          type: String,
          required: true
        },
        joinedAt: {
          type: Date,
          default: Date.now
        }
      }
    ],
    default: []  // ← Add this for empty array default
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  description: {
    type: String,
    default: "Come join my activity!"
  }
});
// 2. CREATE THE MODEL from the schema
const Project = mongoose.model('Project', projectSchema);

// 3. USE THE MODEL to create mock users
async function generateMockProjects(count = 50) {
  const projects = [];
  
  for (let i = 0; i < count; i++) {

    projects.push({
        _id: 'project' + (i + 1),
      name: `${faker.helpers.arrayElement(randActivities)} ${faker.helpers.arrayElement(randNouns)}`,
      //members: We'll fetch them from the database
      // //nonMembers: Cannot include a member
      description: faker.lorem.sentences(3)
    });
  }

  try {
    await Project.insertMany(projects);
    console.log(`${count} mock users created!`);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    mongoose.connection.close();
  }
}

// 4. RUN THE FUNCTION
generateMockProjects(5);