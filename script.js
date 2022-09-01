// document poclearinters
const grid = document.getElementById('grid');
const colorPicker = document.getElementById('colorpicker');
const monochromeToggle = document.getElementById('monochrome-toggle');
const rainbowToggle = document.getElementById('rainbow-toggle');
const eraseToggle = document.getElementById('erase-toggle');
const gridlinesToggle = document.getElementById('gridlines-toggle');
const clear = document.getElementById('clear-button');
const gridSlider = document.getElementById('grid-slider');
const gridText = document.getElementById('grid-text');
// const newGrid = document.getElementById('grid-button');

// drawing state variables
let gridSize = parseInt(gridSlider.value);
let style = getComputedStyle(grid);
let width = parseInt(style.width.replace('px', ''));
let elementSize = width / gridSize;
let cells;
let drawColor = colorPicker.value;

// hot key state variables
let eraseMode = false;
let gridMode = false;
let monochromeMode = false;
let rainbowMode = false;

// sets event listeners
clear.addEventListener('click', clearCanvas);
colorPicker.addEventListener('change', pickColor);
gridSlider.addEventListener('change', setGridSizeFromSlider);
monochromeToggle.addEventListener('change', toggleMonochrome);
rainbowToggle.addEventListener('change', toggleRainbow);
eraseToggle.addEventListener('change', toggleEraser);
gridlinesToggle.addEventListener('change', toggleGrid);
window.addEventListener('keydown', checkHotKeys);
// newGrid.addEventListener('click', setGridSizeFromPrompt);


function initializeCanvas(gridSize = 20) {

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

function clearCanvas() {
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
            e.target.style.backgroundColor = 'white';
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
    monochromeMode = true;
    rainbowMode = false;
    eraseMode = false;
}


function setGridSizeFromPrompt() {
    do {
        response = prompt('Choose a grid-size:', gridSize);
        response = parseInt(response);
    } while ((response < 0) || (response > 50))
    if (!isNaN(response)) {
        gridText.innerText = `Grid Size: ${gridSize} x ${gridSize}`;
        gridSize = response;
        elementSize = width / gridSize;
        clearCanvas();
    }
}

function setGridSizeFromSlider() {
    gridText.innerText = `Grid Size: ${gridSize} x ${gridSize}`;
    gridSize = parseInt(gridSlider.value);
    elementSize = width / gridSize;
    clearCanvas();
}


// hot key callbacks

function checkHotKeys(e) {
    if (e.key === 'c') clearCanvas();
    if (e.key === 'e') toggleEraser();
    if (e.key === 'g') toggleGrid();
    if (e.key === 'm') toggleMonochrome();
    if (e.key === 'r') toggleRainbow();
}


function toggleMonochrome() {
    eraseMode = false
    eraseToggle.checked = false;
    if (monochromeMode) {
        monochromeMode = false
        eraseToggle.checked = false;
    } else {
        monochromeMode = true;
        monochromeToggle.checked = true;
        rainbowMode = false;
        rainbowToggle.checked = false;
    }
}

function toggleRainbow() {
    eraseMode = false
    eraseToggle.checked = false;
    if (rainbowMode) {
        rainbowMode = false
        rainbowToggle.checked = false;
        monochromeMode = true;
        monochromeToggle.checked = true;
    } else {
        rainbowMode = true;
        rainbowToggle.checked = true;
        monochromeMode = false;
        monochromeToggle.checked = false;
    }
}

function toggleEraser() {
    if (eraseMode) {
        eraseMode = false
        eraseToggle.checked = false;
        monochromeMode = true;
        monochromeToggle.checked = true;
    } else {
        eraseMode = true;
        eraseToggle.checked = true;
        rainbowMode = false
        rainbowToggle.checked = false;
        monochromeMode = false;
        monochromeToggle.checked = false;
    }
}

function toggleGrid() {
    if (gridMode) {
        Array.from(cells).forEach(cell => cell.classList.remove('cell-grid'));
        gridMode = false;
        gridlinesToggle.checked = false;
    } else {
        Array.from(cells).forEach(cell => cell.classList.add('cell-grid'));
        gridMode = true;
        gridlinesToggle.checked = true;
    }
}



initializeCanvas(gridSize);