class Maze {
    constructor(canvas, width, height, gridSize) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.width = width;
        this.height = height;
        this.gridSize = gridSize;
        this.cols = Math.floor(width / gridSize);
        this.rows = Math.floor(height / gridSize);
        this.maze = [];
    }

    // Initialize the maze grid
    init() {
        for (let y = 0; y < this.rows; y++) {
            this.maze[y] = [];
            for (let x = 0; x < this.cols; x++) {
                this.maze[y][x] = 1; // 1 = wall, 0 = path
            }
        }
    }

    // Generate the maze using Recursive Backtracking
    generate(x, y) {
        const directions = [
            [1, 0], // Right
            [-1, 0], // Left
            [0, 1], // Down
            [0, -1] // Up
        ];
        this.shuffle(directions);

        for (const [dx, dy] of directions) {
            const nx = x + dx * 2;
            const ny = y + dy * 2;
            if (nx >= 0 && nx < this.cols && ny >= 0 && ny < this.rows && this.maze[ny][nx] === 1) {
                this.maze[y + dy][x + dx] = 0; // Carve a path
                this.maze[ny][nx] = 0;
                this.generate(nx, ny);
            }
        }
    }

    // Shuffle an array (Fisher-Yates algorithm)
    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Draw the maze
    draw() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                if (this.maze[y][x] === 1) {
                    this.ctx.fillStyle = '#333'; // Wall color
                    this.ctx.fillRect(x * this.gridSize, y * this.gridSize, this.gridSize, this.gridSize);
                } else {
                    this.ctx.fillStyle = '#fff'; // Path color
                    this.ctx.fillRect(x * this.gridSize, y * this.gridSize, this.gridSize, this.gridSize);
                }
            }
        }
    }
}

// Main function to initialize and run the maze generator
function main() {
    const canvas = document.getElementById('mazeCanvas');
    const maze = new Maze(canvas, 400, 400, 20);

    maze.init();
    maze.generate(1, 1); // Start generating from (1, 1)
    maze.draw();
}

// Run the program
main();