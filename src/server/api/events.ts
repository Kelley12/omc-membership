import socketIO = require("socket.io");
import { Server } from "http";
import { ClientSourceWatcher } from "../definitions";

const hasFunction = (args: any[]) => args.some(arg => arg instanceof Function);

/**
 * The events API forwards relevant async events to the browser over websockets.
 * In general if the node process needs to tell the browser something it should
 * be done in this class. If the browser needs to tell the server something it
 * should be in an Express REST API.
 *
 * Events take the form Device.Event
 *
 * For example, a robot start event will be sent to the browser as Robot.Start
 *
 * The exception is Error events. those show as Error regardless
 * of what device they are attached to.
 *
 * EventsAPI uses the socket.io library. On the client, the events
 * can be listened to with socket.io-client
 */
export class EventsAPI {
    private readonly ioSocket: socketIO.Server;
    private readonly emitters: Emitters;

    constructor(server: Server, emitters: Emitters) {
        this.ioSocket = socketIO(server);
        this.emitters = emitters;
        this.forwardEvents();
    }

    /** Emit an error not captured by an emitter passed in the contructor */
    sendError(err: Error) {
        this.ioSocket.emit("Error", err);
    }

    /** Use this function to forward an event from an emitter to the browser */
    private forwardEvents() {
        const { clientSourceWatcher } = this.emitters;

        /**
         * The forwarder function returns an event listener that automatically forwards
         * a devices Error event as Error and all other events as Device.Event
         */
        const forwarder = (device: string) => {
            return (event: string | string[], ...args: any[]) => {
                // socket.io throws an error if any of these args has a function
                if (hasFunction(args)) return;

                // If an error occurs, we want to forawrd it as a general Error event.
                if (event === "Error") return this.sendError(args[0]);

                // Forward the event prefixed with it's emitting device.
                this.ioSocket.emit(`${device}.${event}`, ...args);
            };
        };

        if (clientSourceWatcher) {
            clientSourceWatcher.onAny(forwarder("ClientSourceWatcher"));
        }
    }
}

/**
 * Emitters the EventsAPI should have access to. This can be any
 * class that might emit event we'd want the browser to know of.
 */
interface Emitters {
    clientSourceWatcher?: ClientSourceWatcher;
}
