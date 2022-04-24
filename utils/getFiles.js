const path = require("path");
const fs = require("fs-extra");

async function getFiles(dir, fileList = []) {
  const files = await fs.readdir(path.join(dir));
  for (const file of files) {
    fileList.push(path.join(dir, file));
  }
  return fileList;
}

module.exports = getFiles;
