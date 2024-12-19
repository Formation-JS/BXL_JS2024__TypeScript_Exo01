"use strict";
// Les éléments DOM
const container = document.getElementById('container');
// Constante
const MAX_FAIL = 6;
// Variable
let mysteryWord;
let letterWord;
let nbFail;
// Méthodes
async function initialisation() {
    mysteryWord = await getRandomWord();
    letterWord = getLettersOfMystery();
    nbFail = 0;
    const mw = generateMystery(mysteryWord);
    const k1 = generateKeyboard();
    const img = generateGameImage();
    container.append(mw, k1, img);
}
initialisation();
async function getRandomWord() {
    const response = await fetch('https://trouve-mot.fr/api/sizemin/7');
    const result = await response.json();
    return result[0].name;
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
    return baliseText;
}
function generateKeyboard() {
    const keyboard = document.createElement('div');
    keyboard.id = "keyboard";
    const letterStart = 'A'.charCodeAt(0);
    const letterEnd = 'Z'.charCodeAt(0);
    for (let code = letterStart; code <= letterEnd; code++) {
        const letter = String.fromCharCode(code);
        const buttonLetter = document.createElement('button');
        buttonLetter.textContent = letter;
        buttonLetter.addEventListener('click', handleKeyboardClick);
        keyboard.append(buttonLetter);
    }
    return keyboard;
}
function generateGameImage() {
    const baliseImg = document.createElement('img');
    baliseImg.id = 'image-pendu';
    baliseImg.src = './images/pendu-00.png';
    baliseImg.alt = 'Image de debut de jeu';
    return baliseImg;
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
        nbFail++;
        refreshGameImage(nbFail);
        if (nbFail >= MAX_FAIL) {
            displayLose();
        }
    }
}
function revealLetter(letter) {
    const mysteryText = document.getElementById('mystery-text');
    Array.from(getWordForCompare()).forEach((wordLetter, index) => {
        if (wordLetter === letter) {
            mysteryText.children[index].textContent = mysteryWord[index];
        }
    });
}
function refreshGameImage(step) {
    const baliseImg = document.getElementById('image-pendu');
    // baliseImg.src = `./images/pendu-${step.toString().padStart(2, '0')}.png`;
    baliseImg.src = `./images/pendu-${step.toLocaleString('fr', { minimumIntegerDigits: 2 })}.png`;
    baliseImg.alt = `Image avec ${step} erreur${step > 1 ? 's' : ''} !`;
}
function displayWin() {
    alert('Bravo');
}
function displayLose() {
    alert('Perdu');
}
