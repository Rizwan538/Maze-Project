$(document).ready(function () {

    //~~~~~~~~~~ Entry point ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    function start() {
        // create a new drawing using the drawingArea class
        thisGame = new DrawingArea(700, 700, "green", "theCanvas");

        //make a new sprite object
        let playersprite = new Sprite('../images/Main charcter sprite standing .gif', 150, 150, false, 1)

        //add the player to the game
        thisGame.addPlayer(playersprite)
        
        // add the shapes
        draw(thisGame);

        // add movement
        $(document).on("keydown", function (e) {
           thisGame.movePlayer(e.keyCode);
            e.preventDefault();
            
           thisGame.reDraw();
        });

        let maze  = document.querySelector(".maze");
        //maze.width = 700
        //maze.height = 700
        //maze.style = "background: green"

        let ctx = maze.getContext("2d"); 

       // let sizeOfCell = 300
        let newMaze = new Maze(150, 10, 10, ctx);

        newMaze.setup();
        newMaze.draw();

    }

    function draw(drawing) {}
    // Call entry point
    start();
})//END of document load
