import { removeChildrenFromElement, Component, div } from "../../definitions";
// const page = require("page").default;
import { default as page } from "page";
import { EventEmitter2 } from "eventemitter2";

export type Route = {
    name: string,
    render(ctx: PageJS.Context): Element
};

export type Routes = { [path: string]: Route };

/**
 * The router watches window history and
 * displays registered paths in it's element
 * property
 */
export class Router implements Component {
    private readonly emitter = new EventEmitter2();
    private readonly routes: Routes = {};
    private started = false;
    readonly element = div();

    constructor() {
        this.listenForPageChange();
    }

    private listenForPageChange(): void {
        page((ctx, next) => {
            if (this.routes[ctx.pathname]) {
                this.emitter.emit("PageChange", ctx.pathname, this.routes[ctx.pathname]);
            }
            next();
        });
    }

    private showPage(ctx: PageJS.Context, path: string): void {
        const route = this.routes[path];
        if (route) {
            removeChildrenFromElement(this.element);
            this.element.appendChild(route.render(ctx));
        } else {
            throw new Error(`No route for path: ${path}`);
        }
    }

    on(event: "Started", cb: () => void): void;
    on(event: "NewRoute", cb: (path: string, route: Route) => void): void;
    on(event: "PageChange", cb: (path: string, route: Route) => void): void;
    on(event: string, cb: (...values: any[]) => void): void {
        this.emitter.on(event, cb);
    }

    /**
     * Return the name of the current page we are on
     */
    currentPageName(): Promise<string> {
        let pageName = "";
        const route = this.routes[window.location.pathname];
        if (route) pageName = route.name;

        if (!this.started) {
            return new Promise(resolve => {
                this.emitter.once("Started", () => this.currentPageName().then(resolve));
            });
        }

        return Promise.resolve(pageName);
    }

    /**
     * Get a copy of all registered routes
     */
    getRoutes(): Routes {
        return { ...this.routes };
    }

    /**
     * Display the element of a registered path.
     * Updates the url.
     * @param path path to go to
     */
    goTo(path: string): void {
        page(path);
    }

    /**
     * Register a new route
     */
    route(path: string, route: Route): void {
        this.routes[path] = { ...route };
        page(path, (ctx) => this.showPage(ctx, path));

        this.emitter.emit("NewRoute", path, { ...route });
    }

    /**
     * Start the router
     */
    start(): void {
        page.start();
        this.started = true;
        this.emitter.emit("Started");
    }
}

export const router = new Router();
