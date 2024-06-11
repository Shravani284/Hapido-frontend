// third-party
// import { sub } from 'date-fns';
// import { Chance } from 'chance';

export const range = (len: number) => {
  const arr = [];
  for (let i = 0; i < len; i += 1) {
    arr.push(i);
  }
  return arr;
};

function mockData() {}

export default mockData;
