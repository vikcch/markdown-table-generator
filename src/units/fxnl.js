export const makePrefixer = prefix => string => `${prefix}${string}`;

export const makeSufixer = sufixe => string => `${string}${sufixe}`;

export const padEdges = (edges, count) => string => {

    return `${edges.repeat(count)}${string}${edges.repeat(count)}`;
};


export default { makePrefixer, makeSufixer };