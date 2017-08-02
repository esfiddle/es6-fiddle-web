/**
 * Author: Michael Weibel <michael.weibel@gmail.com>
 * License: MIT
 */

const passport = require('passport');
const StrategyMock = require('./strategy-mock');
const Users = require('./../server/db/users');

function verifyFunction(user, done) {
  Users.findById(user.id)
    .then(foundUser => done(null, foundUser))
    .catch(e => done(e, null));
}

module.exports = function (app, options) {
  passport.use(new StrategyMock(options, verifyFunction));

  app.get('/mock/login', passport.authenticate('mock'), (req, res) => {
    res.send({ user: req.user });
  });
};
