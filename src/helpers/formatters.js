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
  // eslint-disable-next-line no-dupe-else-if
  else if (num && !symbol && upCase && !lowCase)
    characterArray = [...numbers, ...alphabetUpperCase];
  else if (num && symbol && upCase && !lowCase)
    characterArray = [...numbers, ...specialChars, ...alphabetUpperCase];
  else if (lowCase && !num && !symbol && !upCase)
    characterArray = alphabetLowerCase;
  else if (lowCase && num && !symbol && !upCase)
    characterArray = [...alphabetLowerCase, ...numbers];
  // eslint-disable-next-line no-dupe-else-if
  else if (lowCase && !num && symbol && !upCase)
    characterArray = [...alphabetLowerCase, ...specialChars];
  // eslint-disable-next-line no-dupe-else-if
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
    return Math.floor(seconds / 60) === 1 ? `${Math.floor(seconds / 60)} minute` : `${Math.floor(seconds / 60)} minutes`;
  } else if (seconds < 86400) {
    return Math.floor(seconds / 3600) === 1 ? `${Math.floor(seconds / 3600)} hour` : `${Math.floor(seconds / 3600)} hours`;
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
  } else if (years <= 1000000) {
    return `${(years / 1000).toFixed(2)} thousand years`;
  } else if (years <= 1000000000000) {
    return `${(years / 1000000000).toFixed(2)} million years`;
  } else if (years <= 1000000000000000) {
    return `${(years / 1000000000000).toFixed(2)} billion years`;
  } else if (years <= 1000000000000000000) {
    return `${(years / 1000000000000000).toFixed(2)} trillion years`;
  } else if (years <= 1000000000000000000000) {
    return `${(years / 1000000000000000000).toFixed(2)} quadrillion years`;
  } else if (years <= 1000000000000000000000000) {
    return `${(years / 1000000000000000000000).toFixed(2)} quintillion years`;
  } else if (years >= 1000000000000000000000000) {
    return `> 1 sextillion years`;
  }
};

// prettier-ignore
export const hashPerSecondFormatter = (hashes) => {
  if (hashes <= 0) {
    return 'n/a'
  } else if (hashes < Math.pow(10, 3)) { // less than a thousand
    return hashes === 1 ? `${hashes} hash per second` : `${hashes} per second`;
  } else if (hashes < Math.pow(10, 6)) { // less than a million
    return `${Math.floor(hashes / Math.pow(10, 3))} thousand per second`;
  } else if (hashes < Math.pow(10, 9)) { // less than a billion
    return `${Math.floor(hashes / Math.pow(10, 6))} million per second`;
  } else if (hashes < Math.pow(10, 12)) { // less than a trillion
    return `${Math.floor(hashes / Math.pow(10, 9))} billion per second`;
  } else if (hashes < Math.pow(10, 15)) { // less than a quadrillion
    return `${Math.floor(hashes / Math.pow(10, 12))} trillion per second`;
  } else if (hashes < Math.pow(10, 18)) { // less than a quintillion
    return `${Math.floor(hashes / Math.pow(10, 15))} quadrillion per second`;
  } else if (hashes < Math.pow(10, 21)) { // less than a sextillion
    return `${Math.floor(hashes / Math.pow(10, 18))} quintillion per second`;
  } else if (hashes < Math.pow(10, 24)) { // less than a septillion
    return `${Math.ceil(hashes / Math.pow(10, 21))} sextillion per second`;
  } else if (hashes < Math.pow(10, 27)) { // less than a octillion
    return `${Math.floor(hashes / Math.pow(10, 24))} septillion per second`;
  } else if (hashes < Math.pow(10, 30)) { // less than a nonillion
    return `${Math.ceil(hashes / Math.pow(10, 27))} octillion per second`;
  } else if (hashes < Math.pow(10, 33)) { // less than a decillion
    return `${Math.floor(hashes / Math.pow(10, 30))} nonillion per second`
  } else if (hashes < Math.pow(10, 36)) { // less than a undecillion
    return `${Math.floor(hashes / Math.pow(10, 33))} decillion per second`
  } else if (hashes < Math.pow(10, 39)) { // less than a duodecillion
    return `${Math.floor(hashes / Math.pow(10, 36))} undecillion per second`
  } else if (hashes < Math.pow(10, 42)) { // less than a tredecillion
    return `${Math.ceil(hashes / Math.pow(10, 39))} duodecillion per second`
  } else if (hashes < Math.pow(10, 45)) { // less than a quattuordecillion
    return `${Math.floor(hashes / Math.pow(10, 42))} tredecillion per second`
  } else if (hashes < Math.pow(10, 48)) { // less than a quindecillion
    return `${Math.floor(hashes / Math.pow(10, 45))} quattuordecillion per second`
  } else if (hashes < Math.pow(10, 51)) { // less than a sexdecillion
    return `${Math.ceil(hashes / Math.pow(10, 48))} quindecillion per second`
  } else if (hashes < Math.pow(10, 54)) { // less than a septemdecillion
    return `${Math.floor(hashes / Math.pow(10, 51))} sexdecillion per second`
  } else if (hashes < Math.pow(10, 57)) { // less than a octodecillion
    return `${Math.floor(hashes / Math.pow(10, 54))} septemdecillion per second`
  } else if (hashes < Math.pow(10, 60)) { // less than a novemdecillion
    return `${Math.ceil(hashes / Math.pow(10, 57))} octodecillion per second`
  } else if (hashes < Math.pow(10, 63)) { // less than a vigintillion
    return `${Math.floor(hashes / Math.pow(10, 60))} novemdecillion per second`
  } else if (hashes < Math.pow(10, 66)) { // less than a unvigintillion
    return `${Math.floor(hashes / Math.pow(10, 63))} vigintillion per second`
  } else if (hashes < Math.pow(10, 69)) { // less than a duovigintillion 
    return `${Math.floor(hashes / Math.pow(10, 66))} unvigintillion per second`
  } else if (hashes < Math.pow(10, 72)) { // less than a trevigintillion 
    return `${Math.floor(hashes / Math.pow(10, 69))} duovigintillion per second`
  } else if (hashes < Math.pow(10, 75)) { // less than a quattourvigintillion 
    return `${Math.floor(hashes / Math.pow(10, 72))} trevigintillion per second`
  } else if (hashes < Math.pow(10, 78)) { // less than a quinvigintillion
    return `${Math.floor(hashes / Math.pow(10, 75))} quattourvigintillion per second`
  } else if (hashes < Math.pow(10, 81)) { // less than a hexvigintillion
    return `${Math.floor(hashes / Math.pow(10, 78))} quinvigintillion per second`
  } else if (hashes < Math.pow(10, 84)) { // less than a septenvigintillion
    return `${Math.floor(hashes / Math.pow(10, 81))} hexvigintillion per second`
  } else if (hashes < Math.pow(10, 87)) { // less than a octovigintillion
    return `${Math.floor(hashes / Math.pow(10, 84))} septenvigintillion per second`
  } else if (hashes < Math.pow(10, 90)) { // less than a novemvigintillion
    return `${Math.floor(hashes / Math.pow(10, 87))} octovigintillion per second`
  } else if (hashes < Math.pow(10, 93)) { // less than a trigintillion
    return `${Math.floor(hashes / Math.pow(10, 90))} octovigintillion per second`
  } else if (hashes < Math.pow(10, 96)) { // less than a untrigintillion
    return `${Math.floor(hashes / Math.pow(10, 93))} trigintillion per second`
  } else if (hashes < Math.pow(10, 99)) { // less than a duotrigintillion
    return `${Math.floor(hashes / Math.pow(10, 96))} untrigintillion per second`
  } else if (hashes < Math.pow(10, 100)) { // less than a googol
    return `${Math.floor(hashes / Math.pow(10, 99))} duotrigintillion per second`
  } else if (hashes == Math.pow(10, 100)) { // equal to googol
    return `${Math.floor(hashes / Math.pow(10, 100))} googol per second`
  } else {
    return `${Number(hashes).toExponential(2)} per second`
  } 
};
