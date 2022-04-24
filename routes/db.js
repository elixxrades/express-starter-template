const express = require("express");
const router = express.Router();

module.exports = class HomeRouter {
  constructor(client) {
    this.client = client;
    this.name = "Database";
    this.route = "/db";
    this.once = false;
  }

  run() {
    var { db, logger } = this.client;

    router.post("/get", (req, res, next) => {
      logger.info("get route");
      try {
        var { key } = req.body;
        var data = db.main.get(key);
        res.status(200).json(data);
      } catch (err) {
        logger.error("Router Error", err);
        res.status(500).send(err);
      }
    });

    router.post("/set", (req, res, next) => {
      try {
        var { key, set } = req.body;
        db.main.set(key, set);
        return res.status(200).json({ key, set });
      } catch (err) {
        logger.error("Router Error", err);
        return res.status(500).send(err);
      }
    });

    router.post("/push", (req, res, next) => {
      try {
        var { key, set } = req.body;
        db.main.push(key, set);
        res.status(200).json({ key, set });
      } catch (err) {
        logger.error("Router Error", err);
        res.status(500).send(err);
      }
    });

    router.post("/pull", (req, res, next) => {
      try {
        var { key, set } = req.body;
        db.main.pull(key, set);
        res.status(200).json({ key, set });
      } catch (err) {
        logger.error("Router Error", err);
        res.status(500).send(err);
      }
    });

    return router;
  }
};
