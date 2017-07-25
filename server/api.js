// var mongo = require('mongodb').MongoClient,
const fetch = require('node-fetch');
const Fiddles = require('./db/fiddles');
const Users = require('./db/users');

module.exports = function (app) {
  // mongo.connect(String(process.env.MONGODB_URI), function(err, db) {
  //     fiddles = db.collection('fiddles');
  // });

  // This will match /fiddles/fiddleNo
  app.get(/^\/fiddles\/\w+$/, (req, res) => {
    const fiddle = req.url.split('/').pop();

    if (fiddle) {
      Fiddles.findOne({ fiddle }, (err, item) => {
        if (item) {
          //Check if this fiddle is private......
          if(item.isPrivate){
            if(!req.isAuthenticated()){
              return res.status(401).json({
                message: `This is a private fiddle please login.`,
              });
            }
            if(item.userId.toHexString() === req.user._id){
              return res.json(item);
            }else{
              return res.status(400).json({
                message: `This is a private fiddle!.`,
              });
            }
          }
          res.json(item);
        } else {
          res.status(404).json({
            message: `\/* Oops! I got 404,\n * but not the fiddle \"${fiddle
            }\" you are looking for :( \n *\/\n`,
          });
        }
      });
    }
  });

  app.post('/save', (req, res) => {
    let fiddle;
    if (req.body.value) { // don't save anything empty
      if (req.body.fiddle !== -1 && req.isAuthenticated()) {  // Check if user trying to save existing fiddle;
        fiddle = req.body.fiddle;
      } else {
        fiddle = parseInt(Date.now(), 10).toString(36);
      }
      Fiddles.findOne({ fiddle }, (err, item) => {
        if (!item) { // If no fiddle found save new fiddle
          const newFiddle = new Fiddles({
            fiddle,
            value: req.body.value,
          });
          if (req.isAuthenticated()) {
            newFiddle.userId = req.user._id;
          }
          newFiddle.save(() => {
            console.log('       Inserted fiddle at', `${fiddle}.`);
            res.json({      // send response after saving fiddle
              saved: true,
              fiddle,
            });
          });
        } else { // Existing fiddle found update that fiddle
          if (item.userId && item.userId.toHexString() === req.user._id) {
            item.value = req.body.value;
            item.save().then(() => {
              console.log('       updated fiddle at', `${fiddle}.`);
              res.json({      // send response after saving fiddle
                saved: true,
                fiddle,
              });
            })
              .catch(() => res.status(400).send());
          } else {
            fiddle = parseInt(Date.now(), 10).toString(36);
            const newFiddle = new Fiddles({
              fiddle,
              value: req.body.value,
              userId: req.user._id,
            });
            newFiddle.save().then(() => {
              console.log('       Inserted fiddle at', `${fiddle}.`);
              res.json({      // send response after saving fiddle
                saved: true,
                fiddle,
              });
            })
              .catch(() => res.status(400).send());
          }
        }
      });
    } else {
      res.status(400).send();
    }
  });

  app.post('/star/:fiddleID', (req, res) => {
    const fiddleID = req.params.fiddleID;

    // Only authorized user allowed to star a fiddle
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: 'Only logged in user allowed to star fiddle !' });
    }

    // First check if user already started this fiddle before.
    Users.findById(req.user._id).then((user) => {
      if (user.startedFiddles.indexOf(fiddleID) > -1) {
        throw (`fiddle: ${fiddleID} is already stared !`);
      } else {
        return Fiddles.findOneAndUpdate({ fiddle: fiddleID },
          { $inc: { starCounter: 1 } },
          { new: true });
      }
    }).then((fiddle) => {
      if (!fiddle) {
        throw (`fiddle: ${fiddleID} Not Found !`);
      }
      // Now add this fiddle to user startedFiddle array
      return Users.findByIdAndUpdate(req.user._id, {
        $push: { startedFiddles: fiddleID },
      });
    }).then(() => res.status(200).send({ stared: true })).catch((e) => {
      // console.log('star/:fiddle', e);
      res.status(400).json({ message: e });
    });
  });

  app.post('/private/:fiddleID', (req, res) => {
      const fiddleID = req.params.fiddleID;

      // Only authorized user allowed to star a fiddle
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: 'Only logged in users allowed to have private fiddles!' });
      }


      Fiddles.findOne({fiddle:fiddleID}).then(fiddle => {
            if(!fiddle){
              throw (`fiddle: ${fiddleID} Not Found !`);
            }
            if(!fiddle.userId){
                //This fiddle is saved by anonymous user...
              throw (`You can only make your own fiddle private please click on save first!`);
            }else if(fiddle.userId.toHexString() !== req.user._id ){
                throw (`You can only make your own fiddle private !`);
            }else{
              return Fiddles.findOneAndUpdate({ fiddle: fiddleID }, {isPrivate:true}, { new: true });
            }
         }).then( fiddle => res.json({fiddle}))
         .catch( e => {
            //console.log(e);
            res.status(400).json({ message: e })});

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
