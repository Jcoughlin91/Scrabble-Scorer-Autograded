
const input = require("readline-sync");


const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) { 
  word = word.toUpperCase(); 
  let letterPoints = ""; 

  for (let i = 0; i < word.length; i++) { 
    for (const pointValue in oldPointStructure) { 
      if (oldPointStructure[pointValue].includes(word[i])) { 
        letterPoints += `Points for '${word[i]}': ${pointValue}\n`; 
      }
    }
  }
  return letterPoints; 
}


function initialPrompt() {
  console.log("Let's play some scrabble!"); 
  return input.question("Enter a word: "); 
}


function simpleScorer(word) {
  return word.length; 
}


function vowelBonusScorer(word) { 
  word = word.toUpperCase(); 
  let score = 0; 
  for (let i = 0; i < word.length; i++) { 
    if ('AEIOU'.includes(word[i])) { 
      score += 3; 
    } else {
      score += 1; 
    }
  }
  return score; 
}


function transform(oldPointStructure) { 
  let newPointStructure = {}; 
  for (const pointValue in oldPointStructure) { 
    for (const letter of oldPointStructure[pointValue]) { 
      newPointStructure[letter.toLowerCase()] = parseInt(pointValue); 
    }
  }
  return newPointStructure; 
  console.log(newPointStructure);
}


let newPointStructure = transform(oldPointStructure);


function scrabbleScorer(word) { 
  word = word.toLowerCase(); 
  let score = 0; 
  for (let i = 0; i < word.length; i++) { 
    score += newPointStructure[word[i]]; 
  }
  return score; 
}


const scoringAlgorithms = [
  {
    name: 'Simple', 
    description: 'Each letter is worth 1 point.', 
    scorerFunction: simpleScorer 
  },
  {
    name: 'Vowel Bonus', 
    description: 'Vowels are 3 pts, consonants are 1 pt.', 
    scorerFunction: vowelBonusScorer 
  },
  {
    name: 'Scrabble', 
    description: 'The traditional scoring algorithm.', 
    scorerFunction: scrabbleScorer 
  }
];


function scorerPrompt() { 
  console.log("Which scoring algorithm would you like to use?"); 
  for (let i = 0; i < scoringAlgorithms.length; i++) { 
    console.log(`${i} - ${scoringAlgorithms[i].name}: ${scoringAlgorithms[i].description}`); 
  }
  let choice = input.question("Enter 0, 1, or 2: "); 
  return scoringAlgorithms[choice]; 
}


function runProgram() {
  let word = initialPrompt(); 
  let selectedAlgorithm = scorerPrompt(); 
  let score = selectedAlgorithm.scorerFunction(word); 
  console.log(`Score for '${word}': ${score}`); 
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
  initialPrompt: initialPrompt,
  transform: transform,
  oldPointStructure: oldPointStructure,
  simpleScorer: simpleScorer,
  vowelBonusScorer: vowelBonusScorer,
  scrabbleScorer: scrabbleScorer,
  scoringAlgorithms: scoringAlgorithms,
  newPointStructure: newPointStructure,
  runProgram: runProgram,
  scorerPrompt: scorerPrompt
};

