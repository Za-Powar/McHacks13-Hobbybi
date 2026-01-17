require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

// 1. CREATE THE SCHEMA (you define this based on what data you want)
const topicSchema = new mongoose.Schema({
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
  description: {
    type: String,
    default: ""
  }
});

// 2. CREATE THE MODEL from the schema
const Topic = mongoose.model('Topic', topicSchema);

// 3. USE THE MODEL to create mock users
async function generateTopics() {

    const topics = []

    topics.push({
        _id: 'topic1',
        name: 'Outdoors',
        description: 'Hiking, Going to the beach, or even good old biking and roller skating. Come if you are craving for some funn under the sun!'
        //members: We'll fetch them from the database
    });

    topics.push({
        _id: 'topic2',
        name: 'Sports',
        description: 'Follow this if you want to release some energy with other people at the gym, playing football, etc.'
        //members: We'll fetch them from the database
    });

    topics.push({
        _id: 'topic3',
        name: 'Cooking',
        description: "Is there a foreign dish you'd like to make, but you need the help of people more knowledgeable than you? Ask here!"
        //members: We'll fetch them from the database
    })

    topics.push({
        _id: 'topic4',
        name: 'Party',
        description: 'Party rock is in the house tonight! Everybody just have a good time!!!'
        //members: We'll fetch them from the database
    })

    topics.push({
        _id: 'topic5',
        name: 'Watch Party',
        description: 'A new season of your favorite show just came out, but you have no one to watch it with? This is the place for you'
        //members: We'll fetch them from the database
    })

    try {
        await Topic.insertMany(topics);
        console.log(`${topics.length} mock topics created!`);
    } catch (error) {
        console.error('Error:', error);
    } finally {
        mongoose.connection.close();
    }
}

// 4. RUN THE FUNCTION
generateTopics();