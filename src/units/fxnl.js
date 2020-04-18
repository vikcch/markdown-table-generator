export const makePrefixer = prefix => string => `${prefix}${string}`;

export const makeSufixer = sufixe => string => `${string}${sufixe}`;

export const padEdges = (edges, count) => string => {

    return `${edges.repeat(count)}${string}${edges.repeat(count)}`;
};

export const removeCharAt = index => string => string.slice(0, index) + string.slice(0, index + 1);

export const validator = (...tests) => obj => tests.every(fn => fn(obj));

export default { makePrefixer, makeSufixer, removeCharAt, validator };