const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const linesElement = document.getElementById('lines');

const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 32;

const COLORS = ['cyan', 'blue', 'orange', 'yellow', 'green', 'purple', 'red'];
const SHAPES = [
    [[1, 1, 1, 1]], // I
    [[1, 1, 1], [0, 0, 1]], // J
    [[1, 1, 1], [1, 0, 0]], // L
    [[1, 1], [1, 1]], // O
    [[0, 1, 1], [1, 1, 0]], // S
    [[0, 1, 0], [1, 1, 1]], // T
    [[1, 1, 0], [0, 1, 1]] // Z
];

let board = [];
let score = 0;
let lines = 0;
let currentPiece;
let gameOver = false;

// Initialize board
function initBoard() {
    for (let row = 0; row < ROWS; row++) {
        board[row] = [];
        for (let col = 0; col < COLS; col++) {
            board[row][col] = 0;
        }
    }
}

// Draw board
function drawBoard() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            if (board[row][col]) {
                context.fillStyle = COLORS[board[row][col] - 1];
                context.fillRect(col * BLOCK_SIZE, row * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
            }
        }
    }
}

// Draw piece
function drawPiece(piece) {
    context.fillStyle = COLORS[piece.color];
    piece.shape.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value) {
                context.fillRect((piece.x + x) * BLOCK_SIZE, (piece.y + y) * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
            }
        });
    });
}

// Generate random piece
function generatePiece() {
    const typeId = Math.floor(Math.random() * SHAPES.length);
    const piece = {
        x: Math.floor(COLS / 2) - 1,
        y: 0,
        shape: SHAPES[typeId],
        color: typeId
    };
    return piece;
}

// Collision detection
function isValidMove(piece, newX, newY) {
    for (let y = 0; y < piece.shape.length; y++) {
        for (let x = 0; x < piece.shape[y].length; x++) {
            if (piece.shape[y][x]) {
                const newXPos = newX + x;
                const newYPos = newY + y;
                if (newXPos < 0 || newXPos >= COLS || newYPos >= ROWS || board[newYPos] && board[newYPos][newXPos]) {
                    return false;
                }
            }
        }
    }
    return true;
}

// Lock piece in place
function lockPiece() {
    currentPiece.shape.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value) {
                const boardX = currentPiece.x + x;
                const boardY = currentPiece.y + y;
                if (boardY < 0) {
                    gameOver = true;
                } else {
                    board[boardY][boardX] = currentPiece.color + 1;
                }
            }
        });
    });
}

// Clear lines
function clearLines() {
    let linesCleared = 0;
    for (let row = ROWS - 1; row >= 0; row--) {
        if (board[row].every(cell => cell !== 0)) {
            board.splice(row, 1);
            board.unshift(new Array(COLS).fill(0));
            linesCleared++;
        }
    }
    score += linesCleared * 100;
    lines += linesCleared;
    scoreElement.textContent = score;
    linesElement.textContent = lines;
}

// Drop piece
function dropPiece() {
    if (isValidMove(currentPiece, currentPiece.x, currentPiece.y + 1)) {
        currentPiece.y++;
    } else {
        lockPiece();
        clearLines();
        currentPiece = generatePiece();
        if (!isValidMove(currentPiece, currentPiece.x, currentPiece.y)) {
            gameOver = true;
        }
    }
}

// Move piece
function movePiece(dir) {
    if (isValidMove(currentPiece, currentPiece.x + dir, currentPiece.y)) {
        currentPiece.x += dir;
    }
}

// Rotate piece
function rotatePiece() {
    const rotatedPiece = JSON.parse(JSON.stringify(currentPiece));
    rotatedPiece.shape = rotatedPiece.shape[0].map((_, index) => rotatedPiece.shape.map(row => row[index])).reverse();
    if (isValidMove(rotatedPiece, rotatedPiece.x, rotatedPiece.y)) {
        currentPiece.shape = rotatedPiece.shape;
    }
}

// Game loop
function gameLoop() {
    if (!gameOver) {
        dropPiece();
        drawBoard();
        drawPiece(currentPiece);
        setTimeout(gameLoop, 500);
    } else {
        alert('Game Over!');
    }
}

// Initialize game
function init() {
    initBoard();
    currentPiece = generatePiece();
    gameLoop();
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        movePiece(-1);
    } else if (e.key === 'ArrowRight') {
        movePiece(1);
    } else if (e.key === 'ArrowDown') {
        dropPiece();
    } else if (e.key === 'ArrowUp') {
        rotatePiece();
    }
});

init();
const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const linesElement = document.getElementById('lines');

const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 32;

const COLORS = ['cyan', 'blue', 'orange', 'yellow', 'green', 'purple', 'red'];
const SHAPES = [
    [[1, 1, 1, 1]], // I
    [[1, 1, 1], [0, 0, 1]], // J
    [[1, 1, 1], [1, 0, 0]], // L
    [[1, 1], [1, 1]], // O
    [[0, 1, 1], [1, 1, 0]], // S
    [[0, 1, 0], [1, 1, 1]], // T
    [[1, 1, 0], [0, 1, 1]] // Z
];

let board = [];
let score = 0;
let lines = 0;
let currentPiece;
let gameOver = false;

// Initialize board
function initBoard() {
    for (let row = 0; row < ROWS; row++) {
        board[row] = [];
        for (let col = 0; col < COLS; col++) {
            board[row][col] = 0;
        }
    }
}

// Draw board
function drawBoard() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            if (board[row][col]) {
                context.fillStyle = COLORS[board[row][col] - 1];
                context.fillRect(col * BLOCK_SIZE, row * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
            }
        }
    }
}

// Draw piece
function drawPiece(piece) {
    context.fillStyle = COLORS[piece.color];
    piece.shape.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value) {
                context.fillRect((piece.x + x) * BLOCK_SIZE, (piece.y + y) * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
            }
        });
    });
}

// Generate random piece
function generatePiece() {
    const typeId = Math.floor(Math.random() * SHAPES.length);
    const piece = {
        x: Math.floor(COLS / 2) - 1,
        y: 0,
        shape: SHAPES[typeId],
        color: typeId
    };
    return piece;
}

// Collision detection
function isValidMove(piece, newX, newY) {
    for (let y = 0; y < piece.shape.length; y++) {
        for (let x = 0; x < piece.shape[y].length; x++) {
            if (piece.shape[y][x]) {
                const newXPos = newX + x;
                const newYPos = newY + y;
                if (newXPos < 0 || newXPos >= COLS || newYPos >= ROWS || board[newYPos] && board[newYPos][newXPos]) {
                    return false;
                }
            }
        }
    }
    return true;
}

// Lock piece in place
function lockPiece() {
    currentPiece.shape.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value) {
                const boardX = currentPiece.x + x;
                const boardY = currentPiece.y + y;
                if (boardY < 0) {
                    gameOver = true;
                } else {
                    board[boardY][boardX] = currentPiece.color + 1;
                }
            }
        });
    });
}

// Clear lines
function clearLines() {
    let linesCleared = 0;
    for (let row = ROWS - 1; row >= 0; row--) {
        if (board[row].every(cell => cell !== 0)) {
            board.splice(row, 1);
            board.unshift(new Array(COLS).fill(0));
            linesCleared++;
        }
    }
    score += linesCleared * 100;
    lines += linesCleared;
    scoreElement.textContent = score;
    linesElement.textContent = lines;
}

// Drop piece
function dropPiece() {
    if (isValidMove(currentPiece, currentPiece.x, currentPiece.y + 1)) {
        currentPiece.y++;
    } else {
        lockPiece();
        clearLines();
        currentPiece = generatePiece();
        if (!isValidMove(currentPiece, currentPiece.x, currentPiece.y)) {
            gameOver = true;
        }
    }
}

// Move piece
function movePiece(dir) {
    if (isValidMove(currentPiece, currentPiece.x + dir, currentPiece.y)) {
        currentPiece.x += dir;
    }
}

// Rotate piece
function rotatePiece() {
    const rotatedPiece = JSON.parse(JSON.stringify(currentPiece));
    rotatedPiece.shape = rotatedPiece.shape[0].map((_, index) => rotatedPiece.shape.map(row => row[index])).reverse();
    if (isValidMove(rotatedPiece, rotatedPiece.x, rotatedPiece.y)) {
        currentPiece.shape = rotatedPiece.shape;
    }
}

// Game loop
function gameLoop() {
    if (!gameOver) {
        dropPiece();
        drawBoard();
        drawPiece(currentPiece);
        setTimeout(gameLoop, 500);
    } else {
        alert('Game Over!');
    }
}

// Initialize game
function init() {
    initBoard();
    currentPiece = generatePiece();
    gameLoop();
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        movePiece(-1);
    } else if (e.key === 'ArrowRight') {
        movePiece(1);
    } else if (e.key === 'ArrowDown') {
        dropPiece();
    } else if (e.key === 'ArrowUp') {
        rotatePiece();
    }
});

init();
