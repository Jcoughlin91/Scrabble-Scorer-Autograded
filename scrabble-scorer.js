// Import the 'readline-sync' Module
const input = require("readline-sync");
// This line imports the 'readline-sync' module, which allows for synchronous input from the user via the command line

// This defines the old point structure
const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};
// This maps point values to arrays of letters for the traditional Scrabble scoring system

// This is the scrabble Scorer Function
function oldScrabbleScorer(word) { // 'oldScrabbleScorer' is a function that takes a parameter 'word'
  word = word.toUpperCase(); // Convert the word to uppercase to ensure scoring is case-insensitive
  let letterPoints = ""; // Initialize an empty string that will accumulate the points for each letter in the word

  for (let i = 0; i < word.length; i++) { // Loop through each character in the word
    for (const pointValue in oldPointStructure) { // Nested loop: iterate over each point value in 'oldPointStructure'
      if (oldPointStructure[pointValue].includes(word[i])) { // Check if the current letter 'word[i]' is in the array of the current 'pointValue'
        letterPoints += `Points for '${word[i]}': ${pointValue}\n`; // Append a formatted string to 'letterPoints', indicating the points for the current letter
      }
    }
  }
  return letterPoints; // Return the final accumulated string that contains the points for each letter in the word
}

// The function prompts the user to enter a word for scoring
// Displays a welcome message "Let's play some scrabble!"
// Then returns the user's input
function initialPrompt() {
  console.log("Let's play some scrabble!"); // Display a welcome message
  return input.question("Enter a word: "); // Return the user's input
}

// This function assigns 1 point per letter
// Returns the length of the word as the score
function simpleScorer(word) {
  return word.length; // Each letter is worth 1 point
}

// This function assigns 3 points for vowels and 1 point for consonants
// Converts the word to uppercase
// Iterates over each letter in the word to calculate the score
function vowelBonusScorer(word) { // Define the function with parameter 'word'
  word = word.toUpperCase(); // Convert the word to uppercase
  let score = 0; // Initialize the score to 0
  for (let i = 0; i < word.length; i++) { // Loop through each letter in the word
    if ('AEIOU'.includes(word[i])) { // Check if the letter is a vowel
      score += 3; // Vowels are worth 3 points
    } else {
      score += 1; // Consonants are worth 1 point
    }
  }
  return score; // Return the total score
}

// This function transforms the old point structure into a new one
// This creates a new object where each letter (in lowercase) is a key and its value is the corresponding point value
// Iterates over each point value in the old structure and maps each letter to its point value
function transform(oldPointStructure) { // Define the function with parameter 'oldPointStructure'
  let newPointStructure = {}; // Initialize an empty object for the new structure
  for (const pointValue in oldPointStructure) { // Loop through each point value in the old structure
    for (const letter of oldPointStructure[pointValue]) { // Loop through each letter in the array for the current point value
      newPointStructure[letter.toLowerCase()] = parseInt(pointValue); // Add the letter to the new structure with its point value
    }
  }
  return newPointStructure; // Return the new point structure
}

// Calls the 'transform' to create a new point structure based on the old point structure
let newPointStructure = transform(oldPointStructure);

// This function scores a word using the new point structure
// Converts the word to lowercase
// Iterates over each letter in the word and sums the point values from the new point structure
function scrabbleScorer(word) { // Define the function with parameter 'word'
  word = word.toLowerCase(); // Convert the word to lowercase
  let score = 0; // Initialize the score to 0
  for (let i = 0; i < word.length; i++) { // Loop through each letter in the word
    score += newPointStructure[word[i]]; // Add the point value of the current letter to the score
  }
  return score; // Return the total score
}

// This array stores different scoring algorithms
// Each object contains a name, description, and scoring function
const scoringAlgorithms = [
  {
    name: 'Simple', // Name of the scoring algorithm
    description: 'Each letter is worth 1 point.', // Description of the scoring algorithm
    scorerFunction: simpleScorer // Scoring function
  },
  {
    name: 'Vowel Bonus', // Name of the scoring algorithm
    description: 'Vowels are 3 pts, consonants are 1 pt.', // Description of the scoring algorithm
    scorerFunction: vowelBonusScorer // Scoring function
  },
  {
    name: 'Scrabble', // Name of the scoring algorithm
    description: 'The traditional scoring algorithm.', // Description of the scoring algorithm
    scorerFunction: scrabbleScorer // Scoring function
  }
];

// The function prompts the user to choose a scoring algorithm
// It displays the available scoring algorithms
// Returns the selected scoring algorithm object
function scorerPrompt() { // Define the function
  console.log("Which scoring algorithm would you like to use?"); // Print prompt
  for (let i = 0; i < scoringAlgorithms.length; i++) { // Loop through each scoring algorithm
    console.log(`${i} - ${scoringAlgorithms[i].name}: ${scoringAlgorithms[i].description}`); // Print the index, name, and description of each scoring algorithm
  }
  let choice = input.question("Enter 0, 1, or 2: "); // Get user input
  return scoringAlgorithms[choice]; // Return selected algorithm
}

// This function integrates the functionalities
// Prompts the user for a word
// Prompts the user to choose a scoring algorithm
// Scores the word using the selected algorithm and prints the result
function runProgram() {
  let word = initialPrompt(); // Prompt user for a word
  let selectedAlgorithm = scorerPrompt(); // Prompt user for scoring algorithm
  let score = selectedAlgorithm.scorerFunction(word); // Score the word using the selected algorithm
  console.log(`Score for '${word}': ${score}`); // Print the result
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

