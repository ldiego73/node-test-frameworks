const cluster = require("cluster");
const os = require("os");

const log = console.log;

if (cluster.isMaster) {
    const cpus = os.cpus().length;
    for (let i = 0; i < cpus; i++) {
        cluster.fork();
    }

    cluster.on("online", worker =>
        log(`Worker ${worker.process.pid} is online`)
    );
    cluster.on("exit", (worker, exitCode) => {
        log(`Worker ${worker.process.id} exited with code ${exitCode}`);
        log(`Starting a new worker`);
        cluster.fork();
    });
} else {
    // worker task
    require("./server");
}
