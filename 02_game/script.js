const emojis = ["🍎","🍌","🍇","🍒","🍓","🍍","🥭","🍉"];
let cards = [...emojis, ...emojis]; // জোড়া তৈরি
let firstCard, secondCard;
let lockBoard = false;
let matchedPairs = 0;

// কার্ড শাফল ফাংশন
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

function createBoard() {
  shuffle(cards);
  const board = document.getElementById("gameBoard");
  board.innerHTML = "";
  
  cards.forEach((emoji, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.emoji = emoji;
    card.dataset.index = index;
    card.innerText = "";
    card.addEventListener("click", flipCard);
    board.appendChild(card);
  });
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flipped");
  this.innerText = this.dataset.emoji;

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  checkMatch();
}

function checkMatch() {
  if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
    disableCards();
    matchedPairs++;
    if (matchedPairs === emojis.length) {
      document.getElementById("status").innerText = "🎉 Every pair has match";
    }
  } else {
    unflipCards();
  }
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    firstCard.innerText = "";
    secondCard.innerText = "";
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [firstCard, secondCard, lockBoard] = [null, null, false];
}

createBoard();
