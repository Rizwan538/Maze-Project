$(document).ready(function() {  
 
    //~~~~~~~~~~ Entry point ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    function start() {
        // create a new drawing using the drawingArea class
        drawing = new DrawingArea(700, 700, "darkgray", "theCanvas");
        
        $('canvas').drawImage({
            source: '../images/PlainBackgound.png',
            layer: true,
            x: 0, y: 0, 
            fromCenter : false,
            scale: 1,
            draggable: false
        })
        $('canvas').drawImage({
            source: '../images/Main charcter sprite standing .gif',
            x: 150, y: 150,  
            layer: true,
            scale: 1,
            draggable: true
        })
        
        // add the control buttons
        addButtons(drawing);
   
        // add the shapes
        draw(drawing);
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
        for (let count = 0; count < 19; count++) {
            //draw the object
            const xvalue = count * 40 + 10;
            const rect = new Rectangle("#c33", 4, xvalue, 200, "#fff", 30, 30);
            drawing.addObject(rect);
            rect.straight(2, -count, 2)
            const tri = new Triangle("#c33", 2, xvalue, 240, "#fff", 50, 50 )
            drawing.addObject(tri)
            tri.circle(5, 2)
            const circ = new Circle("#c33", 4, xvalue, 160, "#fff", 30, 30 )
            drawing.addObject(circ)
            circ.straight(2, count, -2)
        
        } //end for
    }
   
    // Call entry point
    start();
   
})//END of document load
   