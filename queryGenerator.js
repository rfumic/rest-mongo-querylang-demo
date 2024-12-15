import is_number from "is-number";
import { tokenize } from "./tokenizer.js";

export default function generateQuery(queryString) {
    const tokens = tokenize(queryString);
    const result = parse(tokens);
    return result;
    return JSON.stringify(result);
}

function parse(tokenTree) {
    let result = {};
    for (let [key, value] of Object.entries(tokenTree)) {
        switch (key) {
            case "=": {
                const right = is_number(value.right) ? parseFloat(value.right) : value.right;
                result = { [value.left]: right };
                break;
            }
            case ">": {
                result = { [value.left]: { $gt: parseFloat(value.right) } };
                break;
            }
            case "AND": {
                const left = parse(value.left);
                const right = parse(value.right);
                result = { ...left, ...right }
                break;
            }

        }
    }
    return result;
}
