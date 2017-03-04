require('dotenv').config();

const express = require('express'),
    compression = require('compression'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    flash = require('connect-flash'),
    passport = require('./auth'),
    pkg = require('./package.json'),
    api = require('./api'),
    Fiddles = require('./db/fiddles'),
    app = express(),
    port = Number(process.env.PORT || 5001),
    //Setting up poet for blog
    Poet = require('poet'),
    poet = Poet(app, {
        posts:'./_posts',
        postsPerPage: 5,
        metaFormat: 'json',
        routes: {
            '/blog/:post': 'blog/post',
            '/tags/:tag': 'blog/tag',
            '/categories/:category': 'blog/category',
            '/blog/:page': 'blog/page'
        }
    }),
    main = require('./routes/main-page-route'),
    about = require('./routes/other-pages'),
    auth = require('./routes/authorised-routes');

app.use(compression());
app.use(bodyParser.json());
app.use(flash());
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());

// caching middleware
app.use((req, res, next) => {
    if ( req.url.match(/^\/(images|lib\/babel)\/.+/) ) {
        res.setHeader('Cache-Control', 'public, max-age=2628000');
    }
    next();
});

//initialize poet
poet.init();

app.set('views', `${__dirname  }/views`);
app.set('view engine', 'ejs');

//Passport middleware function to make sure user is authenticated.
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    console.log('ensureAuthenticated: failed');
    res.redirect('/github/login');
}

app.use('/', express.static(`${__dirname  }/static`));

app.use('/', main);
app.use('/',about);
app.use('/',auth);
// This one is matching '/xyz/' NOT -> '/xyz/sdf'
// app.get(/^\/\w+\/$/, (req, res) => {
//     res.sendFile(`${__dirname  }/static/index.html`);
// });
// app.get('/about', (req, res) => {
//     res.sendFile(`${__dirname  }/static/about.html`);
// });
// app.get(/^\/embed\/\w+\/$/, (req, res) => {
//     res.sendFile(`${__dirname  }/static/embed.html`);
// });

//poet routes
// app.get('/blog', (req, res) => {
//     res.render('blog/index');
// });

// app.get('/authenticated', (req, res) => {
//     res.send({'logged': req.isAuthenticated()});
// })
// This one is matching '/xyz' NOT -> '/xyz/'
app.get(/^\/\w+$/, (req, res) => {
    res.redirect(`${req.url  }/`);
});

app.get(/^\/embed\/\w+$/, (req, res) => {
    res.redirect(`${req.url  }/`);
});

// app.get('/github/login', (req, res) => {
//     res.render('login');
// });

//TESTING URL FOR GITHUB
// app.get('/auth/github',
//   passport.authenticate('github', { scope: [ 'user:email' ] }), (req, res) => {
//       // The request will be redirected to GitHub for authentication, so this
//      // function will not be called.
//       console.log('just to get rid of lint error !',res);
//   });

// app.get('/auth/github/callback',
//   passport.authenticate('github', {
//       failureRedirect: '/github/login',
//       failureFlash: true,
//       successFlash: 'Welcome!'
//   }),
//   (req, res) => {
//     // Successful authentication, redirect home.
//       res.redirect('/github/myProfile');
//   });

// app.get('/github/myProfile', ensureAuthenticated, (req, res) => {
//     Fiddles.find({userId:req.user._id}).then ( fiddles => {
//         res.render('authenticated', {
//             user: req.user, fiddles:fiddles,
//             startedFiddles:req.user.startedFiddles,
//             message: req.flash() });
//     })
//     .catch( e => res.status(400).send(e));

// });
app.get('/about', (req, res) => {
    res.render('about');
});
// app.get('/github/logout', (req, res) => {
//     req.logout();
//     res.redirect('/');
// });

api(app);

app.listen(port);

console.log(
    `Express version ${
    pkg.dependencies.express.replace(/[^\w\.]/g, '')
    } starting server on port ${
    port
    }.`
);

module.exports.app = app;
