let playerRed = "R";
let playerYellow = "Y";
let currPlayer = playerRed;
let gameOver = false;
let board;
let rows = 6;
let columns = 7;
let currColumns = []; //holder oversikt over hvilken rad hver kolonne er på.

let redScore = 0;
let yellowScore = 0;

const btn = document.getElementById("newGameBtn");

btn.addEventListener("click", function () {
  newGame();
});

//window.onload er et event som trigger når du besøker .html filen
window.onload = function () {
  // Når dette eventet skjer, kaller den setGame() funksjonen
  setGame();
};


/* 
Eksempel
let liste = [[1,2,3],[3,4,5]]

liste[0] // -> [1,2,3]
liste[1] // -> [3,4,5]
liste[0][0] // -> 1
liste[1][1] // -> 4
liste[6] // -> undefined
 */


//Denne kalles når du trykker på newGameButton
function resetBoard() {
  //Ytre for-løkke kjører for å nulle ut alle rows
  for (let r = 0; r < rows; r++) {
    //Indre for-løkke kjører og nuller ut hver column
    for (let c = 0; c < columns; c++) {
      // Reset JS board

      // Her går den inn i boardet med indexene column (c) og row (r) disse får du fra for-løkkene. Setter til " ". Altså tom tile
      board[r][c] = " ";

      // Reset HTML board
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      //Fjerner Den faktiske designmessige representasjonen av diven.
      tile.classList.remove("red-piece");
      tile.classList.remove("yellow-piece");
    }
  }

  // Tilbakestill currColumns til utgangstilstand
  currColumns = [5, 5, 5, 5, 5, 5, 5];

  // vinnermelding
  let winner = document.getElementById("winner");
  winner.innerText = "";

  // Reset current player to playerRed
  currPlayer = playerRed;
}

function setGame() {
  board = [];
  currColumns = [5, 5, 5, 5, 5, 5, 5];

  for (let r = 0; r < rows; r++) {
    let row = [];
    for (let c = 0; c < columns; c++) {
      // JS
      row.push(" ");
      // HTML

      // Legg til et hvitt felt representert som en div
      let tile = document.createElement("div");

      tile.id = r.toString() + "-" + c.toString();
      tile.classList.add("tile");
      tile.addEventListener("click", setPiece);
      document.getElementById("board").append(tile);
    }
    board.push(row);
  }
}

function setPiece() {
  if (gameOver) {
    return;
  }

  //get coords of that tile clicked
  let coords = this.id.split("-");
  let r = parseInt(coords[0]);
  let c = parseInt(coords[1]);

  // figure out which row the current column should be on
  r = currColumns[c];

  if (r < 0) {
    // board[r][c] != ' '
    return;
  }

  board[r][c] = currPlayer; //update JS board
  let tile = document.getElementById(r.toString() + "-" + c.toString());
  if (currPlayer == playerRed) {
    tile.classList.add("red-piece");
    currPlayer = playerYellow;
  } else {
    tile.classList.add("yellow-piece");
    currPlayer = playerRed;
  }

  r -= 1; //update the row height for that column
  currColumns[c] = r; //update the array

  checkWinner();

}

//Etter man har kalt setPiece kaller man funkjsonen checkWinner fordi brettet har fått en ny usjekket tilstand. Man må sjekke om nye tilstanden til brettet er en winner situasjon. 
function checkWinner() {
  // horizontal
//Sjekker om mulig 4 på rad horisontalt
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns - 3; c++) {
      if (board[r][c] != " ") {
        if (
            //Dersom denne tilstanden er sann kaller man funksjonen setWinner. 
          board[r][c] == board[r][c + 1] &&
          board[r][c + 1] == board[r][c + 2] &&
          board[r][c + 2] == board[r][c + 3]
        ) {
          setWinner(r, c);
          return;
        }
      }
    }
  }

  // vertical
  //Sjekker om mulig 4 på rad horisontalt
  for (let c = 0; c < columns; c++) {
    for (let r = 0; r < rows - 3; r++) {
      if (board[r][c] != " ") {
        if (
            //Dersom denne tilstanden er sann kaller man funksjonen setWinner. 
          board[r][c] == board[r + 1][c] &&
          board[r + 1][c] == board[r + 2][c] &&
          board[r + 2][c] == board[r + 3][c]
        ) {
          setWinner(r, c);
          return;
        }
      }
    }
  }

  // anti diagonal
  //Sjekker om mulig 4 på rad. Den stopper på r < rows- 3 fordi det vil på diagonalen hvor index er 0 til 3 er det umulig å få fire på rad
  for (let r = 0; r < rows - 3; r++) {
    for (let c = 0; c < columns - 3; c++) {
      if (board[r][c] != " ") {
        if (
            //Dersom denne tilstanden er sann kaller man funksjonen setWinner. 
          board[r][c] == board[r + 1][c + 1] &&
          board[r + 1][c + 1] == board[r + 2][c + 2] &&
          board[r + 2][c + 2] == board[r + 3][c + 3]
        ) {
          setWinner(r, c);
          return;
        }
      }
    }
  }

  // diagonal
  //Sjekker om mulig 4 på rad. Den begynner på r = 3 og stopper til det ikke er flere rows igjen.
  for (let r = 3; r < rows; r++) {
    for (let c = 0; c < columns - 3; c++) {
      if (board[r][c] != " ") {
        if (
            //Dersom denne tilstanden er sann kaller man funksjonen setWinner. 
          board[r][c] == board[r - 1][c + 1] &&
          board[r - 1][c + 1] == board[r - 2][c + 2] &&
          board[r - 2][c + 2] == board[r - 3][c + 3]
        ) {

        // Her sender vi r og c på vinner brikken som ble lagt.
          setWinner(r, c);
          return;
        }
      }
    }
  }
}

//Kjørers bare en gang, i motsetning til checkWinner() som kjøres hver gang man legger en brikke. 
function setWinner(r, c) {
  let winner = document.getElementById("winner");
  
  // Her henter den opp tilen den fikk sendt fra checkWinner() funksjonen. Den sjekker om denne tilen var eid av playerRed. Er den ikke det må det være yellow!
  if (board[r][c] == playerRed) {
    winner.innerText = "Rød vinner!";
    redScore++;
    document.getElementById("red").innerText = redScore;
  } else {
    winner.innerText = "Gul vinner!";
    yellowScore++;
    document.getElementById("yellow").innerText = yellowScore;
  }
  gameOver = true;
}
//Trykker på btnNewgame
function newGame() {
    //Kjører funksjone resetBoard, tømmer brettet. gameOver = false for å kunne setPiece(), plassere brikker. 
  resetBoard();
  gameOver = false;
}


