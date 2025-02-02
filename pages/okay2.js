// 🌟 Step 1: Canvas Setup (Prepare the Drawing Surface)
const canvas = document.getElementById("mazeCanvas");
const ctx = canvas.getContext("2d");

// 🌟 Step 2: Define Tile and Grid Size
const boxSize = 20; // Each tile is 20x20 pixels
const cols = Math.floor(canvas.width / boxSize); // Calculate number of columns
const rows = Math.floor(canvas.height / boxSize); // Calculate number of rows

// 🌟 Step 3: Maze Class - Handles Maze Structure & Generation
class Maze {
    constructor(cols, rows, boxSize) {
        this.cols = cols;
        this.rows = rows;
        this.boxSize = boxSize;
        this.grid = []; // Maze grid initialization
        this.generateMaze(); // Call function to generate the maze
    }

    // 🏗 Step 3.1: Generate the Maze using Recursive Backtracking
    generateMaze() {
        // ⿡ Initialize the Grid (Create a Full Wall Grid)
        this.grid = Array.from({ length: this.rows }, () => Array(this.cols).fill(1));

        // ⿢ Pick a random starting position (Must be inside the grid)
        let stack = [{ x: 1, y: 1 }]; // Start at position (1,1)
        this.grid[1][1] = 0; // Mark the start position as a path (0)

        // ⿣ Use a Stack for Recursive Backtracking
        while (stack.length > 0) {
            let { x, y } = stack.pop(); // Get the last position in the stack
            let neighbors = this.checkNeighbours(x, y); // Get valid neighboring cells

            if (neighbors.length > 0) {
                stack.push({ x, y }); // Push current cell back onto stack

                // Pick a random neighbor to move to
                let { nx, ny } = neighbors[Math.floor(Math.random() * neighbors.length)];

                // Carve a path between current position and the new position
                this.grid[ny][nx] = 0; // Make new position a path
                this.grid[(ny + y) / 2][(nx + x) / 2] = 0; // Remove the wall between them

                // Add the new position to the stack to continue
                stack.push({ x: nx, y: ny });
            }
        }

        // ⿤ Define the Exit Position (Bottom-right corner but inside the maze)
        this.grid[this.rows - 2][this.cols - 2] = 2; // Mark exit with '2'
    }

    // 🔎 Step 3.2: Get Valid Neighbors for Maze Carving
    checkNeighbours(x, y) {
        // Define possible directions (Moving 2 steps at a time to create corridors)
        let directions = [
            { nx: x + 2, ny: y }, // Move Right
            { nx: x - 2, ny: y }, // Move Left
            { nx: x, ny: y + 2 }, // Move Down
            { nx: x, ny: y - 2 }  // Move Up
        ];

        // Filter out invalid moves (Out of bounds or already visited cells)
        return directions.filter(({ nx, ny }) =>
            nx > 0 && ny > 0 &&
            nx < this.cols - 1 && ny < this.rows - 1 &&
            this.grid?.[ny]?.[nx] === 1 // The cell must be a wall
        );
    }
}

class Player {
    constructor(boxSize){
        this.boxSize = boxSize;
        this.x = 1;
        this.y = 1;
        this.size = this.boxSize / 2
    }
    move(destinationX, destinationY, maze){
        let newX = this.x + destinationX;
        let newY = this.y + destinationY;
        if (maze.grid[newX][newY] !== 1 ) {
            this.x = newX;
            this.y = newY;
            if (maze.grid[newX][newY] === 2 ) {
                alert("Congratulations!")
                location.reload()
            }
        }
    }
}
// 🌟 Step 4: Create the Maze Instance
let maze = new Maze(cols, rows, boxSize);
let user = new Player(boxSize);
document.addEventListener("keydown", (event)=>{
    switch (event.key) {
        case "ArrowUp":
            user.move(0,-1,maze)
            break;
        case "ArrowDown":
            user.move(0,1,maze)
            break;
        case "ArrowRight":
            user.move(1,0,maze)
            break;
        case "ArrowLeft":
            user.move(-1,0,maze)
            break;
        default:
            break;
    }
    drawMaze();
} )

// 🎨 Step 5: Function to Draw the Maze on Canvas
function drawMaze() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear previous frame

    // Loop through each row and column to draw the maze grid
    maze.grid.forEach((row, y) => {
        row.forEach((cell, x) => {
            if (cell === 1) { // Wall
                ctx.strokeStyle = "blue"; // Wall color
                ctx.lineWidth = 2; // Wall thickness
                ctx.strokeRect(x * boxSize, y * boxSize, boxSize, boxSize);
            } else if (cell === 2) { // Exit
                ctx.fillStyle = "green"; // Exit color
                ctx.fillRect(x * boxSize, y * boxSize, boxSize, boxSize);
            }
        });
    });

    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(user.x * boxSize + boxSize / 2, user.y * boxSize + boxSize / 2, user.size, 0, Math.PI * 2);
    ctx.fill();
}

// 🌟 Step 6: Draw the Maze on the Canvas
drawMaze();