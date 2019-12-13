import { FSWatcher } from "chokidar";
import { EventEmitter2 } from "eventemitter2";

/**
 * Watches changes to client source files and sends an update event 
 * to the client app when file changes occur. 
 * Handy for "hot-reloading" the client during development.
 */
export class ClientSourceWatcher {
    private readonly emitter = new EventEmitter2();
    private readonly watcher: FSWatcher;

    constructor(filePath: string) {
        this.watcher = new FSWatcher({
            awaitWriteFinish: {
                stabilityThreshold: 1000,
                pollInterval: 100
            },
        });
        this.watcher.add(filePath);

        this.watcher.on("ready", () => {
            this.watcher.on("change", () => {
                this.emitter.emit("Update");
            });
        });
    }

    on(event: "Update", cb: () => void): this;
    on(event: string, cb: (...args: any[]) => void): this {
        this.emitter.on(event, cb);
        return this;
    }

    once(event: string, cb: (...args: any[]) => void): this {
        this.emitter.once(event, cb);
        return this;
    }

    onAny(cb: (event: string | string[], ...args: any[]) => void): this {
        this.emitter.onAny(cb);
        return this;
    }
}

