import { Page, div } from "../../definitions";
import { MembershipComponent } from "../../components";

/** The Membership Page */
export class Membership implements Page {
    private readonly element = div({ class: "columns is-centered", content: [
        div({ class: "column is-three-quarters vertically-spaced", content: [
            new MembershipComponent()
        ]})
    ]});

    render() {
        return this.element;
    }
}
