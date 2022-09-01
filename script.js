// document pointers
const grid = document.getElementById('grid');
const colorPicker = document.getElementById('colorpicker');
const gridSlider = document.getElementById('slider')
const rainbow = document.getElementById('rainbow');
const monotone = document.getElementById('monotone')
const refresh = document.querySelector('#refresh-button');
const newGrid = document.querySelector('#grid-button');

// drawing state variables
let gridSize = parseInt(gridSlider.value);
let style = getComputedStyle(grid);
let width = parseInt(style.width.replace('px', ''));
let elementSize = width / gridSize;
let cells;
let drawColor = '#ff0000'

// hot key state variables
let eraseMode = false;
let gridMode = false;
let monotoneMode = false;
let rainbowMode = false;

// sets event listeners
newGrid.addEventListener('click', setGridSizeFromPrompt);
refresh.addEventListener('click', refreshCanvas);
colorPicker.addEventListener('change', pickColor);
gridSlider.addEventListener('change', setGridSizeFromSlider);
rainbow.addEventListener('click', toggleRainbow);
monotone.addEventListener('click', toggleMonotone);
window.addEventListener('keydown', checkHotKeys);


function initializeCanvas(gridSize = 25) {

    for (let row = 0; row < gridSize; row++) {

        let div = document.createElement("div");
        div.style.height = `${elementSize}px`;
        grid.appendChild(div);

        for (let col = 0; col < gridSize; col++) {

            let cell = document.createElement('div');
            cell.className = 'cell';
            cell.style.transitionDuration = '0.25s';
            cell.style.display = 'inline-block';
            cell.style.height = `${elementSize}px`;
            cell.style.width = `${elementSize}px`;
            cell.addEventListener('mouseover', fillCell)
            cell.addEventListener('click', fillCell);
            if (gridMode) {
                cell.classList.add('cell-grid');
            }
            div.appendChild(cell);
        }
    }
    cells = grid.getElementsByClassName('cell');
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
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
    let mouseIsDown = (e.which === 1);
    if (mouseIsDown) {
        if (eraseMode) {
            e.target.style.backgroundColor = 'rgb(255,255,255)';
        } else {
            if (rainbowMode) {
                rgb = nextColorGradient(.3, .3, .3, 0, 2, 4)
                e.target.style.backgroundColor = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
            } else {
                e.target.style.backgroundColor = drawColor;
            }
        }
    }
}

let colorGradIndex = 0;

function nextColorGradient(frequency1, frequency2, frequency3,
    phase1, phase2, phase3,
    center, width, len) {

    if (center == undefined) center = 128;
    if (width == undefined) width = 127;
    if (len == undefined) len = 50;

    let red = Math.sin(frequency1 * colorGradIndex + phase1) * width + center;
    let grn = Math.sin(frequency2 * colorGradIndex + phase2) * width + center;
    let blu = Math.sin(frequency3 * colorGradIndex + phase3) * width + center;

    if (colorGradIndex > 50) {
        colorGradIndex = 0;
    }
    colorGradIndex++;
    return [red, grn, blu];
}

// ui callbacks

function pickColor() {
    drawColor = colorPicker.value;
    monotoneMode = true;
    rainbowMode = false;
}


function setGridSizeFromPrompt() {
    do {
        response = prompt('Choose a grid-size:', gridSize);
        response = parseInt(response);
        console.log(response)
    } while ((response < 0) || (response > 50))
    if (!isNaN(response)) {
        gridSize = response;
        elementSize = width / gridSize;
        refreshCanvas();
    }
}

function setGridSizeFromSlider() {
    gridSize = parseInt(gridSlider.value);
    elementSize = width / gridSize;
    refreshCanvas();
}


// hot key callbacks

function checkHotKeys(e) {
    if (e.key === 'e') toggleEraser();
    if (e.key === 'g') toggleGrid();
    if (e.key === 'm') toggleMonotone();
    if (e.key === 'r') toggleRainbow();
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

function toggleMonotone() {
    if (monotoneMode) {
        monotoneMode = false
    } else {
        monotoneMode = true;
        rainbowMode = false;
    }
}

function toggleRainbow() {
    if (rainbowMode) {
        rainbowMode = false
    } else {
        rainbowMode = true;
        monotoneMode = false;
    }
}


initializeCanvas(gridSize);