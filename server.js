const express = require("express");
const app = express();
const cors = require("cors");
const sspLogger = require("../modules/logger");
const getFiles = require("./utils/getFiles");
const loadRoutes = require("./utils/loadRoutes");
const bodyParser = require("body-parser");
const { JsonDatabase } = require("allahc.c.db");
const db = {
  main: new JsonDatabase({ path: "./db/main.json" }),
  users: new JsonDatabase({ path: "./db/users.json" }),
  posts: new JsonDatabase({ path: "./db/posts.json" }),
};

const logger = new sspLogger({
  logPath: process.cwd() + "/logs",
  name: "express",
});

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.listen(3000, async () => {
  logger.info("App Started On : 3000");
  await loadRoutes(app, {
    db: db,
    logger: logger,
  });
});
