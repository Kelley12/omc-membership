import { Component } from "../definitions";

/**
 * String, Element or and array of Elements
 * to put inside of an html tag
 */
export type HTMLContent = string | Element | Component |
    (string | Element | Component)[];

export type Attributes = { [name: string]: string };

export type InputTypes = "text" | "password" | "number" | "checkbox" | "file" |
    "button" | "submit" | "time" | "url" | "radio" | "color" | "date" | "datetime-local" |
    "email" | "hidden" | "image" | "reset" | "month" | "search" | "tel" | "week" | "range";

function fillElement(element: Element, content?: HTMLContent): void {
    if (!content) return;

    if (typeof(content) === "string") {
        const textNode = document.createTextNode(content);
        element.appendChild(textNode);
        return;
    }

    if (isComponent(content)) {
        element.appendChild(content.element);
        return;
    }

    if (content instanceof Element) {
        element.appendChild(content);
        return;
    }

    content.forEach(item => fillElement(element, item));
}

function setElementAttributes(element: Element, attributes?: Attributes): void {
    if (attributes) {
        for (const attr in attributes) {
            if (attr === "src") {
                (element as HTMLImageElement).src = attributes[attr];
                continue;
            }

            element.setAttribute(attr, attributes[attr]);
        }
    }
}

/** Create a new html element */
export function html(opts: {
    /** Tag name of the element */
    tag: string,
    /** Content inside of the element */
    content?: HTMLContent,
    /** Element CSS classes */
    class?: string,
    /** Any other element attributes */
    attributes?: Attributes
}): Element {
    const { tag, content } = opts;

    const el = document.createElement(tag);

    fillElement(el, content);
    if (opts.class) el.setAttribute("class", opts.class);
    setElementAttributes(el, opts.attributes);

    return el;
}

export function button(opts: {
    type?: string;
    content?: HTMLContent,
    class?: string,
    attributes?: Attributes
} = {}): HTMLButtonElement {
    return html({
        tag: "button",
        class: opts.class,
        attributes: {
            type: opts.type || "text",
            ...opts.attributes
        },
        content: opts.content
    }) as HTMLButtonElement;
}

/** Create a new div element */
export function div(opts?: {
    content?: HTMLContent,
    class?: string,
    attributes?: Attributes
}): Element {
    return html({ tag: "div", ...opts });
}

/** Create a new form element */
export function form(opts?: {
    content?: HTMLContent,
    class?: string,
    attributes?: Attributes
}): HTMLFormElement {
    return html({ tag: "form", ...opts }) as HTMLFormElement;
}

/** Create a new nav element */
export function nav(opts?: {
    content?: HTMLContent,
    class?: string,
    attributes?: Attributes
}): Element {
    return html({ tag: "nav", ...opts });
}

/** Create a new anchor element */
export function a(opts?: {
    content?: HTMLContent,
    class?: string,
    attributes?: Attributes
}): Element {
    return html({ tag: "a", ...opts });
}

/** Create a new paragraph element */
export function p(opts?: {
    content?: HTMLContent,
    class?: string,
    attributes?: Attributes
}): Element {
    return html({ tag: "p", ...opts });
}

/** Create a new ul element */
export function ul(opts?: {
    content?: HTMLContent,
    class?: string,
    attributes?: Attributes
}): Element {
    return html({ tag: "ul", ...opts });
}

/** Create a new ol element */
export function ol(opts?: {
    content?: HTMLContent,
    class?: string,
    attributes?: Attributes
}): Element {
    return html({ tag: "ol", ...opts });
}

export function option(opts: {
    content?: HTMLContent,
    class?: string,
    value?: string,
    attributes?: Attributes
} = {}): HTMLOptionElement {
    return html({ tag: "option",
        class: opts.class,
        content: opts.content,
        attributes: {
            value: opts.value || "",
            ...opts.attributes
        }
    }) as HTMLOptionElement;
}

/** Create a new li element */
export function li(opts?: {
    content?: HTMLContent,
    class?: string,
    attributes?: Attributes
}): Element {
    return html({ tag: "li", ...opts });
}

/** Create a new span element */
export function span(opts?: {
    content?: HTMLContent,
    class?: string,
    attributes?: Attributes
}): Element {
    return html({ tag: "span", ...opts });
}

export function select(opts?: {
    content?: HTMLContent,
    class?: string,
    attributes?: Attributes
}): HTMLSelectElement {
    return html({ tag: "select", ...opts }) as HTMLSelectElement;
}

export function i(opts?: {
    content?: HTMLContent,
    class?: string,
    attributes?: Attributes
}): Element {
    return html({ tag: "i", ...opts });
}

/** Create a new img element */
export function img(opts?: {
    content?: HTMLContent,
    class?: string,
    attributes?: Attributes
}): Element {
    return html({ tag: "img", ...opts });
}

/** Create a new img element */
export function input(opts: {
    type?: InputTypes,
    name?: string,
    value?: string,
    placeholder?: string,
    class?: string,
    attributes?: Attributes
} = {}): HTMLInputElement {
    return html({
        tag: "input",
        class: opts.class,
        attributes: {
            type: opts.type || "text",
            name: opts.name || "",
            placeholder: opts.placeholder || "",
            value: opts.value || "",
            ...opts.attributes
        }
    }) as HTMLInputElement;
}

/** Create a new header element */
export function header(opts?: {
    content?: HTMLContent,
    class?: string,
    attributes?: Attributes
}): Element {
    return html({ tag: "header", ...opts });
}

/** Create a new h1 element */
export function h1(opts?: {
    content?: HTMLContent,
    class?: string,
    attributes?: Attributes
}): Element {
    return html({ tag: "h1", ...opts });
}

/** Create a new h2 element */
export function h2(opts?: {
    content?: HTMLContent,
    class?: string,
    attributes?: Attributes
}): Element {
    return html({ tag: "h2", ...opts });
}

/** Create a new h3 element */
export function h3(opts?: {
    content?: HTMLContent,
    class?: string,
    attributes?: Attributes
}): Element {
    return html({ tag: "h3", ...opts });
}

/** Create a new label element */
export function label(opts?: {
    content?: HTMLContent,
    class?: string,
    attributes?: Attributes
}): Element {
    return html({ tag: "label", ...opts });
}

/** Create a new label element */
export function textarea(opts: {
    name?: string,
    placeholder?: string,
    class?: string,
    attributes?: Attributes
} = {}): HTMLTextAreaElement {
    return html({
        tag: "textarea",
        class: opts.class,
        attributes: {
            name: opts.name ? opts.name : "",
            placeholder: opts.placeholder ? opts.placeholder : "",
            ...opts.attributes
        }
    }) as HTMLTextAreaElement;
}

/**
 * Mount an elemnet to the document body
 * @param el - element to mount
 * @param selector - Selector of the element to mount to
 * @returns true if the element was mounted, false otherwise
 */
export function mount(el: Element, selector: string): boolean {
    const mountElement = document.querySelector(selector);
    if (mountElement) {
        mountElement.appendChild(el);
        return true;
    }
    return false;
}

/** Remove everything from the inside of an Element */
export function removeChildrenFromElement(el: string | Element): void {
    let elActual: Element | null;

    if (typeof (el) === "string") {
        elActual = document.getElementById(el);
    } else {
        elActual = el;
    }

    if (elActual) {
        while (elActual.firstChild) {
            elActual.removeChild(elActual.firstChild);
        }
    }
}

function isComponent(comp: any): comp is Component {
    return comp !== undefined && !!comp.element;
}
