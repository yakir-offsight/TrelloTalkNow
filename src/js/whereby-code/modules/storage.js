import {
    get
} from "./utils";

export function getStoredValues(t) {
    return t.getAll().then(results => {
        const objectPath = ["board", "shared"];
        const teamName = get(results, [...objectPath, "teamName"], "");
        const roomName = get(results, [...objectPath, "roomName"], "");
        const defaultOpen = get(results, [...objectPath, "defaultOpen"], false);
        return {
            teamName,
            roomName,
            defaultOpen,
        };
    });
}

// run promises in sequence
const serial = funcs =>
    funcs.reduce((promise, func) => promise.then(result => func().then([].concat.bind(result))), Promise.resolve([]));

export function setStoredValues(t, keyValues) {
    const keys = Object.keys(keyValues);
    const promiseFns = key => () => t.set("board", "shared", key, keyValues[key]);
    return serial(keys.map(promiseFns));
}

export function clearStoredValues(t) {
    t.remove("board", "shared", ["teamName", "roomName", "defaultOpen"]);
}