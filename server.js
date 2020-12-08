global.fetch = require("node-fetch");
const config = require("universal-config");
const Unsplash = require("unsplash-js").default;
const toJson = require("unsplash-js").toJson;
const express = require("express");
const path = require('path');

const unsplash = new Unsplash({
  accessKey: config.get("APP_ACCESS_KEY"),
  secret: config.get("SECRET"),
  callbackUrl: config.get("CALLBACK_URL"),
});

const app = express();

app.get("/api/photos", (req, res) => {
  unsplash.search
    .photos(req.query.keyword, req.query.page, 30)
    .then(toJson)
    .then((json) => res.json(json));
});

app.use(express.static(path.join(__dirname, 'client', 'build')));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
