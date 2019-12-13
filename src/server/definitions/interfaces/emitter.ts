export interface Emitter {
    on(event: "Error", cb: (error: Error) => void): this;
    on(event: string, cb: (...args: any[]) => void): this;
    onAny(cb: (event: string | string[], ...args: any[]) => void): this;
}
