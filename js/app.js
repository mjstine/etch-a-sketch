/**
 * Select the container for the grid and the button to change the grid size.
 * Initialize the default grid size.
 */
const grid = document.querySelector(".grid");
const enterBtn = document.querySelector("#enterBtn");
const resetBtn = document.querySelector("#resetBtn");
const newGridSize = document.querySelector("#newGridSize");

let currentGridSize = newGridSize.valueAsNumber;
let totalGridSize = currentGridSize * currentGridSize;
let isDrawing = false;
let isUndo = false;

/**
 * Create a grid of specified size and update grid item dimensions.
 * @param {number} gridSizeValue - The size of the grid.
 */
const createGrid = (gridSizeValue) => {
  for (let i = 0; i < totalGridSize; i++) {
    const gridItem = document.createElement("div");
    gridItem.classList.add("grid__item");
    grid.appendChild(gridItem);
  }
  updateGridItemSize(gridSizeValue);
};

/**
 * Update the dimensions of each grid item based on the new size.
 * @param {number} gridSizeValue - The new grid size.
 */
const updateGridItemSize = (gridSizeValue) => {
  const gridItems = document.querySelectorAll(".grid__item");
  const itemSize = `calc(512px / ${gridSizeValue})`;
  gridItems.forEach((item) => {
    item.style.width = itemSize;
    item.style.height = itemSize;
  });
};

/**
 * Removes all grid items from the grid container.
 */
const removeGrid = () => {
  const gridItems = document.querySelectorAll(".grid__item");
  gridItems.forEach((item) => {
    grid.removeChild(item);
  });
};

/**
 * Listen for the mouse right-click event.
 */
document.addEventListener("contextmenu", (event) => {
  event.preventDefault()
})

/**
 * Listen for the mouse down event to start drawing.
 */
document.addEventListener("mousedown", (event) => {
  if (event.button === 0) {
    isDrawing = true;
  }

  if (event.button === 2) {
    isUndo = true
  }
});

/**
 * Listen for the mouse move event to draw on the grid.
 */
document.addEventListener("mousemove", (event) => {
  if (isDrawing && event.target.classList.contains("grid__item")) {
    event.target.style.backgroundColor = "#000000";
  }

  if (isUndo && event.target.classList.contains("grid__item")) {
    event.target.style.backgroundColor = "#EEEEEE";
  }
});

/**
 * Listen for the mouse up event to stop drawing.
 */
document.addEventListener("mouseup", () => {
  isDrawing = false;
  isUndo = false;
});

/**
 * Listen for the button click event to change the grid size.
 */
enterBtn.addEventListener("click", () => {
  let newSize = newGridSize.valueAsNumber;
  if (newSize > 64 || newSize < 16) {
    alert("ERROR! Enter an integer between 16 and 64.");
  } else {
    currentGridSize = newSize;
    totalGridSize = currentGridSize * currentGridSize;
  }

  removeGrid();
  createGrid(currentGridSize);
});

/**
 * Event listener function for the "reset" button click event.
 * Resets the background color of all grid items to the default color.
 */
resetBtn.addEventListener("click", () => {
  const gridItems = document.querySelectorAll(".grid__item");
  gridItems.forEach((item) => {
    item.style.backgroundColor = "#EEEEEE";
  });
});

window.addEventListener("load", () => createGrid(currentGridSize));
