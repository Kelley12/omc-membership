import { div } from "./definitions";
import { router } from "./components";
import "./routes";
import { api } from "./api";
import "./style";

const layout = div({ content: [
    div({
        content: router,
        class: "container",
        attributes: { style: "margin-top: 70px" }
    })
]});

// "Hot reload" client code watcher for development.
// Reloads browser (no cache) if server reports that client source has changed.
// Note: This is turned off in production.
api.on("ClientSourceWatcher.Update", () => window.location.reload());

router.start();

document.body.appendChild(layout);
