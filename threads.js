const cluster = require("cluster");
const os = require("os");

const { start } = require("./index");

if (cluster.isWorker) {
  start();
} else {
  os.cpus().forEach(() => cluster.fork());
}
