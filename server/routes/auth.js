const passport = require('../auth');
const Fiddles = require('../db/fiddles');

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  return res.redirect('/github/login');
};

module.exports = (app) => {
  app.get('/authenticated', (req, res) => {
    res.send({ logged: req.isAuthenticated() });
  });

  app.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }), (req, res) => res);

  app.get('/auth/github/callback',
    passport.authenticate('github', {
      failureRedirect: '/github/login',
      failureFlash: true,
      successFlash: 'Welcome!',
    }), (req, res) => {
      res.redirect('/github/myProfile');
    });

    app.get('/auth/github', passport.authenticate('github', { scope: ['user:email', 'gist'] }), (req, res) => {
        console.log('just to get rid of lint error !', res);
    });

    app.get('/auth/github/callback',
        passport.authenticate('github', {
            failureRedirect: '/github/login',
            failureFlash: true,
            successFlash: 'Welcome!'
        }), (req, res) => {
            // Successful authentication, redirect home.
            res.redirect('/github/myProfile');
        });
      })
      .catch(e => res.status(400).send(e));
  });

  app.get('/github/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });
};
