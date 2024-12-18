"use strict";
// Les éléments DOM
const container = document.getElementById('container');
// Variable
let mysteryWord;
let letterWord;
let nbLife;
//TODO Affiche le dessin
// Méthodes
async function initialisation() {
    mysteryWord = await getRandomWord();
    letterWord = getLettersOfMystery();
    nbLife = 6;
    generateMystery(mysteryWord);
    generateKeyboard();
}
initialisation();
async function getRandomWord() {
    //TODO Consommer une WebAPI pour obtenir un mot aleatoire
    return 'Éléphant';
}
;
function getLettersOfMystery() {
    const result = new Set(getWordForCompare().replaceAll(/[ -]/g, ''));
    return [...result];
}
function generateMystery(word) {
    const baliseText = document.createElement('p');
    baliseText.id = "mystery-text";
    for (const letter of word) {
        const baliseLetter = document.createElement('span');
        baliseLetter.textContent = (letter !== ' ') ? '_' : letter;
        baliseText.append(baliseLetter);
    }
    container.append(baliseText);
}
function generateKeyboard() {
    const keyboard = document.createElement('div');
    keyboard.id = "keyboard";
    const letterStart = 'A'.charCodeAt(0);
    const letterEnd = 'Z'.charCodeAt(0);
    for (let code = letterStart; code <= letterEnd; code++) {
        // console.log(code, String.fromCharCode(code));
        const letter = String.fromCharCode(code);
        const buttonLetter = document.createElement('button');
        buttonLetter.textContent = letter;
        buttonLetter.addEventListener('click', handleKeyboardClick);
        keyboard.append(buttonLetter);
    }
    container.append(keyboard);
}
function getWordForCompare() {
    return mysteryWord.toUpperCase() // Majuscule
        .normalize("NFD") // Normalise (Caractere acentué)
        .replace(/\p{Diacritic}/gu, ""); // Supprime les "Diacritique"
}
function handleKeyboardClick(event) {
    const button = event.target;
    button.disabled = true;
    const letter = button.textContent ?? '';
    if (letterWord.includes(letter)) {
        revealLetter(letter);
        letterWord = letterWord.filter(l => l !== letter);
        if (letterWord.length === 0) {
            displayWin();
        }
    }
    else {
        nbLife--;
        if (nbLife === 0) {
            displayLose();
        }
    }
}
function revealLetter(letter) {
    const mysteryText = document.getElementById('mystery-text');
    console.log(mysteryText.children);
    Array.from(getWordForCompare()).forEach((wordLetter, index) => {
        if (wordLetter === letter) {
            // console.log(wordLetter, index);
            mysteryText.children[index].textContent = mysteryWord[index];
        }
    });
}
function displayWin() {
    alert('Bravo');
}
function displayLose() {
    alert('Perdu');
}
