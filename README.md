# Clean Resolve

Clean Resolve is a tiny TypeScript package designed to make it easier to work with async functions by providing a simple utility to handle promises.

## Installation

You can install Clean Resolve using npm:

```bash
npm install clean-resolve
```

## Usage

Here's a basic example of how to use Clean Resolve:

```ts
import synk from 'clean-resolve';

async function fetchData() {
    const data = await synk(fetch('https://api.example.com/data'));

    // call synk.notOk(data) to know if the promise got rejected.
    if (synk.notOk(data)) {
        // If the promise got rejected, access the error with data.error
        console.error(data.error);
    } else {
        console.log('Data fetched successfully:', data);
    }
}
```

## API

### `synk<T, K = Error>(promise: Promise<T>): Promise<T | PromiseRejection<K>>`

Use this function to handle promises. It returns a promise, which will never be rejected when
awaited with `await`. The returned promise will always resolve into, either the passed promise's
result or a instance of `Error` depending on the state of the passed promise. 

If the passed promise is resolved successfully, the returned promise will resolve to the result of the
passed promise. Otherwise, if the passed promise got rejected or thrown an error, the returned promise
will resolve to an instance of `Error`. This `Error` object contains a property `error` which holds the
error that caused the rejection.

Because the returned promise will never be rejected, you can safely await it without wrapping it in a
try-catch block. You can use `synk.notOk(result)` to check if the passed promise got rejected.

In case of a rejection, the returned value will be an instance of `PromiseRejection`, which is a subclass
of `Error`. Therefore, the type of `await synk<T, K = Error>(promise)` is `T | PromiseRejection<K>`. However, the type
will be narrowed down to `T` if you use `synk.notOk(result)` to check if the promise got rejected.

### `synk.notOk(result: any): result is PromiseRejection<any>`

Type guard to check if the result is an instance of `PromiseRejection`. Pass this function a result from
a call to `synk` to check if the promise got rejected. If this function returns `true`, it means the promise
got rejected. If it returns `false`, it means the promise was resolved successfully.

In case of a rejection, you can access the error that caused the rejection with `result.error`.

### `synk.PromiseRejection`

Class representing a promise rejection. This class is exposed so you can use it to build types if needed
when working with typescript.

Example:

```ts
import synk from 'clean-resolve';

// synk.PromiseRejection is used to properly type the result variable.
let result: string | InstanceType<typeof synk.PromiseRejection<Error>>;
const state = 3;

if (state === 3) {
    result = await synk(anAsyncFunctionWhichReturnsString(state));
} else {
    result = await synk(anAsyncFunctionWhichReturnsString(5));
}

if (synk.notOk(result)) {
    console.error(result.error);
} else {
    console.log(result);
}
```

`PromiseRejection` is a subclass of `Error`. In case of a rejection, if the type of the emmited value
of promise rejection is of `Error` type, then the resulting `PromiseRejection` will have the same
error message as the error emitted by the promise rejection.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request on GitHub.

## Author

Adeepa Gunathilake

## Links

- [Repository](https://github.com/cipherdragon/clean-resolve)
- [Issues](https://github.com/cipherdragon/clean-resolve/issues)
- [Homepage](https://github.com/cipherdragon/clean-resolve#readme)