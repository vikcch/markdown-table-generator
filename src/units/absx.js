import { padEdges, removeCharAt, validator } from './fxnl';

export const head = array => array[0];

export const rear = array => array.slice(-1)[0];

export const padSpacedEdges = padEdges(' ');

export const removeLastChar = string => string.slice(0, -1);

export default { head, rear, padSpacedEdges };
