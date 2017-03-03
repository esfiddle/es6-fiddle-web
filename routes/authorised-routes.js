var express = require('express');
var router = express.Router();
var passport = require('passport');
var Fiddles = require('./db/fiddles');

router.get('/authenticated', (req, res) => {
    res.send({'logged': req.isAuthenticated()});
})

router.get('/github/login', (req, res) => {
    res.render('login');
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    console.log('ensureAuthenticated: failed');
    res.redirect('/github/login');
}

router.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }), (req, res) => {
      // The request will be redirected to GitHub for authentication, so this
     // function will not be called.
      console.log('just to get rid of lint error !',res);
  });

router.get('/auth/github/callback',
  passport.authenticate('github', {
      failureRedirect: '/github/login',
      failureFlash: true,
      successFlash: 'Welcome!'
  }),
  (req, res) => {
    // Successful authentication, redirect home.
      res.redirect('/github/myProfile');
  });

router.get('/github/myProfile', ensureAuthenticated, (req, res) => {
    Fiddles.find({userId:req.user._id}).then ( fiddles => {
        res.render('authenticated', {
            user: req.user, fiddles:fiddles,
            startedFiddles:req.user.startedFiddles,
            message: req.flash() });
    })
    .catch( e => res.status(400).send(e));

});

router.get('/github/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;