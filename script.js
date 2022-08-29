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
            cell.className = 'cell';
            cell.addEventListener('mouseover', fillCell)
            row.appendChild(cell);
        }
    }
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
        console.log(parent)
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
    // if (e.which === 1) {
    let r = randomInt(0, 255);
    let g = randomInt(0, 255);
    let b = randomInt(0, 255);
    e.target.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    // }
}

const MAXGRIDSIZE = 100;

const grid = document.getElementById('grid');
const refresh = document.querySelector('#refresh-button');
const newGrid = document.querySelector('#grid-button');

let gridSize = 16;
let style = getComputedStyle(grid);
let width = parseInt(style.width.replace('px', ''));
let elementSize = width / gridSize;

newGrid.addEventListener('click', setGridSize);
refresh.addEventListener('click', refreshCanvas);

// setGridSize();
initializeCanvas();