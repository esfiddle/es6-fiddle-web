const Fiddles = require('../db/fiddles');
const Users = require('../db/users');

module.exports = (app) => {
  app.get('/profile/:_id', (req, res) => {
    const _id = req.params._id;

    if (req.user && _id === req.user._id) {
      res.redirect('/github/myProfile');
    } else {
      Users.findOne({ _id }, (err, user) => {
        if (user) {
          Fiddles.find({
            userId: req.params._id,
            isPrivate: false,
          }).then((fiddles) => {
            let starFiddle = [];

            // Need to find all starred fiddles and display them if they are public
            starFiddle = user.startedFiddles.map(fiddle => Fiddles.findOne({ fiddle,
              isPrivate: false }).then(pubFiddle => pubFiddle));

            Promise.all(starFiddle).then((value) => {
              // filter null value from array.
              const pubStarFiddles = value.filter(v => v);
              res.render('profile', {
                user,
                fiddles,
                startedFiddles: pubStarFiddles.map(fiddle => fiddle.fiddle),
                message: req.flash()
              });
            });
          });
        } else {
          res.status(404).render('profile', {
            _id,
          });
        }
      });
    }
  });
};
