const path = require("path");
const express = require("express");

module.exports = app => {
  app.use("/", express.static(`${path.resolve("./")}/dist`));

  app.get(/^\/\w+\/$/, (req, res) => {
    res.sendFile(`${path.resolve("./")}/dist/index.html`);
  });

  app.get(/^\/embed\/\w+\/$/, (req, res) => {
    res.sendFile(`${path.resolve("./")}/dist/embed.html`);
  });

  app.get(/^\/\w+$/, (req, res) => {
    res.redirect(`${req.url}/`);
  });

  app.get(/^\/embed\/\w+$/, (req, res) => {
    res.redirect(`${req.url}/`);
  });
};
