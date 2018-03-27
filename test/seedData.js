const mongoose = require("mongoose");
const Fiddles = require("./../server/db/fiddles");
const Users = require("./../server/db/users");

const user1 = {
  _id: new mongoose.Types.ObjectId(),
  githubId: 1111111,
  login: "testUser1",
  name: "testUser1"
};

const user2 = {
  _id: new mongoose.Types.ObjectId(),
  githubId: 2222222,
  login: "testUser2",
  name: "testUser2"
};

Users.insertMany([user1, user2])
  .then(() => console.log("       test users inserted to db"))
  .catch(e => console.log(e));

const fiddleU1 = {
  userId: user1._id,
  fiddle: parseInt(Date.now(), 10).toString(36),
  value: "console.log('Testing....');"
};

const fiddleU2 = {
  userId: user2._id,
  fiddle: parseInt(Date.now() + 1, 10).toString(36),
  value: "console.log('Testing....');"
};

const fiddleGuest = {
  fiddle: parseInt(Date.now() + 2, 10).toString(36),
  value: "console.log('Testing....');"
};

Fiddles.insertMany([fiddleU1, fiddleU2, fiddleGuest])
  .then(() => console.log("       test Fiddles inserted to db"))
  .catch(e => console.log(e));

module.exports = {
  testUser: { user1, user2 },
  testFiddle: { fiddleU1, fiddleU2, fiddleGuest }
};
