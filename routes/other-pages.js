var express = require('express');
var router = express.Router();

router.get('/about', (req, res) => {
    res.sendFile(`${__dirname  }/static/about.html`);
});

router.get('/blog', (req, res) => {
    res.render('blog/index');
});

module.exports = router;
