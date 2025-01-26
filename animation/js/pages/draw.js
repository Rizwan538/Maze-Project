//~~~~~~~~~~ OBJECT DEFINITIONS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//define the Game Area OBJECT
class DrawingArea {
    constructor(areaWidth, areaHeight, backgroundColour, divId){
        /* Constructor method for game area
           @param: areaWidth   width of the canvas
           @param: areaHeight  height of the canvas
           @param: divId       id of the DIV element that the canvas will be appended to
 
           @attr:   canvas   canvas object
           @attr:   objects  objects on the canvas
 
           @method: clear    clears the canvas
           @method: reDraw   draws a set of objects on the canvas
        */      
 
        //ATTRIBUTES of drawingArea ~~~~~~~~~~~~~~~~~~
        //canvas object
        this.canvas = $("<canvas />")
            .attr("id", "canvasFor" + divId)
            .attr("width", areaWidth)
            .attr("height",areaHeight)
            .attr("style", "background:" + backgroundColour)
 
 
        //add an empty list of objects
        this.objects = [];
 
        //initialise the interval
        this.interval = null;
 
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 
        //add the canvas to the container DIV
        $("#" + divId).append(this.canvas)
    }
 
    //METHODS of drawingArea ~~~~~~~~~~~~~~~~~~~~~~~~~~
 
    clear() {
        /* PUBLIC METHOD that clears the canvas area of anything that has been drawn
        */
 
        //empty object list
        this.objects = [];
       
        //clear the canvas
        this.canvas.clearCanvas();
    }
 
    addObject(newObject){
        /* PUBLIC METHOD that adds a new object to canvas and displays it
            @param: newObject   object  whatever needs to be drawn
        */
 
        //add object to list of objects
        this.objects.push(newObject);
 
        //redraw ALL the objects on the canvas
        //this.reDraw()
        newObject.draw(this.canvas);
    }
 
    reDraw() {
        /* PRIVATE METHOD redraws all of the objects on the canvas
        */
 
        //clear the canvas first
        this.canvas.clearCanvas();
 
        //Loop through all of the objects in the list
        for (const object of this.objects) {
 
            // Update the object for animation
            object.update();
 
            // Use the draw method of the object to redraw it
            object.draw(this.canvas);
        }
    }
 
    start() {
        //set the function updateGameArea to repeat every 20/1000 seconds
        this.interval = setInterval(this.reDraw.bind(this), 20);
    }
 
    stop() {
        //stop the repeated function from repeating
        clearInterval(this.interval);
    }

    movePlayer(key) {
        /*FUNCTION
            used to clear and redraw opn the canvas
        */
       //clear the canvas
       this.canvas.clearCanvas();

       //draw the set of Objects
       for (const object of this.objects) {
        object.moveByKey(key) ;
        object.draw(this.canvas) ;
       }
    }

} //END of CLASS defintion for drawingArea
 
class Shape {
    constructor(strokeStyle, strokeWidth, xvalue, yvalue, fillStyle) {
        /* Constructor method for shape parent class
           @param: strokeStyle  (hex)String  colour of the line
           @param: strokeWidth  integer      width of the drawing line
           @param: x            integer      x coordinate of shape
           @param: y            integer      y coordinate of shape
           
        */      
        this.strokeStyle = strokeStyle;
        this.strokeWidth = strokeWidth;
        this.xcoord      = xvalue;
        this.ycoord      = yvalue;
        this.fillStyle   = fillStyle;
 
        this.xvelocity = 0;
        this.yvelocity = 0;
        this.period = 0; // Length of cycle in ms
        this.amplitude = 0;
        this.t = 0; // Position in cycle (0-1)
        this.motion = "none";
    }

 
    get x(){
        return this.xcoord;
    }
    get y(){
        return this.ycoord;
    }
    set x(xvalue){
        this.xcoord = xvalue;
    }
    set y(yvalue){
        this.ycoord = yvalue;
    }
   
    update() {
        switch (this.motion) {
            case "straight":
                this.straightUpdate()
                break;
			case "circle":
				this.circleUpdate()
				break;
            case "rotate":
                this.rotate
        }  
    }
    
 
    straight(xvelocity, yvelocity) {
        this.motion = "straight"
        this.movement = {
            xvelocity: xvelocity,
            yvelocity: yvelocity
        }
    }
 
    straightUpdate() {
        this.xcoord += this.movement.xvelocity;
        this.ycoord += this.movement.yvelocity;
    }

	rotate(angVelocity){
		this.motion = "rotate";
        this.movement = {

        }
	}

    circle(radius, angVelocity) {
        this.motion = "circle";
        this.movement = {
            radius: radius,
            angVelocity: angVelocity * Math.PI / 100,
            angle: 0,
            originX: this.xcoord,
            originY: this.ycoord
        }
 
    }
 
    circleUpdate() {
        this.movement.angle += 0.1 /(this.movement.angVelocity * 1000 / 20)
        this.xcoord = 250 + this.movement.originX + Math.sin (this.movement.angle) * 50
        this.ycoord = 250 + this.movement.originY + Math.cos (this.movement.angle) * 50
    }

    moveByKey(keyCode) {
        switch (keyCode) {
            case 37:
                this.xcoord = this.xcoord - 15;
                 console.log("left");
                 break;
            case 38:
                this.ycoord = this.ycoord - 15;
                console.log("up");
                break;
            case 39:
                this.xcoord = this.xcoord + 15;
                console.log("right");
                break;
            case 40:
                this.ycoord = this.ycoord + 15;
                console.log("down");
                break;
        }
    }
 
}
 
class Rectangle extends Shape{
    constructor(strokeStyle, strokeWidth, xcoord, ycoord, fillStyle, width, height) {
        /* CONSTRUCTOR method for rectangle shape
           @inherit: strokeStyle, strokeWidth, x, y from shape
 
           @attr:    fillStyle    (hex)String  colour for fill
           @attr:    width        integer      width of rectangle
           @attr:    height       integer      height of rectangle
 
           @method: draw     draw the object on the given canvas
        */
 
        //set inherited attributes      
        super(strokeStyle, strokeWidth,xcoord, ycoord, fillStyle);
 
        //set extended attributes
        this.width       = width;
        this.height      = height;        
    }
 
    draw(canvas){
        /* METHOD for drawing rectangle shape
           @param:  canvas  canvas object   canvas to draw on
 
        */
        //draw this object
        canvas.drawRect({
            fillStyle  : this.fillStyle,
            strokeStyle: this.strokeStyle,
            strokeWidth: this.strokeWidth,
            x          : this.xcoord,
            y          : this.ycoord,
            width      : this.width,
            height     : this.height,
            fromCenter : false
        })
    }
}
 
class Triangle extends Shape {
    constructor(strokeStyle, strokeWidth, xcoord, ycoord, fillStyle, radius) {
        /* CONSTRUCTOR method for rectangle shape
           @inherit: strokeStyle, strokeWidth, x, y from shape
 
           @attr:    fillStyle    (hex)String  colour for fill
           @attr:    width        integer      width of rectangle
           @attr:    height       integer      height of rectangle
 
           @method: draw     draw the object on the given canvas
        */
 
        //set inherited attributes      
        super(strokeStyle, strokeWidth,xcoord, ycoord, fillStyle);
 
        //set extended attributes
        this.radius      = radius;
    }
 
    draw(canvas){
        /* METHOD for drawing circle shape
           @param:  canvas  canvas object   canvas to draw on
 
        */
        //draw this object      
        canvas.drawPolygon({
            fillStyle  : this.fillStyle,
            strokeStyle: this.strokeStyle,
            strokeWidth: this.strokeWidth,
            x          : this.xcoord,
            y          : this.ycoord,
            radius     : this.radius,
            sides      : 3
        })
    }
}
 
class Circle extends Shape {
    constructor(strokeStyle, strokeWidth, xcoord, ycoord, fillStyle, radius) {
        /* CONSTRUCTOR method for rectangle shape
           @inherit: strokeStyle, strokeWidth, x, y from shape
 
           @attr:    fillStyle    (hex)String  colour for fill
           @attr:    width        integer      width of rectangle
           @attr:    height       integer      height of rectangle
 
           @method: draw     draw the object on the given canvas
        */
 
        //set inherited attributes      
        super(strokeStyle, strokeWidth,xcoord, ycoord, fillStyle);
 
        //set extended attributes
        this.radius      = radius;
    }
 
    draw(canvas){
        /* METHOD for drawing circle shape
           @param:  canvas  canvas object   canvas to draw on
 
        */
        //draw this object      
        canvas.drawArc({
            fillStyle  : this.fillStyle,
            strokeStyle: this.strokeStyle,
            strokeWidth: this.strokeWidth,
            x          : this.xcoord,
            y          : this.ycoord,
            radius     : this.radius
        })
    }
}
 
class Lines {
    constructor(strokeStyle, strokeWidth, points) {
        /* CONSTRUCTOR method for drawing a series of lines
           @param: strokeStyle  (hex)String  colour of the line
           @param: strokeWidth  integer      width of the drawing line
           @param: points       list         x,y coordinates of points on line
 
           @method: draw     draw the object on the given canvas
        */
 
        //set data for the lines
        this.data = {
          strokeStyle : strokeStyle,
          strokeWidth : strokeWidth,
          rounded     : true
        };
       
        // Add the points from the array to the data attributes
        for (var p = 0; p < points.length; p += 1) {
            //add x point
            this.data['x'+(p+1)] = points[p][0];
            //add y point
            this.data['y'+(p+1)] = points[p][1];
        }
    }
 
    draw(canvas){
        /* METHOD for drawing series of connected points
           @param:  canvas  canvas object   canvas to draw on
        */
 
        canvas.drawLine(this.data)
    }
}