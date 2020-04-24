export const pipe = (...fns) => arg => fns.reduce((acc, cur) => cur(acc), arg);

// Inclui o tamanho da string no paddig.
// count = 10, string.length = 4, preenche 6 (3+3)
export const padEdges = edges => (string, count) => {

    const countSide = Math.floor((count - string.length) / 2);

    const isOdd = (count - string.length) % 2 === 1;

    const text = isOdd ? `${edges}${string}` : string;

    return `${edges.repeat(countSide)}${text}${edges.repeat(countSide)}`;
};

export const validator = (...tests) => obj => tests.every(fn => fn(obj));

export const addTextToTag = tag => text => `<${tag}>${text}</${tag}>`;

export default { validator, addTextToTag };

