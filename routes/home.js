const express = require("express");
const router = express.Router();
const packagej = require("../package.json");
module.exports = class HomeRouter {
  constructor(client) {
    this.client = client;
    this.name = "Home";
    this.route = "/";
    this.once = false;
  }

  run() {
    router.get("/", (req, res, next) => {
      res.status(200).json({
        version: packagej.version,
        author: packagej.author,
        license: packagej.license,
      });
    });

    return router;
  }
};
