async function init() {

    const memory = new WebAssembly.Memory({ initial: 1 });

    const importObject = {
        js: { mem: memory },
        console: {
            log: () => {
                console.log("just logging something");
            },
            error: () => {
                console.log(" I am just error");
            }
        }
    }
    const response = await fetch("sum.wasm");
    const buffer = await response.arrayBuffer();


    // const byteArray = new Int8Array(buffer);
    const wasm = await WebAssembly.instantiate(buffer, importObject);
    // const sumFunction = wasm.instance.exports.sum;
    // const wasmMemory = wasm.instance.exports.mem;
    const uint8Array = new Uint8Array(memory.buffer, 0, 2);
    const hiText = new TextDecoder().decode(uint8Array);

    // const result = sumFunction(905, 50);
    console.log(hiText);
}

init();