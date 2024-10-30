class PromiseRejection<T> extends Error {
    constructor(public error: T) {
        super("Promise rejected");

        if (error instanceof Error) {
            this.message = error.message;
            this.cause = error.cause;
            this.stack = error.stack;
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