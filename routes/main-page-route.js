var express = require('express');
var router = express.Router();

/* GET home page. */

router.get(/^\/\w+\/$/, (req, res) => {
    res.sendFile(`${__dirname  }/static/index.html`);
});

router.get(/^\/embed\/\w+\/$/, (req, res) => {
    res.sendFile(`${__dirname  }/static/embed.html`);
});

module.exports = router;