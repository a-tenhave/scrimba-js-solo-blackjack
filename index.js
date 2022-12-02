const START_BALANCE = 100;

let sumEl = document.getElementById("sum-el")
let messageEl = document.getElementById("message-el");
let balanceEl = document.getElementById("balance-el");
let drawsCountEl = document.getElementById("draws-count-el");
let cardsEl = document.getElementById("cards-el");
let newDrawEl = document.getElementById("new-draw-btn");
let addCardEl = document.getElementById("add-card-btn");
let passEl = document.getElementById("pass-btn");
let drawCountEl = document.getElementById("draw-count-el");
let newGameEl = document.getElementById("new-game-btn");
let cardPicEl = document.getElementById("card-pic-el");

let cardsInDeck = cardDeck;
let cardsImagesArray = [];
let cards = [];
let sum = 0;
let drawCount = 0;
let balance = START_BALANCE;
let hasPassed = false;

sumEl.textContent = "";
messageEl.textContent = "Let's start!";
newDrawEl.disabled = true;
addCardEl.disabled = true;
passEl.disabled = true;

updateBalance();

function startDraw() {
    drawCount++;
    cards = [];
    sum = 0;
    hasPassed = false;
    let firstCard = getRandomCard();
    let secondCard = getRandomCard();
    cards.push(firstCard, secondCard);
    determineSum();
    determineMessage();
    renderGame();
}

function addCard() {
    let card = getRandomCard();
    cards.push(card)
    cardsImagesArray.push(card.picture);
    determineSum();
    determineMessage();
    renderGame();
}

function pass() {
    hasPassed = true;
    renderGame();
}

function showCards() {
    cardsImagesArray = [];
    document.getElementById("cards-el").innerHTML = "";
    for (let i = 0; i < cards.length; i++ ) {
    cardsImagesArray.push(cards[i].picture)
    }
    cardsImagesArray.forEach(function(image) {
        let img = document.createElement('img');
        img.src = image;
        img.height = "120";
        img.width = "80";
        img.style.paddingRight = "10px";
        document.getElementById("cards-el").appendChild(img);
    })
}

function determineSum() {
    sum = 0;
    for (let i = 0; i < cards.length; i++) {
        sum += cards[i].value;
    }
}

function determineMessage() {
    if (sum === 0) {
        message = "Let's start!"
    } else if (hasPassed) {
        message = "You've passed."
    } else if (!hasPassed && sum < 21) {
        message = "Another card?";
    } else if (sum === 21) {
        message = "Blackjack!!";
    } else {
        message = "You're out...";
    }
}

function updateBalance() {
    if (sum === 21) {
        balance += 20;
    } else if (sum > 21) {
        balance -=20;
    } else if (hasPassed) {
        balance -= 10;
    }
    balanceEl.textContent = balance;
}

function renderGame() {
    if (sum === 0){
        sumEl.textContent = " ";
    } else {
        sumEl.textContent = " " + sum;
    }
    showCards();
    determineMessage();
    messageEl.textContent = message;
    if (sum >= 21) {
        addCardEl.disabled = true;
        newDrawEl.disabled = false;
        passEl.disabled = true;
    } else if (hasPassed) {
        addCardEl.disabled = true;
        passEl.disabled = true;
        newDrawEl.disabled = false;
    } else if (sum === 0) {
        newGameEl.disabled = true;
        newDrawEl.disabled = false;
        addCardEl.disabled = true;
        passEl.disabled = true;
    } else {
        addCardEl.disabled = false;
        newDrawEl.disabled = true;
        passEl.disabled = false;
    }
    drawCountEl.textContent = drawCount;
    updateBalance();
    if (balance <= 0) {
        newDrawEl.disabled = true;
        addCardEl.disabled = true;
        newGameEl.disabled = false;
    }
}

function startGame() {
    console.log("new game clicked")
    balance = START_BALANCE;
    cardsInDeck = cardDeck;
    cards = [];
    sum = 0;
    drawCount = 0;
    renderGame();
}

function getRandomCard() {
    let randomCardIndex = Math.floor(Math.random() * cardsInDeck.length);
    let randomCard = cardsInDeck.splice(randomCardIndex, 1);
    return randomCard[0];
}
