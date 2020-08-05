import { capitalize, trim } from 'lodash';

export const getNumericPart = (str) => {
  if (typeof str === 'number') {
    return str;
  }

  let startPos = 0;
  let endPos = str.length - 1;
  for (let i = 0; i < str.length; i += 1) {
    if (isFinite(str[i])) {
      startPos = i;
      break;
    }
  }
  for (let j = str.length - 1; j >= 0; j -= 1) {
    if (isFinite(str[j])) {
      endPos = j;
      break;
    }
  }
  return str.slice(startPos, endPos + 1);
};

export const parseCountryName = (country) => {
  if (!country) {
    return '';
  }

  const parts = country.split('_');
  const newParts = parts.map(part => capitalize(part));
  return newParts.join(' ');
};

export const eatSpaces = (str) => {
  const trimedString = trim(str);
  const result = [trimedString[0]];
  for (let i = 1; i < trimedString.length; i += 1) {
    const curLetterAscii = trimedString[i].charCodeAt(0);
    const prevLetterAscii = result[result.length - 1].charCodeAt(0);
    if ((curLetterAscii !== 32 && curLetterAscii !== 160) || (prevLetterAscii !== 32 && prevLetterAscii !== 160)) {
      result.push(trimedString[i]);
    }
  }
  return result.join('');
};
