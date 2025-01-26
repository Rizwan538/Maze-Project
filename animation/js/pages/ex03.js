$(document).ready(function() {  
 
    //~~~~~~~~~~ Entry point ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    function start(){
        //create a new drawing using the drawingArea class
        drawing = new DrawingArea(800, 600, "#ffffc5", "theCanvas")

        // add the shapes
        draw(drawing);

        //add the drawing to each button
        addButtons(drawing);

      $(document).on("keydown", function(e){
        drawing.movePlayer(e.keyCode);

        if (e.keyCode==37) {
            console.log(e.keyCode, "left");
        } else if (e.keyCode == 38){
            console.log(e.keyCode, "up");
        } else if (e.keyCode == 39){
            console.log(e.keyCode, "right");
        } else if (e.keyCode == 40){
            console.log(e.keyCode, "down");
        }

        e.preventDefault();
      });
    }
   
   
    //~~~~~~~~~~Add the buttons to the drawing ~~~~~~~~~~~~~~~~~~~~~~
    function addButtons(drawing) {
        /* FUNCTION to add the buttons to the HTML document
            @param: drawing   object  the drawing object that will be accessed
        */
   
        const buttons = [];
   
        //Add the clear button
        buttons.push(
            $("<button />")
                .attr("id", "btnClear")
                .html("Clear")
                .on("click", function(){
                    //clear the canvas
                    drawing.clear();
                })
        );
       
        //Add the redraw button
        buttons.push(
            $("<button />")
                .attr("id", "btnRedraw")
                .html("Redraw")
                .on("click", function() {
                    //redraw completely
                    drawing.clear();
                    draw(drawing);
                })
        );
 
        //Add the start button
        buttons.push(
            $("<button />")
                .attr("id", "btnStart")
                .html("Start animation")
                .on("click", function() {
                    //reload the page
                    drawing.start();
                })
        );
 
        //Add the stop button
        buttons.push(
            $("<button />")
                .attr("id", "btnStop")
                .html("Stop animation")
                .on("click", function() {
                    //reload the page
                    drawing.stop();
                })
        );
   
        //loop through the buttons and add the drawing to them as data
        for (const button of buttons){
            // Add default properties
            button
                .prop("type", "button")
                .addClass("btn")
                .addClass("btn-dark")
                .css("margin-top", "0.5em")
                .css("margin-right", "0.5em");
 
            //add the buttons to the buttons div
            $("#canvasButtons").append(button)
        }
    }
 
    //~~~~~~~~~~Add the shapes to the drawing ~~~~~~~~~~~~~~~~~~~~~~
    function draw(drawing){
        /* FUNCTION to add shapes to the drawing
            @param: drawing   object  the drawing object that will be accessed
        */
        //ADD YOUR CODE FROM HERE~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
       
        //loop 16 times
            //draw the object
            const circ = new Circle("#c33", 6, 250, 240, "#fff", 50, 50 )
            drawing.addObject(circ)  
            const rect = new Rectangle("#c33", 6, 195, 300, "#fff", 110, 150 )
            drawing.addObject(rect)
            const circ1 = new Circle("#c33", 10, 260, 235, "#fff", 5, 5 )
            drawing.addObject(circ1)  
            const circ2 = new Circle("#c33", 10, 220, 235, "#fff", 5, 5 )
            drawing.addObject(circ2)  
            const tri = new Triangle("#c33", 6, 250, 180, "#fff", 50, 50 )
            drawing.addObject(tri)  
            const rect1 = new Rectangle("#c33", 6, 250, 450, "#fff", 50, 125 )
            drawing.addObject(rect1)
            const rect2 = new Rectangle("#c33", 6, 200, 450, "#fff", 50, 125 )
            drawing.addObject(rect2)
            const rect3 = new Rectangle("#c33", 6, 150, 300, "#fff", 50, 125 )
            drawing.addObject(rect3)
            const rect4 = new Rectangle("#c33", 6, 300, 300, "#fff", 50, 125 )
            drawing.addObject(rect4)

         //end for
    }
   
    // Call entry point
    start();
   
}) //END of document load
   