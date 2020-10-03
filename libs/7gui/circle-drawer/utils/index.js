export const getRandomIntBtw = (min, max) =>
  min + Math.ceil(Math.random() * (max - min));

export const getDistanceBtw2Points = ({ x: x1, y: y1 }, { x: x2, y: y2 }) =>
  Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

export const deepCloneObject = (obj) => JSON.parse(JSON.stringify(obj));

export const getObjectLength = (obj) => Object.keys(obj).length;
