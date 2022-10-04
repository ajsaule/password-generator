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
