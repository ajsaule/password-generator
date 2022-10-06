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

export const yearFormatter = (years) => {
  if (years >= 1000 && years < 1000000) {
    return `${(years / 1000).toFixed(2)} thousand years`;
  } else if (years >= 1000000 && years < 1000000000) {
    return `${(years / 1000000).toFixed(2)} million years`;
  } else if (years === 1000000000) {
    return `> ${years / 1000000000} billion years`;
  } else {
    return years === 0
      ? '< 1 year'
      : years === 1
      ? years + ' year'
      : years + ' years';
  }
};

// // Function that takes five parameters
// // ... = (upCase, lowCase, symbol, num, pwdLength, pwd) => ...
// // If just one uppercase

// const str = "hel00w0rld"

// str.match(/[0-9]/g).length;

// export const timeToCrackEstimator = (password) => {
//   let finalEstimate = ''
//   const upperCaseLetterCount = password.match(/[A-Z]/g).length;
//   const lowerCaseLetterCount = password.match(/[a-z]/g).length;
//   const numberCount = password.match(/[0-9]/g).length;
//   const symbolCount = password.match(/[^A-Za-z0-9]/g).length;

//   if (password.length === 7) {
//     if (upperCaseLetterCount > 2) {

//     }
//     if (lowerCaseLetterCount > 2) {

//     }
//     if (numberCount > 2) {

//     }
//     if (symbolCount > 2) {

//     }
//   }

//   if (upCase && !lowCase && !num && !symbol)
//   else if (upCase && lowCase && !num && !symbol)
//   else if (upCase && !lowCase && num && !symbol)
//   else if (upCase && lowCase && !num && symbol)
//   else if (upCase && lowCase && num && !symbol)
//   else if (symbol && !upCase && !lowCase && !num)
//   else if (symbol && !upCase && lowCase && !num)
//   else if (symbol && upCase && !lowCase && !num)
//   else if (symbol && !upCase && lowCase && num)
//   else if (num && !symbol && !upCase && !lowCase)
//   else if (num && symbol && !upCase && !lowCase)
//   else if (num && !symbol && upCase && !lowCase)
//   else if (num && symbol && upCase && !lowCase)
//   else if (lowCase && !num && !symbol && !upCase)
//   else if (lowCase && num && !symbol && !upCase)
//   else if (lowCase && !num && symbol && !upCase)
//   else if (lowCase && num && symbol && !upCase)
//   else if (upCase && lowCase && num && symbol)
// }
