require('dotenv').config();
const mongoose = require('mongoose');
const Project = require('../Models/projectModel');
const User = require('../Models/userModel');
const { faker } = require('@faker-js/faker');

const randActivities = ['Photography', 'Hiking', 'Cooking', 'Gaming', 'Reading'];
const randNouns = ['Workshop', 'Meetup', 'Session', 'Event', 'Club', 'Adventure'];

mongoose.connect(process.env.MONGODB_URI);

async function generateProjects(count = 10) {

  await Project.deleteMany({});

  const projects = [];
  const allUserIDs = await User.find().distinct('_id');
  
  for (let i = 0; i < count; i++) {

    projects.push({
      name: `${faker.helpers.arrayElement(randActivities)} ${faker.helpers.arrayElement(randNouns)}`,
      members: faker.helpers.arrayElements(allUserIDs, faker.number.int({ min: 0, max: allUserIDs.length })),
      // //nonMembers: Cannot include a member
      description: faker.lorem.sentences(3)
    });
  }

  await Project.insertMany(projects);
  console.log(`${projects.length} projects created!`);
}

// 4. RUN THE FUNCTION
generateProjects()
  .then(() => {
    console.log('Projects seeded successfully!');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error seeding projects:', err);
    mongoose.connection.close();
  });