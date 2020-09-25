global.fetch = require("node-fetch");
const config = require("universal-config");
const Unsplash = require("unsplash-js").default;
const toJson = require("unsplash-js").toJson;
const express = require("express");

const unsplash = new Unsplash({
  accessKey: config.get("APP_ACCESS_KEY"),
  secret: config.get("SECRET"),
  callbackUrl: config.get("CALLBACK_URL"),
});

const app = express();

app.get("/api/photos", (req, res) => {
  unsplash.photos
    .listPhotos(1, 30)
    .then(toJson)
    .then((json) => res.json(json));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
