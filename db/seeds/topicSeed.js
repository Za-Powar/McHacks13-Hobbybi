require('dotenv').config();
const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const Topic = require('../Models/topicModel');
const User = require('../Models/userModel');
const Project = require('../Models/projectModel');

mongoose.connect(process.env.MONGODB_URI);

async function generateTopics() {

    // Clear existing topics
    await Topic.deleteMany({});

    const topics = [];
    const allUserIDs = await User.find().distinct('_id');
    const allProjectIDs = await Project.find().distinct('_id');

    topics.push({
        name: 'Outdoors',
        description: 'Hiking, Going to the beach, or even good old biking and roller skating. Come if you are craving for some funn under the sun!',
        members: faker.helpers.arrayElements(allUserIDs, faker.number.int({ min: 0, max: allUserIDs.length })),
        projects: faker.helpers.arrayElements(allProjectIDs, faker.number.int({ min: 0, max: allProjectIDs.length }))
        //nonMembers: Cannot include a member
    });

    topics.push({
        name: 'Sports',
        description: 'Follow this if you want to release some energy with other people at the gym, playing football, etc.',
        members: faker.helpers.arrayElements(allUserIDs, faker.number.int({ min: 0, max: allUserIDs.length })),
        projects: faker.helpers.arrayElements(allProjectIDs, faker.number.int({ min: 0, max: allProjectIDs.length }))
        //nonMembers: Cannot include a member
    });

    topics.push({
        name: 'Cooking',
        description: "Is there a foreign dish you'd like to make, but you need the help of people more knowledgeable than you? Ask here!",
        members: faker.helpers.arrayElements(allUserIDs, faker.number.int({ min: 0, max: allUserIDs.length })),
        projects: faker.helpers.arrayElements(allProjectIDs, faker.number.int({ min: 0, max: allProjectIDs.length }))
        //nonMembers: Cannot include a member
    })

    topics.push({
        name: 'Party',
        description: 'Party rock is in the house tonight! Everybody just have a good time!!!',
        members: faker.helpers.arrayElements(allUserIDs, faker.number.int({ min: 0, max: allUserIDs.length })),
        projects: faker.helpers.arrayElements(allProjectIDs, faker.number.int({ min: 0, max: allProjectIDs.length }))
        //nonMembers: Cannot include a member
    })

    topics.push({
        name: 'Watch Party',
        description: 'A new season of your favorite show just came out, but you have no one to watch it with? This is the place for you',
        members: faker.helpers.arrayElements(allUserIDs, faker.number.int({ min: 0, max: allUserIDs.length })),
        projects: faker.helpers.arrayElements(allProjectIDs, faker.number.int({ min: 0, max: allProjectIDs.length }))
        //nonMembers: Cannot include a member
    })
    
    await Topic.insertMany(topics);
  console.log(`${topics.length} topics created!`);
}

generateTopics()
  .then(() => {
    console.log('Topics seeded successfully!');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error seeding topics:', err);
    mongoose.connection.close();
  });