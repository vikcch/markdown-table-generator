export const makePrefixer = prefix => string => `${prefix}${string}`;

export const makeSufixer = sufixe => string => `${string}${sufixe}`;

// Inclui o tamanho da string no paddig.
// count = 10, string.length = 4, preenche 6 (3+3)
export const padEdges = edges => (string, count) => {

    const countSide = Math.floor((count - string.length) / 2);

    const isOdd = (count - string.length) % 2 === 1;

    const text = isOdd ? ` ${string}` : string;

    return `${edges.repeat(countSide)}${text}${edges.repeat(countSide)}`;
};

export const removeCharAt = index => string => string.slice(0, index) + string.slice(0, index + 1);

export const validator = (...tests) => obj => tests.every(fn => fn(obj));

export default { makePrefixer, makeSufixer, removeCharAt, validator };
