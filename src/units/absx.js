import { padEdges } from "./fxnl";

export const head = array => array[0];

export const tail = array => array.slice(-1)[0];

export const padSpacedEdges = padEdges(' ', 1);

export default { head, tail, padSpacedEdges };
