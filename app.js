var express = require('express'),
    compression = require('compression'),
    bodyParser = require('body-parser'),
    pkg = require('./package.json'),
    api = require('./api'),
    app = express(),
    port = Number(process.env.PORT || 5001);

app.use(compression());
app.use(bodyParser.json());
app.use('/', express.static(__dirname + '/static'));

app.get(/^\/\w+\/$/, function(req, res) {
    res.sendFile(__dirname + '/static/index.html');
});

app.get(/^\/embed\/\w+\/$/, function(req, res) {
    res.sendFile(__dirname + '/static/embed.html');
});

app.get(/^\/\w+$/, function(req, res) {
    res.redirect(req.url + '/');
});

app.get(/^\/embed\/\w+$/, function(req, res) {
    res.redirect(req.url + '/');
});

api(app);

app.listen(port);

console.log(
    'Express version ' +
    pkg.dependencies.express.replace(/[^\w\.]/g, '') +
    ' starting server on port ' +
    port +
    '.'
);

module.exports.app = app;
