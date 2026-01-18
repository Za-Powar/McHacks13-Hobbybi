require('dotenv').config();
const mongoose = require('mongoose');
const Project = require('../Models/projectModel');
const User = require('../Models/userModel');
const Topic = require('../Models/topicModel');
const { faker } = require('@faker-js/faker');

mongoose.connect(process.env.MONGODB_URI);

async function getUserId(userName) {
  const user = await User.findOne({ username: userName });
  return user ? user._id : null;
}

async function getTopicId(topicName) {
  const topic = await Topic.findOne({ name: topicName });
  return topic ? topic._id : null;
}

async function createProject(projectName = '', projectDescription = '', projectTopic = 'Outdoors', userName) {

    const userID = await getUserId(userName);

    if (!mongoose.Types.ObjectId.isValid(userID)) {
        console.log(`THIS IS THE INVALID ID ${userID}"`);
        throw new Error("Invalid ID");
    }

    const newProject = await Project.create({
        name: projectName,
        // //nonMembers: Cannot include a member
        description: projectDescription,
        topic: await getTopicId(projectTopic),
        creator: userID
    });

    const user = await User.findByIdAndUpdate(
        userID,
        { $addToSet: { projects: newProject._id } },
        { new: true }
    );

    if (!user) {
        throw new Error("User not found");
    }

    return user;
}

async function generateProjects() {

    await Project.deleteMany({});

    let name = 'Sunrise Trail Hike';
    let description = `I’m planning an early-morning hike to catch the sunrise and enjoy some fresh air. Anyone want to join me on the trail?`;
    let topic = 'Outdoors';
    let creator = 'Za_powar';

    await createProject(name, description, topic, creator);

    name = 'Campfire & Stories Night';
    description = `I’m thinking of doing a relaxed campfire night with snacks and stories under the stars. Would anyone be interested in coming along?`;
    topic = 'Outdoors';
    creator = 'jojoFan';

    await createProject(name, description, topic, creator);

    name = 'Community Soccer Match';
    description = `I’m trying to put together a casual soccer game this weekend, open to all skill levels. Who’s in?`;
    topic = 'Sports';
    creator = 'Za_powar';

    await createProject(name, description, topic, creator);

    name = 'Weekend Fitness Challenge';
    description = `I want to run a fun fitness challenge with a few short activities to get moving. Anyone want to join me?`;
    topic = 'Sports';
    creator = 'DDRevolution';

    await createProject(name, description, topic, creator);

    name = 'Build-Your-First Robot Workshop';
    description = `I’m planning a hands-on session to build a simple robot and learn the basics together. Would anyone like to join?`;
    topic = 'Robotics';
    creator = 'DDRevolution';

    await createProject(name, description, topic, creator);

    name = "Robot Battle Showcase";
    description = `I’d love to organize a friendly robot challenge to test what we build. Who wants to participate?`;
    topic = 'Robotics';
    creator = 'genie';

    await createProject(name, description, topic, creator);

    name = 'Themed Costume Party';
    description = `I’m thinking about hosting a themed costume party with music and games. Anyone interested?`;
    topic = 'Party';
    creator = 'genie';

    await createProject(name, description, topic, creator);

    name = 'Game Night Bash';
    description = `I want to host a game night with board games, snacks, and good vibes. Who’s down to come hang out?`;
    topic = 'Party';
    creator = 'Za_powar';

    await createProject(name, description, topic, creator);

    name = 'Big Game Watch Party';
    description = `I’m planning to watch the big game on a large screen and make it a group thing. Want to join?`;
    topic = 'Watch Party';
    creator = 'DDRevolution';

    await createProject(name, description, topic, creator);

    name = 'Series Finale Marathon';
    description = `I’m getting together to watch the final episodes of a show and react together. Anyone want to come watch with me?`;
    topic = 'Watch Party';
    creator = 'jojoFan';

    await createProject(name, description, topic, creator);
    console.log(`${10} projects created!`);
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