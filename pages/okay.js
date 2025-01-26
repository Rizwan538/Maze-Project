class Maze {
    constructor(canvas, cols, rows, gridSize) {
        this.canvas = canvas;
        this.cols = cols;
        this.rows = rows;
        this.gridSize = gridSize;
        this.maze = [];
        this.player = { x: 1, y: 1 };
        this.goal = { x: cols - 2, y: rows - 2 }; // Goal at bottom-right
        this.ctx = canvas.getContext("2d");
    }

    init() {
        for (let y = 0; y < this.rows; y++) {
            this.maze[y] = [];
            for (let x = 0; x < this.cols; x++) {
                this.maze[y][x] = 1; // Set walls
            }
        }
    }

    generateMaze(x, y) {
        const direction = [
            [1, 0], [-1, 0], [0, 1], [0, -1]
        ];
        this.shuffle(direction);  // Randomize directions to generate more interesting mazes
        
        // Loop over directions
        for (const [ax, ay] of direction) {
            const newX = x + ax * 2;
            const newY = y + ay * 2;
            
            // Check if the new position is within bounds and unvisited
            if (newX >= 0 && newX < this.cols && newY >= 0 && newY < this.rows && this.maze[newY][newX] === 1) {
                // Create passage
                this.maze[y + ay][x + ax] = 0;
                this.maze[newY][newX] = 0;
                
                // Recursively generate maze from the new position
                this.generateMaze(newX, newY);
            }
        }
    }

    shuffle(array) {
        for (let index = array.length - 1; index > 0; index--) {
            const rand = Math.floor(Math.random() * (index + 1));
            [array[index], array[rand]] = [array[rand], array[index]];
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                if (this.maze[y][x] === 1) {
                    this.ctx.fillStyle = "black";
                } else {
                    this.ctx.fillStyle = "white";
                }
                this.ctx.fillRect(x * this.gridSize, y * this.gridSize, this.gridSize, this.gridSize);
            }
        }

        // Draw player
        this.ctx.fillStyle = "red";
        this.ctx.fillRect(this.player.x * this.gridSize, this.player.y * this.gridSize, this.gridSize, this.gridSize);

        // Draw goal
        this.ctx.fillStyle = "yellow";
        this.ctx.fillRect(this.goal.x * this.gridSize, this.goal.y * this.gridSize, this.gridSize, this.gridSize);
    }

    movePlayer(px, py) {
        const new_x = this.player.x + px;
        const new_y = this.player.y + py;
        
        if (new_x >= 0 && new_x < this.cols && new_y >= 0 && new_y < this.rows && this.maze[new_y][new_x] === 0) {
            this.player.x = new_x;
            this.player.y = new_y;
        }
    }
}

function main() {
    const canvas = document.getElementById("mazeCanvas");
    let maze;
    
    function startGame(cols, rows, gridSize) {
        maze = new Maze(canvas, cols, rows, gridSize);
        maze.canvas.width = cols * gridSize;
        maze.canvas.height = rows * gridSize;
        maze.init();
        maze.generateMaze(1, 1);
        maze.draw();

        document.addEventListener("keydown", (e) => {
            switch (e.key) {
                case "ArrowUp":
                    maze.movePlayer(0, -1);
                    break;
                case "ArrowDown":
                    maze.movePlayer(0, 1);
                    break;
                case "ArrowRight":
                    maze.movePlayer(1, 0);
                    break;
                case "ArrowLeft":
                    maze.movePlayer(-1, 0);
                    break;
            }
            maze.draw();
        });
    }

    startGame(20, 20, 20);
}

main();
