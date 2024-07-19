// Bulls and Cows
// Get library for user input
// we need to keep the next line, so we can prompt the user for input
//---------
// import readlineSync from "readline-sync";
// import chalk from "chalk";
//-----------------------

// const userName = readlineSync.question("May I have your name? ");
// console.log("Hi " + userName + "!");

// let name = prompt("What is your name? ");
// console.log(`User's input is: ${name}`);

// Feel free to edit / remove the line above, this is just to test the package
//  Although we may want to use the user's name for something

//--------------------------------------------------------

import readlineSync from "readline-sync";
import chalk from "chalk";

// Function to generate a secret number with 4 unique digits
function generateSecretNumber() {
  let digits = "0123456789";
  let secret = "";
  while (secret.length < 4) {
    let randIndex = Math.floor(Math.random() * digits.length);
    secret += digits[randIndex];
    digits = digits.slice(0, randIndex) + digits.slice(randIndex + 1);
  }
  return secret;
}

// Function to get the hint (bulls and cows) for a guess
function getHint(secret, guess) {
  let bulls = 0,
    cows = 0;
  for (let i = 0; i < 4; i++) {
    if (guess[i] === secret[i]) {
      bulls++;
    } else if (secret.includes(guess[i])) {
      cows++;
    }
  }
  return { bulls, cows };
}

// Function to validate a guess
function isValidGuess(guess) {
  if (guess.length !== 4) return false;
  let uniqueDigits = new Set(guess);
  return uniqueDigits.size === 4 && !isNaN(parseInt(guess));
}

// Main function to play the game
function playGame() {
  let secret = generateSecretNumber();
  let attempts = 0;
  let playerName = readlineSync.question("Enter your name: ") || "Stranger";
  console.log(chalk.blue(`Welcome, ${playerName}! Let's play Bulls and Cows.`));

  while (true) {
    let guess = readlineSync.question("Enter your 4-digit guess: ");
    if (!isValidGuess(guess)) {
      console.log(chalk.red("Invalid guess. Make sure it's 4 unique digits."));
      continue;
    }

    attempts++;
    let { bulls, cows } = getHint(secret, guess);

    if (bulls === 4) {
      console.log(
        chalk.green(
          `Congratulations ${playerName}, you guessed the number in ${attempts} attempts!`
        )
      );
      break;
    } else {
      console.log(chalk.yellow(`Hint: ${bulls} Bulls, ${cows} Cows`));
    }

    if (bulls === 0 && cows === 0) {
      let noHitMessages = [
        "No luck this time!",
        "Try again, you got this!",
        "Keep going, you'll get it!",
        "Oops, not quite. Give it another shot!",
      ];
      console.log(
        chalk.magenta(
          noHitMessages[Math.floor(Math.random() * noHitMessages.length)]
        )
      );
    }
  }

  let playAgain = readlineSync
    .question("Do you want to play another round? (yes/no): ")
    .toLowerCase();
  if (playAgain === "yes") {
    playGame();
  } else {
    console.log(chalk.blue("Thanks for playing! Goodbye."));
  }
}

playGame();
