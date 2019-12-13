import Vue from "vue";

/** Attach a Vue Component to a new Element */
export function VueToElement(vue: Vue): Element {
    const el = document.createElement("div");
    vue.$mount(el);
    return vue.$el;
}

export interface Page {
    render(ctx: PageJS.Context): Element;
}

export interface Component {
    readonly element: Element;
}
