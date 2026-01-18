require('dotenv').config();
const mongoose = require('mongoose');
const Topic = require('../Models/topicModel');

mongoose.connect(process.env.MONGODB_URI);

async function generateTopics() {

    // Clear existing topics
    await Topic.deleteMany({});

    const topics = [];

    topics.push({
        name: 'Outdoors',
        description: 'Hiking, Going to the beach, or even good old biking and roller skating. Come if you are craving for some funn under the sun!'
        //nonMembers: Cannot include a member
    });

    topics.push({
        name: 'Sports',
        description: 'Follow this if you want to release some energy with other people at the gym, playing football, etc.'
        //nonMembers: Cannot include a member
    });

    topics.push({
        name: 'Robotics',
        description: "Meet other people dying to build the robot of their dream. Team work makes the dream work"
        //nonMembers: Cannot include a member
    })

    topics.push({
        name: 'Party',
        description: 'Party rock is in the house tonight! Everybody just have a good time!!!'
        //nonMembers: Cannot include a member
    })

    topics.push({
        name: 'Watch Party',
        description: 'A new season of your favorite show just came out, but you have no one to watch it with? This is the place for you'
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