const path = require('path');

module.exports = app => {
    app.get('/blog', (req, res) => {
        res.render('blog/index');
    });

    app.get('/about', (req, res) => {
        res.sendFile(`${path.resolve("./")}/dist/about.html`);
    });
    
    app.get('/faq', (req, res) => {
        res.sendFile(`${path.resolve("./")}/dist/faq.html`);
    });
}
