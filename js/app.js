/**
 * Select the container for the grid and the button to change the grid size.
 * Initialize the default grid size.
 */
const gridContainer = document.querySelector(".content__grid");
const newGridBtn = document.querySelector("#gridChanger");
let currentGridSize = 16;
let totalGridSize = currentGridSize * currentGridSize;

/**
 * Create a grid of specified size and update grid item dimensions.
 * @param {number} gridSizeValue - The size of the grid.
 */
const createGrid = (gridSizeValue) => {
  for (let i = 0; i < totalGridSize; i++) {
    const gridItem = document.createElement("div");
    gridItem.classList.add("content__grid-item");
    gridContainer.appendChild(gridItem);
  }
  updateGridItemSize(gridSizeValue);
};

/**
 * Update the dimensions of each grid item based on the new size.
 * @param {number} gridSizeValue - The new grid size.
 */
const updateGridItemSize = (gridSizeValue) => {
  const gridItems = document.querySelectorAll(".content__grid-item");
  const itemSize = `calc(512px / ${gridSizeValue})`;
  gridItems.forEach((item) => {
    item.style.width = itemSize;
    item.style.height = itemSize;
  });
};

createGrid(currentGridSize);

let isDrawing = false;

/**
 * Listen for the mouse down event to start drawing.
 */
document.addEventListener("mousedown", (event) => {
  if (event.button === 0) {
    isDrawing = true;
  }
});

/**
 * Listen for the mouse move event to draw on the grid.
 */
document.addEventListener("mousemove", (event) => {
  if (isDrawing && event.target.classList.contains("content__grid-item")) {
    event.target.style.backgroundColor = "#000000";
  }
});

/**
 * Listen for the mouse up event to stop drawing.
 */
document.addEventListener("mouseup", () => {
  isDrawing = false;
});

/**
 * Listen for the button click event to change the grid size.
 */
newGridBtn.addEventListener("click", () => {
  let newSize;
  let intNewSize;

  while (newSize !== null) {
    newSize = prompt("Enter your desired grid size: (1-100)");

    if (newSize === null) {
      break; // Exit the loop on prompt cancellation
    }

    if (newSize.trim() === "") {
      alert("ERROR! Please enter a value.");
      continue; // Prompt again if input is empty
    }

    if (!isNaN(newSize)) {
      intNewSize = parseInt(newSize);
      if (intNewSize >= 1 && intNewSize <= 100) {
        currentGridSize = intNewSize;
        totalGridSize = currentGridSize * currentGridSize;
        break;
      } else {
        alert("ERROR! Enter an integer between 1 and 100.");
      }
    } else {
      alert("ERROR! Integers only.");
    }
  }

  const gridItems = document.querySelectorAll(".content__grid-item");
  gridItems.forEach((item) => {
    gridContainer.removeChild(item);
  });

  createGrid(currentGridSize);
});
