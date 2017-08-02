/**
 * Run this file to test DB
 * Only need to run this file after setting up MONGODB_URI
 * export MONGODB_URI='mongodb://localhost:27017/Fiddles'
 * Not actual test file this is just to check if any conflict with old and new database schema
 */

// Just ran this file after setting up MONGODB_URI

const mongoose = require('mongoose');
const Users = require('./users');
const Fiddles = require('./fiddles');

const userId = new mongoose.Types.ObjectId();

const user = new Users({
  login: 'octocat',
  name: 'monalisa octocat',
  email: 'octocat@github.com',
  avatar_url: 'https://github.com/images/error/octocat_happy.gif',
  url: 'https://api.github.com/users/octocat',
  html_url: 'https://github.com/octocat',
  location: 'San Francisco',
  company: 'GitHub',
  public_repos: 2,
  public_gists: 4,
  followers: 20,
  following: 0,
  accessToken: 'randomAccesToken',
  refreshToken: 'randomRefreshToken',
  totalFiddles: 2,
});

const testFiddle1 = new Fiddles({
  userId,
  fiddle: parseInt(Date.now(), 10).toString(36),
  value: "console.log('Testing....');",
});

const testFiddle2 = new Fiddles({
  fiddle: parseInt(Date.now(), 10).toString(36),
  value: "console.log('Testing....');",
});

user.save()
  .then(savedUser => console.log('User Added:', JSON.stringify(savedUser, undefined, 2)))
  .catch(err => console.log(err));

testFiddle1.save()
  .then(fiddle => console.log('Fiddle added(with UserID):', JSON.stringify(fiddle, undefined, 2)))
  .catch(err => console.log(err));

testFiddle2.save()
  .then(fiddle => console.log('Fiddle added(without UserID):', JSON.stringify(fiddle, undefined, 2)))
  .catch(err => console.log(err));
