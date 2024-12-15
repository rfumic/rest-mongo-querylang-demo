import { Stack } from "./stack.js";
const precedence = {
    "=": 2,
    "!=": 2,
    "<": 2,
    "<=": 2,
    ">": 2,
    ">=": 2,
    "OR": 1,
    "AND": 1,
    null: -1
}
const TOKENS = Object.keys(precedence);

// shunting yard algorithm
function infixToPostfix(tokensArray) {
    const stack = new Stack();
    const result = [];
    tokensArray.forEach(token => {
        if (TOKENS.includes(token)) {
            const top = stack.peek();
            if (precedence[top] > precedence[token]) {
                result.push(stack.pop());
            }
            stack.push(token);
        } else {
            result.push(token);
        }
    })
    while (stack.length > 0) {
        result.push(stack.pop());
    }
    return result;
}

function postfixToPrefix(postfixArray) {
    const stack = new Stack();

    postfixArray.forEach(token => {
        if (TOKENS.includes(token)) {
            const right = stack.pop();
            const left = stack.pop();
            stack.push({ [token]: { left, right } })
        } else {
            stack.push(token);
        }
    })

    return stack.first;
}

export function tokenize(query) {
    const tokens = query.split(' ');
    const postfixTokens = infixToPostfix(tokens);
    const prefixTokens = postfixToPrefix(postfixTokens);
    return prefixTokens;
}
