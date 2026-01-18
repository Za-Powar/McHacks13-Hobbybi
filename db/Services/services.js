require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { faker } = require('@faker-js/faker');

const User = require('../Models/userModel');
const Topic = require('../Models/topicModel');
const Project = require('../Models/projectModel');

async function getTopicId(topicName) {
  const topic = await Topic.findOne({ name: topicName });
  return topic ? topic._id : null;
}

async function createProject(projectName = '', projectDescription = '', projectTopic = 'Outdoors', userID) {
    /*1.create project with userid
    2.add the new project id to the user's projects*/
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new Error("Invalid ID");
    }

    const newProject = await Project.create({
        name: projectName,
        // //nonMembers: Cannot include a member
        description: projectDescription,
        topic: getTopicId(projectTopic),
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

async function addUserToProject(projectID, userID) {
    if (!mongoose.Types.ObjectId.isValid(userID) || !mongoose.Types.ObjectId.isValid(projectID)) {
        throw new Error("Invalid ID");
    }
    
}

const removeProjectFromUser = async (userId, projectId) => {
  return await User.findByIdAndUpdate(
    userId,
    { $pull: { projects: projectId } },
    { new: true }
  );
};