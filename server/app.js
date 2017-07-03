require('dotenv').config();

const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('./auth');
const api = require('./api');
const app = express();
const port = Number(process.env.PORT || 5001);
const Poet = require('poet');
const path = require('path');
const poet = Poet(app, {
    posts: './_posts',
    postsPerPage: 5,
    metaFormat: 'json',
    routes: {
        '/blog/:post': 'blog/post',
        '/tags/:tag': 'blog/tag',
        '/categories/:category': 'blog/category',
        '/blog/:page': 'blog/page'
    }
});

const routeStatic = require('./routes/static')
const routeIndex = require('./routes/index')
const routeProfile = require('./routes/profile')
const routeAuth = require('./routes/auth')

app.use(compression());
app.use(bodyParser.json());
app.use(flash());
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    if (req.url.match(/^\/(images|lib\/babel)\/.+/)
        || req.url.match(/^\/(src\/es6-fiddle|src\/authenticated).+/)
        || req.url.match(/^\/(authenticated)/)
    ) {
        res.setHeader('Cache-Control', 'public, max-age=2628000');
    }
    next();
});

poet.init();

app.set('views', `${path.resolve("./")}/views`);
app.set('view engine', 'ejs');

routeAuth(app);
routeProfile(app);
routeStatic(app);
routeIndex(app);
api(app);

app.listen(port);

console.log(
    `Starting server on port ${port}.`
);

module.exports.app = app;
