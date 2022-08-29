const grid = document.getElementById("grid");

let style = getComputedStyle(grid);
let width = parseInt(style.width.replace("px", ""));
let gridSize = 16;
let elementSize = width / gridSize;


for (let i = 0; i < gridSize; i++) {
    let row = document.createElement("div");
    row.style.height = `${elementSize}px`;
    grid.appendChild(row);
    for (let j = 0; j < gridSize; j++) {
        let cell = document.createElement('div');
        // cell.innerHTML = 'x';
        cell.style.display = 'inline-block';
        cell.style.height = `${elementSize}px`;
        cell.style.width = `${elementSize}px`;
        cell.className = 'cell';
        row.appendChild(cell);
    }
}