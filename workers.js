const { parentPort, workerData } = require("worker_threads");

// let counter = 0;

console.log("from parent", workerData);

let counter = workerData.counter;

for (let i = 0; i < workerData.total; i++) {
  counter++;
  console.log("counter------------", counter);
}

parentPort.postMessage(counter);
