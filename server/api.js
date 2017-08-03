const fetch = require('node-fetch');
const Fiddles = require('./db/fiddles');
const Users = require('./db/users');

module.exports = (app) => {
  // This will match /fiddles/fiddleNo
  app.get(/^\/fiddles\/\w+$/, (req, res) => {
    const fiddle = req.url.split('/').pop();

    if (fiddle) {
      Fiddles.findOne({ fiddle }, (err, item) => {
        if (!item) {
          return res.status(404).json({
            message: `/* Oops! I got 404,
            * but not the fiddle '${fiddle}' you are looking for :(
            */
            `,
          });
        }

        if (!item.isPrivate) {
          return res.json(item);
        }

        if (!req.isAuthenticated()) {
          return res.status(401).json({
            message: 'This is a private fiddle please login.',
          });
        }

        if (item.userId.toHexString() !== req.user._id) {
          return res.status(400).json({
            message: 'This is a private fiddle!.',
          });
        }

        return res.json(item);
      });
    }
  });

  app.post('/save', (req, res) => {
    if (!req.body.value) {
      return res.status(400).send();
    }

    let fiddle = req.body.fiddle !== -1 && req.isAuthenticated()
      ? req.body.fiddle
      : parseInt(Date.now(), 10).toString(36);

    return Fiddles.findOne({ fiddle }, (err, item) => {
      if (!item) {
        const newFiddle = new Fiddles({
          fiddle,
          value: req.body.value,
        });
        if (req.isAuthenticated()) {
          newFiddle.userId = req.user._id;
        }
        return newFiddle.save(() => res.json({ saved: true, fiddle }));
      }

      if (item.userId && item.userId.toHexString() === req.user._id) {
        const itemToSave = Object.assign(item, { value: req.body.value });
        return itemToSave.save()
          .then(() => res.json({ saved: true, fiddle }))
          .catch(() => res.status(400).send());
      }

      fiddle = parseInt(Date.now(), 10).toString(36);
      const newFiddle = new Fiddles({
        fiddle,
        value: req.body.value,
        userId: req.user._id,
      });

      return newFiddle.save()
        .then(() => res.json({ saved: true, fiddle }))
        .catch(() => res.status(400).send());
    });
  });

  app.post('/star/:fiddleID', (req, res) => {
    const { fiddleID } = req.params;

    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: 'Only logged in user allowed to star fiddle !' });
    }

    return Users.findById(req.user._id)
      .then((user) => {
        if (user.startedFiddles.indexOf(fiddleID) > -1) {
          throw new Error(`fiddle: ${fiddleID} is already stared !`);
        } else {
          return Fiddles.findOneAndUpdate({ fiddle: fiddleID },
            { $inc: { starCounter: 1 } },
            { new: true });
        }
      })
      .then((fiddle) => {
        if (!fiddle) {
          throw new Error(`fiddle: ${fiddleID} Not Found !`);
        }

        return Users.findByIdAndUpdate(req.user._id, {
          $push: { startedFiddles: fiddleID },
        });
      })
      .then(() => res.status(200).send({ stared: true }))
      .catch(err => res.status(400).json({ message: err }));
  });

  app.post('/private/:fiddleID', (req, res) => {
    const { fiddleID } = req.params;

    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: 'Only logged in user allowed to have private fiddle !' });
    }

    return Fiddles.findOne({ fiddle: fiddleID })
      .then((fiddle) => {
        if (!fiddle) {
          throw new Error(`fiddle: ${fiddleID} Not Found !`);
        }

        if (!fiddle.userId) {
          throw new Error('You can only make your own fiddle private please click on save first!');
        } else if (fiddle.userId.toHexString() !== req.user._id) {
          throw new Error('You can only make your own fiddle private !');
        } else {
          return Fiddles.findOneAndUpdate({ fiddle: fiddleID }, { isPrivate: true }, { new: true });
        }
      })
      .then(fiddle => res.json({ fiddle }))
      .catch(err => res.status(400).json({ message: err }));
  });

  app.post('/gist/:fiddleID', (req, res) => {

    // Only authorized user allowed to export a gist
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: 'Only logged in users can export fiddles to Github!' });
    }

    const fiddleID = req.params.fiddleID;
    const token = req.user.accessToken;
    const header = `/**\n  Exported from ESFiddle.net\n  Check it out here https://esfiddle.net/${fiddleID}\n**/`;
    const code = req.body.value;
    const content = `${header}\n\n${code}`;

    Fiddles.findOne({ fiddle: fiddleID })
    .then((fiddle) => {
      const data = {
        description: 'ESFiddle Generated Gist',
        public: !fiddle.isPrivate,
        files: {
          'fiddle.js': {
            content,
          },
        },
      };
      if (!fiddle) {
        throw (`fiddle: ${fiddleID} Not Found !`);
      } else {
        fetch(`https://api.github.com/gists?access_token=${token}`, { method: 'POST', body: JSON.stringify(data) })
          .then(gist => gist.json())
          .then(json => res.json(json));
      }
    })
    .catch( (e) => {
      res.status(400).json({ message: e });
    });
  });
};
