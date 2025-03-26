
let countdownTimer;
function startCountdown() {
    let timeLeft = 10;
    const countdownEl = document.getElementById('countdown');
    countdownEl.textContent = `⏱ Time: ${timeLeft}s`;
    clearInterval(countdownTimer);
    countdownTimer = setInterval(() => {
        timeLeft--;
        countdownEl.textContent = `⏱ Time: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(countdownTimer);
            disableOptions();
        }
    }, 1000);
}
function disableOptions() {
    document.querySelectorAll('.option-button').forEach(btn => btn.disabled = true);
}

const countries = [
    { name: 'United States', code: 'US' }, { name: 'United Kingdom', code: 'GB' },
    { name: 'France', code: 'FR' }, { name: 'Germany', code: 'DE' },
    { name: 'Italy', code: 'IT' }, { name: 'Japan', code: 'JP' },
    { name: 'Canada', code: 'CA' }, { name: 'Australia', code: 'AU' },
    { name: 'Brazil', code: 'BR' }, { name: 'India', code: 'IN' },
    { name: 'China', code: 'CN' }, { name: 'Spain', code: 'ES' },
    { name: 'Mexico', code: 'MX' }, { name: 'South Korea', code: 'KR' },
    { name: 'Russia', code: 'RU' }, { name: 'South Africa', code: 'ZA' },
    { name: 'Kenya', code: 'KE' }, { name: 'Ghana', code: 'GH' },
    { name: 'Nigeria', code: 'NG' }, { name: 'Egypt', code: 'EG' },
    { name: 'Morocco', code: 'MA' }, { name: 'Argentina', code: 'AR' },
    { name: 'Chile', code: 'CL' }, { name: 'Colombia', code: 'CO' },
    { name: 'Peru', code: 'PE' }, { name: 'Sweden', code: 'SE' },
    { name: 'Norway', code: 'NO' }, { name: 'Finland', code: 'FI' },
    { name: 'Iceland', code: 'IS' }, { name: 'New Zealand', code: 'NZ' },
    { name: 'Indonesia', code: 'ID' }, { name: 'Vietnam', code: 'VN' },
    { name: 'Thailand', code: 'TH' }, { name: 'Philippines', code: 'PH' },
    { name: 'Malaysia', code: 'MY' }
];

let currentCountry;
let score = 0;
let attempts = 0;
const maxAttempts = 5;

function getRandomCountries(count) {
    const shuffled = [...countries].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function displayFlag(country) {
    const flagImage = document.getElementById('flag-image');
    flagImage.src = `https://flagcdn.com/w320/${country.code.toLowerCase()}.png`;
    currentCountry = country;
}

function createOptions(correctCountry) {
    startCountdown();
    const options = getRandomCountries(3);
    if (!options.includes(correctCountry)) {
        options[Math.floor(Math.random() * 3)] = correctCountry;
    }

    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';

    options.sort(() => 0.5 - Math.random()).forEach(country => {
        const button = document.createElement('button');
        button.textContent = country.name;
        button.className = 'option-button';
        button.addEventListener('click', () => checkAnswer(country));
        optionsContainer.appendChild(button);
    });
}

function checkAnswer(selectedCountry) {
    const buttons = document.querySelectorAll('.option-button');
    buttons.forEach(button => {
        button.disabled = true;
        if (button.textContent === currentCountry.name) {
            button.classList.add('correct');
        }
        if (button.textContent === selectedCountry.name && selectedCountry !== currentCountry) {
            button.classList.add('incorrect');
        }
    });

    if (selectedCountry === currentCountry) {
        score++;
    }
    attempts++;
    document.getElementById('score').textContent = `${(score / maxAttempts) * 100}%`;

    if (attempts >= maxAttempts) {
        document.getElementById('next-btn').textContent = 'Play Again';
        const message = document.createElement('div');
        message.className = 'game-over-message';
        message.innerHTML = `<p><strong>Game Over!</strong> Your final score is ${(score / maxAttempts) * 100}%</p>`;
        document.querySelector('.game-container').appendChild(message);
    }
}

function nextRound() {
    if (attempts < maxAttempts) {
        const randomCountry = countries[Math.floor(Math.random() * countries.length)];
        displayFlag(randomCountry);
        createOptions(randomCountry);
    }
}

function resetGame() {
    clearInterval(countdownTimer);
    score = 0;
    attempts = 0;
    document.getElementById('score').textContent = '0';
    document.getElementById('next-btn').textContent = 'Next Flag';
    document.getElementById('next-btn').disabled = false;
    const message = document.querySelector('.game-over-message');
    if (message) message.remove();
    nextRound();
}

document.getElementById('next-btn').addEventListener('click', () => {
    if (attempts >= maxAttempts) {
        resetGame();
    } else {
        nextRound();
    }
});

nextRound();
