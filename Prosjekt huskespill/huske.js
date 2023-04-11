/* Deklarerer variabelen "cards" med classen kort der vi har alle bildene */
const cards = document.querySelectorAll('.kort');

/* Deklarerer variabelen som får spillet til å starte på nytt */
const prøvIgjenButton = document.querySelector('.prøv-igjen');


let hasFlippedCard = false;
let lockBoard = false;
let firstCard
let secondCard;
/* Setter variabelen score til å være null i starten */
let score = 0;

/* Gjør slik at bare to kort kan åpnes likt */
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    /* Hvis første kortet blir flippet */
    hasFlippedCard = true;
    firstCard = this;

    return;
  }
  /* Hvis det andre kortet blir flippet */
  secondCard = this;
  checkForMatch();
}

/* Sjekker om kortene er like, bruker variabalen: dataset like, er dataset-like === som dataset.like */
function checkForMatch() {
  let isMatch = firstCard.dataset.like === secondCard.dataset.like;

  /* Er det ikke en match, flip kortene tilbake igjen */
  isMatch ? disableCards() : unflipCards();
}

/* Hvis kortene var like tar vi vekk eventlistener, og kortene vil ikke flippe tilabke igjen */
function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

/* Låser brettet før to av kortene er flippet tilbake */
function unflipCards() {
  lockBoard = true;

  /* Bruker litt tid før kortene blir flippet tilbake */
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

/* Bruker funksjonen resetBoard på alle som gjør at man ikke kan åpne mange kort på rad */
function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

/* Gjør at vi får et tilfeldig tall mellom 1-11, ettersom kortene er rangert til 1-11 noe som gjør at kortene blir tilfeldige hver gang.*/
(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));

/* Legger til 1 på score funksjonen hver gang to kort er like og er flippet riktig */
function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  score += 1;
  updateScore();

  resetBoard();
}

/* Legger til en score funksjon som skriver ny score hve gang kort blir flippet riktig */
function updateScore() {
  const scoreElement = document.querySelector('.score');
  scoreElement.textContent = `Score: ${score}`;
}

/* Får alle kortene til å gå tilbake slik de var før noen var flippa */
prøvIgjenButton.addEventListener('click', () => {
  location.reload();
});
