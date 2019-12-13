import { createServer } from "http";
import { resolve } from "path";
import bodyParser = require("body-parser");
import { EventEmitter2 } from "eventemitter2";
import express = require("express");
import { ClientSourceWatcher } from "./definitions";
import { EventsAPI, apiRouter } from "./api";
import { MembershipController } from "./controllers";

export class Server {
    private readonly app = express();
    private readonly server = createServer(this.app);
    readonly appPath = resolve(`${__dirname}/../client`);
    private readonly emitter = new EventEmitter2();
    private readonly events: EventsAPI;

    constructor({
        membershipController, clientSourceWatcher
    }: {
        membershipController: MembershipController, clientSourceWatcher?: ClientSourceWatcher,
        [name: string]: any;
    }) {
        this.events = new EventsAPI(this.server, { clientSourceWatcher });

        this.app.use((req, _res, next) => {
            this.emitter.emit("ClientRequest", { url: req.url, method: req.method });
            next();
        });

        // In production environments serve gzip'd js assets
        if (process.env.NODE_ENV === "production") {
            this.app.get("/*.js", (req, res, next) => {
                req.url = `${req.url}.gz`;
                res.set("content-encoding", "gzip");
                res.set("content-type", "text/javascript");
                next();
            });
        }

        this.app.use(express.static(this.appPath));
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json({ type: "application/json" }));

        this.app.use("/api", apiRouter({ membershipController }));
        this.app.get("*", (_req, res) => res.sendFile(`${this.appPath}/index.html`));

        // Any uncaught error in an express router is handled here
        this.app.use((
            error: Error, _req: express.Request,
            res: express.Response, _next: express.NextFunction
        ) => {
            this.events.sendError(error);
            this.emitter.emit("Error", error);
            res.sendStatus(500);
        });
    }

    on(event: "Starting", cb: () => void): this;
    on(event: "Listening", cb: (host: string, port: number) => void): this;
    on(event: "Error", cb: (error: Error) => void): this;
    on(event: string, cb: (...args: any[]) => void): this {
        this.emitter.on(event, cb);
        return this;
    }

    onAny(cb: (event: string | string[], ...args: any[]) => void): this {
        this.emitter.onAny(cb);
        return this;
    }

    listen(host: string, port: number) {
        this.emitter.emit("Starting");
        this.server.listen(port, host, () => {
            this.emitter.emit("Listening", host, port);
        });
    }
}
