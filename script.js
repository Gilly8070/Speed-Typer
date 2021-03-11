const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('setting-btn');
const settings = document.getElementById('setting');
const settingsForm = document.getElementById('setting-form');
const difficultySelect = document.getElementById('difficulty');



// Lists of words for game 
const words = ['sign', 'count', 'tense', 'steer', 'drag'];

// Init word
let randomWord;

// Init score
let score = 0;

// Init time 
let time = 10;

// Set difficulty to value
let difficulty = 
localStorage.getItem('difficulty') !== null ?
localStorage.getItem('difficulty') : 'medium';



// Set difficulty to value 
difficultySelect.value = 
localStorage.getItem('difficulty') !== null ?
localStorage.getItem('difficulty') : 'medium';

//  Focus on text on start
text.focus();


// Start counting down
const timeInterval = setInterval(updateTime, 1000);



function getRandomWord() {
   return words[Math.floor(Math.random() * words.length)];
}

//  Add words to DOM
function addWordToDOM() {
    randomWord = getRandomWord();
    word.innerHTML = randomWord;
}




//  Update score
function updateScore() {
    score += 2;
    scoreEl.innerHTML = score;
}



// update time 
function updateTime() {
    time--;
    timeEl.innerHTML = time + 's';

    if (time === 0) {
        clearInterval(timeInterval);
        // game over
        gameOver();
    }
}


// Game over
function gameOver() {
    endgameEl.innerHTML = `
        <h1>Time ran out </h1>
        <p>Your final score is ${score}</p>
        <button onclick="location.reload()">Reload</button>
        `
        ;

    endgameEl.style.display = 'flex';
}



addWordToDOM();





// Event listerners

// Typing
text.addEventListener('input', e => {
    const insertedText = e.target.value;

    if (insertedText === randomWord) {
        addWordToDOM();
        updateScore();

        // Clear text
        e.target.value = '';

        if (difficulty === 'hard') {
            time +=2;
        } else if (difficulty === 'medium') {
            time +=3;
        } else {
            time +=5;
        }

        updateTime();
    }
});


// Settings btn click
settingsBtn.addEventListener('click', () => {
    settings.classList.toggle('hide');
});




//  Settings form
settingsForm.addEventListener('change', e => {
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty);
});