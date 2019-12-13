import { membership } from "./pages";
import { router } from "./components";

router.route("/", {
    name: "Membership",
    render: _ => membership.render()
});
