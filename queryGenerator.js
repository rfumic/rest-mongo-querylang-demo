import is_number from "is-number";
import { tokenize } from "./tokenizer.js";

export default function generateQuery(queryString) {
    const tokens = tokenize(queryString);
    const result = parse(tokens);
    return result;
    return JSON.stringify(result);
}

const operators = {
    "=": "$eq",
    "!=": "$ne",
    "<": "$lt",
    "<=": "$lte",
    ">": "$gt",
    ">=": "$gte",
    "AND": "$and",
    "NOT": "$not", // TODO
    "OR": "$or",
    "NOR": "$nor",
}

function parse(tokenTree) {
    let result = {};
    for (let [key, value] of Object.entries(tokenTree)) {
        const operator = operators[key];
        switch (key) {
            case "=":
            case "<":
            case "<=":
            case ">=":
            case "!=":
            case ">": {
                const right = is_number(value.right) ? parseFloat(value.right) : value.right;
                result = { [value.left]: { [operator]: right } };
                break;
            }
            case "OR":
            case "NOR":
            case "AND": {
                const left = parse(value.left);
                const right = parse(value.right);
                result = { [operator]: [left, right] };
                break;
            }

        }
    }
    return result;
}
