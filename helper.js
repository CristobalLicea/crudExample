const altCharacters = [
  '!',
  '@',
  '#',
  '$',
  '%',
  '^',
  '&'
]

const nums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

const lowerCase = [
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
]

const upperCase = [
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

const getRandom = (arr) => {
  var i = Math.floor(Math.random() * arr.length);
  var randomChar = arr[i];
  return randomChar;
}

const genId = () => {
  let result = [];
  let possibleCharacters = [];

  possibleCharacters = possibleCharacters.concat(altCharacters);
  possibleCharacters = possibleCharacters.concat(nums);
  possibleCharacters = possibleCharacters.concat(lowerCase);
  possibleCharacters = possibleCharacters.concat(upperCase);

  for (var i = 0; i < 10; i++) {
    var possibleCharacter = getRandom(possibleCharacters);
    result.push(possibleCharacter);
  }

  return result.join('');
}

module.exports = {
  genId
}