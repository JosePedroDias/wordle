const DICTIONARY = 'words-pt-natura';

const words = require(`./${DICTIONARY}`).all5;
const readline = require('readline');

function to26(word) {
    return word.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

const toAccents = {};   // 1 to many
const fromAccents = {}; // 1 to 1

for (let w of words) {
    //console.log(`${w} -> ${to26(w)}`);
    const w26 = to26(w);
    fromAccents[w] = w26;
    let bag = toAccents[w26];
    if (!bag) toAccents[w26] = bag = [];
    bag.push(w);
}

const words26 = Object.keys(toAccents);

console.log(`Loaded dictionary\n# words   : ${words.length}\n# words 26: ${words26.length}`);

function randomN(n) {
    return Math.floor( n * Math.random() );
}

function pickOneOf(arr) {
    return arr[ randomN(arr.length) ];
}

const C_RED = '\x1b[31m';
const C_YELLOW = '\x1b[33m';
const C_GREEN = '\x1b[32m';
const C_DEFAULT = '\x1b[0m';

function evaluateGuess(guess, secret26, mode) {
    const feedback = [];
    for (let i = 0; i < guess.length; ++i) {
        const guessLetter = guess[i];
        const secretLetter = secret26[i];
        const letterAtRightPlace = guessLetter === secretLetter;
        const letterAtWrongPlace = !letterAtRightPlace && secret26.indexOf(guessLetter) !== -1;

        if (mode === 'console') {
            feedback.push(
                letterAtRightPlace ? `${C_GREEN}O${C_DEFAULT}` :
                letterAtWrongPlace ? `${C_YELLOW}O${C_DEFAULT}` :
                `${C_RED}O${C_DEFAULT}`
            );
        } else if (mode === 'emoji') { // does not work in windows?
            feedback.push(
                letterAtRightPlace ? `🟩` :
                letterAtWrongPlace ? `🟨` :
                `⬛`
            );
        } else {
            feedback.push(
                letterAtRightPlace ? `O` :
                letterAtWrongPlace ? `.` :
                ` `
            );
        }
    }
    return feedback;
}

async function runGame() {
    const rl = readline.createInterface(process.stdin, process.stdout);

    function getWord(question) {
        return new Promise(resolve => {
            rl.question(question, (answer) => {
                resolve(answer.split(' ')[0]);
            });
        });
    }

    const secret = pickOneOf(words);
    const secret26 = to26(secret);
    let roundNum = 1;

    while (true) {
        const guess = await getWord(`Your guess at #${roundNum}?`);
        //console.log(guess, secret26, secret);

        if (guess.length !== secret26.length) {
            console.log(`Secret word has ${secret26.length} letters!`);
        }
        else if (words26.indexOf(guess) === -1) {
            console.log('Unknown word!');
        }
        else if (guess === secret26) {
            console.log(`You found it with ${roundNum} attempts! It was ${secret}!`);
            return;
        }
        else {
            console.log(evaluateGuess(guess, secret26).join(''));
            ++roundNum;
        }
    }
}

runGame();
