const statusDisplay = document.querySelector(".game--status");
let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
const winningMessage = () => `Player ${currentPlayer} Won !`;
const drawMessage = () => `DRAW`;
const currentPlayerTurn = () => ` ${currentPlayer} Turn`;
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const handleCellPlayed = (cell, index) => {
  gameState[index] = currentPlayer;
  cell.innerHTML = currentPlayer;
};
const handlePlayerChange = () => {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDisplay.innerHTML = currentPlayerTurn();
};
const handleResults = () => {
  let roundWin = false;
  for (let i = 0; i <= 7; i++) {
    let winningCondition = winningConditions[i];
    let a = gameState[winningCondition[0]];
    let b = gameState[winningCondition[1]];
    let c = gameState[winningCondition[2]];
    if (a === "" || b === "" || c === "") {
      continue;
    }
    if (a === b && b === c) {
      roundWin = true;
      break;
    }
  }
  if (roundWin) {
    gameActive = false;
    statusDisplay.innerHTML = winningMessage();
    return;
  }
  let roundDraw = !gameState.includes("");
  if (roundDraw) {
    statusDisplay.innerHTML = drawMessage();
    gameActive = false;
    return;
  }
  handlePlayerChange();
};
const handleCellClick = (event) => {
  const cellClicked = event.target;
  const cellClickedIndex = parseInt(
    cellClicked.getAttribute("data-cell-index")
  );
  if (!gameActive || gameState[cellClickedIndex] !== "") {
    return;
  }
  handleCellPlayed(cellClicked, cellClickedIndex);
  handleResults();
};
const handleRestartGame = () => {
  gameState = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  currentPlayer = "X";
  statusDisplay.innerHTML = currentPlayerTurn();
  document.querySelectorAll(".cell").forEach((cell) => (cell.innerHTML = ""));
};

document
  .querySelectorAll(".cell")
  .forEach((cell) => cell.addEventListener("click", handleCellClick));
document
  .querySelector(".game--restart")
  .addEventListener("click", handleRestartGame);
