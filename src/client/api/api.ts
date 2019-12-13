import io = require("socket.io-client");

const socket = io();

class API {
    on(event: "ClientSourceWatcher.Update", cb: () => void): this;
    on(event: string, cb: (...args: any[]) => void): this; //magic emitter
    on(event: string, cb: (...args: any[]) => void): this {
        socket.on(event, cb);
        return this;
    }

    once(event: string, cb: (...args: any[]) => void): this {
        socket.once(event, cb);
        return this;
    }
}

/** API for communication with the server. Comes from server/socket-api.ts */
export const api = new API();
