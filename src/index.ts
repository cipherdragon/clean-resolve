class PromiseRejection<T> extends Error {
    constructor(public error: T) {
        super("Promise rejected");

        if (error instanceof Error) {
            this.message = error.message;
            this.stack = error.stack;
            this.cause = error.cause;
            this.name = error.name;
        }
    }
}

function synk<T, K = Error>(promise: Promise<T>) {
    return promise
        .then<T>(data => data)
        .catch<PromiseRejection<K>>((error : K) => new PromiseRejection<K>(error));
}

synk.notOk = (result : any) : result is PromiseRejection<any> => result instanceof PromiseRejection; 
synk.PromiseRejection = PromiseRejection;

export default synk;