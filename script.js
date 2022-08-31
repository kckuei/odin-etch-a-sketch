function initializeCanvas(gridSize = 16) {
    for (let i = 0; i < gridSize; i++) {
        let row = document.createElement("div");
        row.style.height = `${elementSize}px`;
        grid.appendChild(row);
        for (let j = 0; j < gridSize; j++) {
            let cell = document.createElement('div');
            // cell.innerHTML = `${i},${j}`;
            cell.style.display = 'inline-block';
            cell.style.height = `${elementSize}px`;
            cell.style.width = `${elementSize}px`;
            cell.style.transitionDuration = '0.25s';
            cell.className = 'cell';
            cell.addEventListener('mouseover', fillCell)
            cell.addEventListener('click', fillCell);
            row.appendChild(cell);
        }
    }
    cells = grid.getElementsByClassName('cell');
}

function setGridSize() {
    do {
        response = prompt('Choose a grid-size:', 16);
        response = parseInt(response);
    } while ((response < 0) || (response > 200))
    gridSize = response;
    elementSize = width / gridSize;
    refreshCanvas();
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        // console.log(parent)
        parent.removeChild(parent.firstChild);
    }
}

function refreshCanvas() {
    removeAllChildNodes(grid);
    initializeCanvas(gridSize);
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}


function fillCell(e) {
    // console.log(e);
    if (e.which === 1) {
        // let r = randomInt(0, 255);
        // let g = randomInt(0, 255);
        // let b = randomInt(0, 255);
        if (eraseMode) {
            e.target.style.backgroundColor = 'rgb(255,255,255)';
        } else {
            rgb = nextColorGradient(.3, .3, .3, 0, 2, 4)
            e.target.style.backgroundColor = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
        }
    }
}

// https://nicoguaro.github.io/posts/cyclic_colormaps/
// https://krazydad.com/tutorials/makecolors.php
let colorIndex = 0;

function nextColorGradient(frequency1, frequency2, frequency3,
    phase1, phase2, phase3,
    center, width, len) {
    if (center == undefined) center = 128;
    if (width == undefined) width = 127;
    if (len == undefined) len = 50;

    let red = Math.sin(frequency1 * colorIndex + phase1) * width + center;
    let grn = Math.sin(frequency2 * colorIndex + phase2) * width + center;
    let blu = Math.sin(frequency3 * colorIndex + phase3) * width + center;
    if (colorIndex > 50) {
        colorIndex = 0;
    }
    colorIndex++;
    return [red, grn, blu];
}



const MAXGRIDSIZE = 100;

const grid = document.getElementById('grid');
const refresh = document.querySelector('#refresh-button');
const newGrid = document.querySelector('#grid-button');

let gridSize = 16;
let style = getComputedStyle(grid);
let width = parseInt(style.width.replace('px', ''));
let elementSize = width / gridSize;
let cells;

newGrid.addEventListener('click', setGridSize);
refresh.addEventListener('click', refreshCanvas);

// hot keys
let eraseMode = false;
let gridMode = false;
window.addEventListener('keydown', checkHotKeys);

function checkHotKeys(e) {
    console.log(e);
    if (e.key === 'e') toggleEraser();
    if (e.key === 'g') toggleGrid();
}

function toggleEraser() {
    if (eraseMode) {
        eraseMode = false
    } else {
        eraseMode = true;
    }
}

function toggleGrid() {
    if (gridMode) {
        Array.from(cells).forEach(cell => cell.classList.remove('cell-grid'));
        gridMode = false;
    } else {
        Array.from(cells).forEach(cell => cell.classList.add('cell-grid'));
        gridMode = true;
    }
}

// setGridSize();
initializeCanvas();