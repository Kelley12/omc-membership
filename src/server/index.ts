#! /usr/bin/env node
import { Server } from "./server";
import { logger, ClientSourceWatcher } from "./definitions";
import { readJSONSync } from "fs-extra";
import { MembershipController } from "./controllers";

// Client Source Watcher for hot browser refresh is only for development
const clientSourceWatcher = (process.env.NODE_ENV === "development") ?
        new ClientSourceWatcher("./dist/client/bundle.js") : undefined;

const version = readJSONSync(`${__dirname}/../../package.json`).version;
logger.log("info", `Version is ${version}`);

logger.log("info", "Initializing Membership Controller");
const membershipController = new MembershipController();
logger.registerEmitter(membershipController, { level: "info" });

logger.log("info", "Initializing server");
const server = new Server({ membershipController, clientSourceWatcher });
logger.registerEmitter(server, { level: "verbose" });

const PORT = Number(process.env.PORT) || 9000;
server.listen("0.0.0.0", PORT);
