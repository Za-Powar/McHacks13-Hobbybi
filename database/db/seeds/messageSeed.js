require('dotenv').config();
const mongoose = require('mongoose');
const Project = require('../Models/projectModel');
const User = require('../Models/userModel');
const Message = require('../Models/messageModel');

mongoose.connect(process.env.MONGODB_URI);

async function getUserId(userName) {
  const user = await User.findOne({ username: userName });
  return user ? user._id : null;
}

async function getProjectId(projectName) {
  const project = await Project.findOne({ name: projectName });
  return project ? project._id : null;
}

async function createMessage(messageDate = new Date(Date.now()), messageProject, messageSender, messageContent) {

    await Message.create({
        createdAt: messageDate,
        project: await getProjectId(messageProject),
        sender: await getUserId(messageSender),
        content: messageContent
    });
}

async function generateMessages() {

    await Message.deleteMany({});

    let date = new Date(2026, 0, 18, 12, 15, 40);
    let content = `Hey, if anyone is down to watch Stranger Things this Saturday, feel free to reply!`;
    let sender = 'jojoFan';
    const project = 'Series Finale Marathon';

    await createMessage(date, project, sender, content);
    console.log(`${1} message created!`);
}

// 4. RUN THE FUNCTION
generateMessages()
  .then(() => {
    console.log('Message seeded successfully!');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error seeding message:', err);
    mongoose.connection.close();
  });