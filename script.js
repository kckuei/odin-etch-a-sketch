const grid = document.getElementById('grid');
const colorPicker = document.getElementById('colorpicker');
const monoTogg = document.getElementById('monochrome-toggle');
const rainbowTogg = document.getElementById('rainbow-toggle');
const eraseTogg = document.getElementById('erase-toggle');
const gridlinesTogg = document.getElementById('gridlines-toggle');
const clear = document.getElementById('clear-button');
const gridSlider = document.getElementById('grid-slider');
const gridText = document.getElementById('grid-text');

let gridSize = parseInt(gridSlider.value);
let style = getComputedStyle(grid);
let width = parseInt(style.width.replace('px', ''));
let elementSize = width / gridSize;
let cells;
let drawColor = colorPicker.value;
let colorGradIndex = 0;
let eraseMode = false;
let gridMode = false;
let monoMode = false;
let rainbowMode = false;

clear.onclick = () => reloadGrid();
colorPicker.onchange = () => pickColor();
monoTogg.onchange = () => toggleMono();
rainbowTogg.onchange = () => toggleRainbow();
eraseTogg.onchange = () => toggleEraser();
gridlinesTogg.onchange = () => toggleGrid();
gridSlider.onmousemove = (e) => changeGridSizeVal(e.target.value);
gridSlider.onchange = (e) => changeGridSize(e.target.value);
window.onkeydown = (e) => checkHotKeys(e.key);


function changeGridSizeVal(size) {
    gridText.innerText = `Grid Size: ${size} x ${size}`;
    gridSize = size;
}

function changeGridSize(size) {
    changeGridSizeVal(size)
    reloadGrid();
}

function clearGrid() {
    grid.innerHTML = '';
}

function reloadGrid() {
    clearGrid();
    createGrid(gridSize);
}

function createGrid(gridSize) {
    width = parseInt(style.width.replace('px', ''));
    elementSize = width / gridSize;

    for (let row = 0; row < gridSize; row++) {

        let div = document.createElement("div");
        div.style.height = `${elementSize}px`;
        grid.appendChild(div);

        for (let col = 0; col < gridSize; col++) {

            let cell = document.createElement('div');
            cell.className = 'cell';
            // cell.style.transitionDuration = '0.25s';
            cell.style.display = 'inline-block';
            cell.style.height = `${elementSize}px`;
            cell.style.width = `${elementSize}px`;
            cell.addEventListener('mouseover', changeColor);
            cell.addEventListener('mousedown', changeColor);
            if (gridMode) {
                cell.classList.add('cell-grid');
            }
            div.appendChild(cell);
        }
    }
    cells = grid.getElementsByClassName('cell');
}


function changeColor(e) {
    let mouseDown = (e.which === 1);
    if (e.type === 'mouseover' && !mouseDown) return;

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
    monoMode = false;
    toggleMono();
}

// hotkey callbacks

function checkHotKeys(key) {
    if (key === 'c') reloadGrid();
    if (key === 'e') toggleEraser();
    if (key === 'g') toggleGrid();
    if (key === 'm') toggleMono();
    if (key === 'r') toggleRainbow();
}

function toggleMono() {
    eraseMode = false
    eraseTogg.checked = false;
    if (monoMode) {
        monoMode = false
        eraseTogg.checked = false;
    } else {
        monoMode = true;
        monoTogg.checked = true;
        rainbowMode = false;
        rainbowTogg.checked = false;
    }
}

function toggleRainbow() {
    eraseMode = false
    eraseTogg.checked = false;
    if (rainbowMode) {
        rainbowMode = false
        rainbowTogg.checked = false;
        monoMode = true;
        monoTogg.checked = true;
    } else {
        rainbowMode = true;
        rainbowTogg.checked = true;
        monoMode = false;
        monoTogg.checked = false;
    }
}

function toggleEraser() {
    if (eraseMode) {
        eraseMode = false
        eraseTogg.checked = false;
        monoMode = true;
        monoTogg.checked = true;
    } else {
        eraseMode = true;
        eraseTogg.checked = true;
        rainbowMode = false
        rainbowTogg.checked = false;
        monoMode = false;
        monoTogg.checked = false;
    }
}

function toggleGrid() {
    if (gridMode) {
        Array.from(cells).forEach(cell => cell.classList.remove('cell-grid'));
        gridMode = false;
        gridlinesTogg.checked = false;
    } else {
        Array.from(cells).forEach(cell => cell.classList.add('cell-grid'));
        gridMode = true;
        gridlinesTogg.checked = true;
    }
}

window.onload = () => {
    createGrid(gridSize);
}