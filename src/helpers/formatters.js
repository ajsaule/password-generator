const alphabetLowerCase = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
];
const alphabetUpperCase = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];
const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
const specialChars = [
  '!',
  '@',
  '#',
  '$',
  '%',
  '^',
  '&',
  '*',
  '(',
  ')',
  '_',
  '+',
  '-',
  '=',
  '[',
  ']',
  '{',
  '}',
  ';',
  "'",
  ':',
  '"',
  '|',
  ',',
  '.',
  ',',
  '<',
  '>',
  '/',
  '?',
  '~',
];

export const characterFactory = (
  upCase = false,
  lowCase = false,
  num = false,
  symbol = false
) => {
  let characterArray = [];

  if (upCase && !lowCase && !num && !symbol) characterArray = alphabetUpperCase;
  else if (upCase && lowCase && !num && !symbol)
    characterArray = [...alphabetUpperCase, ...alphabetLowerCase];
  else if (upCase && !lowCase && num && !symbol)
    characterArray = [...alphabetUpperCase, ...alphabetLowerCase];
  else if (upCase && lowCase && num && !symbol)
    characterArray = [...alphabetUpperCase, ...alphabetLowerCase, ...numbers];
  else if (upCase && lowCase && !num && symbol)
    characterArray = [
      ...alphabetUpperCase,
      ...alphabetLowerCase,
      ...specialChars,
    ];
  else if (symbol && !upCase && !lowCase && !num) characterArray = specialChars;
  else if (symbol && !upCase && lowCase && !num)
    characterArray = [...specialChars, ...alphabetLowerCase];
  else if (symbol && upCase && !lowCase && !num)
    characterArray = [...specialChars, ...alphabetUpperCase];
  else if (symbol && !upCase && lowCase && num)
    characterArray = [...specialChars, ...alphabetLowerCase, ...numbers];
  else if (num && !symbol && !upCase && !lowCase) characterArray = numbers;
  else if (num && symbol && !upCase && !lowCase)
    characterArray = [...numbers, ...specialChars];
  else if (num && !symbol && upCase && !lowCase)
    characterArray = [...numbers, ...alphabetUpperCase];
  else if (num && symbol && upCase && !lowCase)
    characterArray = [...numbers, ...specialChars, ...alphabetUpperCase];
  else if (lowCase && !num && !symbol && !upCase)
    characterArray = alphabetLowerCase;
  else if (lowCase && num && !symbol && !upCase)
    characterArray = [...alphabetLowerCase, ...numbers];
  else if (lowCase && !num && symbol && !upCase)
    characterArray = [...alphabetLowerCase, ...specialChars];
  else if (lowCase && num && symbol && !upCase)
    characterArray = [...alphabetLowerCase, ...numbers, ...specialChars];
  else if (upCase && lowCase && num && symbol)
    characterArray = [
      ...alphabetUpperCase,
      ...alphabetLowerCase,
      ...numbers,
      ...specialChars,
    ];

  return characterArray;
};

export const secondsMinutesDaysYearsFormatter = (seconds) => {
  if (seconds <= 60) {
    return `${seconds} seconds`;
  } else if (seconds < 3600) {
    return `${Math.floor(seconds / 60)} minutes`;
  } else if (seconds < 86400) {
    return `${seconds / 3600} hours`;
  } else if (seconds < 604800) {
    return `${seconds / 86400} days`;
  } else if (seconds <= 2628000) {
    return `${seconds / 604800} week`;
  } else if (seconds <= 31540000) {
    return `${seconds / 2628000} month`;
  } else {
    return `${seconds / 31540000} year`;
  }
};

// prettier-ignore
export const daysYearsFormatter = (seconds, days) => {
  if (seconds === 0) {
    return 'instantly'
  } else if (seconds <= 60) {
    return seconds === 1 ? `${seconds} second` : `${seconds} seconds`;
  } else if (seconds < 3600) {
    return `${Math.floor(seconds / 60)} minutes`;
  } else if (seconds < 86400) {
    return `${Math.floor(seconds / 3600)} hours`;
  } else if (days < 365) { // < 1 - less than a year
    return days === 1 ? `${days} day` : `${days} days`;
  } else if (days < 365000) { // < 1000 less than thousand years
    return days === 365
      ? `${(days / 365).toFixed(2)} year`
      : `${(days / 365).toFixed(2)} years`;
  } else if (days < 365000000) { // < 1000000 - less than hundred thousand years
    return `${(days / 365000).toFixed(2)} thousand years`;
  } else if (days < 365000000000) { // < 1000000000 - less than Million years
    return `${(days / 365000000).toFixed(2)} million years`;
  } else if (days < 365000000000000) { // < 1000000000000 - less than Billion years
    return `${(days / 365000000000).toFixed(2)} billion years`;
  } else if (days < 365000000000000000) { // < 1000000000000000 - less than Trillion years
    return `${(days / 365000000000000).toFixed(2)} trillion years`;
  } else if (days < 365000000000000000000) {  // < 1000000000000000000 - less than Quadrillion years
    return `${(days / 365000000000000000).toFixed(2)} quadrillion years`;
  } else {
    return '> 1 quintillion years';
  }
};

export const yearFormatter = (years) => {
  if (years < 1000) {
    return years === 0
      ? '< 1 year'
      : years === 1
      ? years + ' year'
      : years + ' years';
  } else if (years < 1000000) {
    return `${(years / 1000).toFixed(2)} thousand years`;
  } else if (years < 1000000000000) {
    return `${(years / 1000000000).toFixed(2)} million years`;
  } else if (years < 1000000000000000) {
    return `${(years / 1000000000000).toFixed(2)} billion years`;
  } else if (years < 1000000000000000000) {
    return `${(years / 1000000000000000).toFixed(2)} trillion years`;
  } else if (years < 1000000000000000000000) {
    return `${(years / 1000000000000000000).toFixed(2)} quadrillion years`;
  } else if (years < 1000000000000000000000000) {
    return `${(years / 1000000000000000000000).toFixed(2)} quintillion years`;
  } else if (years >= 1000000000000000000000000) {
    return `> 1 sextillion years`;
  }
};
