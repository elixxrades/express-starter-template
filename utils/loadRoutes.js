const getFiles = require("./getFiles");
const fs = require("fs-extra");
module.exports = async function (app, client) {
  var data = await getFiles(process.cwd() + "/routes");
  if (data.length === 0) return client.logger.error("missing entry");

  client.logger.debug(`Loading ${data.length} routes.`);
  return data.forEach((x) => {
    var fileClass = require(x);
    var file = new fileClass({ db: client.db, logger: client.logger });
    client.logger.debug(`${file.name} route is loaded.`);
    app.use(file.route, file.run());
  });
};
