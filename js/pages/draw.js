//~~~~~~~~~~ OBJECT DEFINITIONS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//define the Game Area OBJECT
class DrawingArea {
    constructor(areaWidth, areaHeight, backgroundColour, divId) {
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
            .attr("height", areaHeight)
            .attr("style", "background:" + backgroundColour)


        //add an empty list of objects
        this.player = ""
        this.objects = [];
        this.backgroundImage = '../images/PlainBackgound.png' 
        //this.addBackground(this.backgroundImage, false, 0, 0, false, 1, false)

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

    addObject(newObject) {
        /* PUBLIC METHOD that adds a new object to canvas and displays it
            @param: newObject   object  whatever needs to be drawn
        */

        //add object to list of objects
        this.objects.push(newObject);

        //redraw ALL the objects on the canvas
        newObject.draw(this.canvas);
    }

    addPlayer(sprite) {
        //make a new player object
        this.player = new Player(150, 150, 1, 1, 1, 1, 1, sprite)

        //draw the player on the canvas
        this.player.draw(this.canvas)

    }

    addBackground(source, layer, xcoord, ycoord, fromCenter, scale, draggable) {

        //create canvas background
        this.canvas.drawImage({
            source: source,
            layer: layer,
            x: xcoord,
            y: ycoord,
            fromCenter: fromCenter,
            scale: scale,
            draggable: draggable
        })


    }

    reDraw() {
        /* PRIVATE METHOD redraws all of the objects on the canvas
        */

        //clear the canvas first
        this.canvas.clearCanvas();

        //this.addBackground(this.backgroundImage)

        //Loop through all of the objects in the list
        for (const object of this.objects) {

            // Update the object for animation
            object.update();

            // Use the draw method of the object to redraw it
            object.draw(this.canvas);
        }

        //redraw the player
        this.player.draw(this.canvas)
        
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
        this.player.moveByKey(key);
        this.player.reDraw(this.canvas);
        /*for (const object of this.objects) {
            object.moveByKey(key) ;
            object.draw(this.canvas) ;
       } */

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
        this.xcoord = xvalue;
        this.ycoord = yvalue;
        this.fillStyle = fillStyle;

        this.xvelocity = 0;
        this.yvelocity = 0;
        this.period = 0; // Length of cycle in ms
        this.amplitude = 0;
        this.t = 0; // Position in cycle (0-1)
        this.motion = "none";
    }


    get x() {
        return this.xcoord;
    }
    get y() {
        return this.ycoord;
    }
    set x(xvalue) {
        this.xcoord = xvalue;
    }
    set y(yvalue) {
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

    rotate(angVelocity) {
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
        this.movement.angle += 0.1 / (this.movement.angVelocity * 1000 / 20)
        this.xcoord = 250 + this.movement.originX + Math.sin(this.movement.angle) * 50
        this.ycoord = 250 + this.movement.originY + Math.cos(this.movement.angle) * 50
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

class Rectangle extends Shape {
    constructor(strokeStyle, strokeWidth, xcoord, ycoord, fillStyle, width, height) {
        /* CONSTRUCTOR method for rectangle shape
           @inherit: strokeStyle, strokeWidth, x, y from shape
 
           @attr:    fillStyle    (hex)String  colour for fill
           @attr:    width        integer      width of rectangle
           @attr:    height       integer      height of rectangle
 
           @method: draw     draw the object on the given canvas
        */

        //set inherited attributes      
        super(strokeStyle, strokeWidth, xcoord, ycoord, fillStyle);

        //set extended attributes
        this.width = width;
        this.height = height;
    }

    draw(canvas) {
        /* METHOD for drawing rectangle shape
           @param:  canvas  canvas object   canvas to draw on
 
        */
        //draw this object
        canvas.drawRect({
            fillStyle: this.fillStyle,
            strokeStyle: this.strokeStyle,
            strokeWidth: this.strokeWidth,
            x: this.xcoord,
            y: this.ycoord,
            width: this.width,
            height: this.height,
            fromCenter: false
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
        super(strokeStyle, strokeWidth, xcoord, ycoord, fillStyle);

        //set extended attributes
        this.radius = radius;
    }

    draw(canvas) {
        /* METHOD for drawing circle shape
           @param:  canvas  canvas object   canvas to draw on
 
        */
        //draw this object      
        canvas.drawPolygon({
            fillStyle: this.fillStyle,
            strokeStyle: this.strokeStyle,
            strokeWidth: this.strokeWidth,
            x: this.xcoord,
            y: this.ycoord,
            radius: this.radius,
            sides: 3
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
        super(strokeStyle, strokeWidth, xcoord, ycoord, fillStyle);

        //set extended attributes
        this.radius = radius;
    }

    draw(canvas) {
        /* METHOD for drawing circle shape
           @param:  canvas  canvas object   canvas to draw on
 
        */
        //draw this object      
        canvas.drawArc({
            fillStyle: this.fillStyle,
            strokeStyle: this.strokeStyle,
            strokeWidth: this.strokeWidth,
            x: this.xcoord,
            y: this.ycoord,
            radius: this.radius
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
            strokeStyle: strokeStyle,
            strokeWidth: strokeWidth,
            rounded: true
        };

        // Add the points from the array to the data attributes
        for (var p = 0; p < points.length; p += 1) {
            //add x point
            this.data['x' + (p + 1)] = points[p][0];
            //add y point
            this.data['y' + (p + 1)] = points[p][1];
        }
    }

    draw(canvas) {
        /* METHOD for drawing series of connected points
           @param:  canvas  canvas object   canvas to draw on
        */

        canvas.drawLine(this.data)
    }
}

class Vec2D {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    mag() {
        return Math.hypot(this.x, this.y);
    }

    add(other) {
        return new Vec2D(this.x + other.x, this.y + other.y);
    }

    sub(other) {
        return new Vec2D(this.x - other.x, this.y - other.y);
    }

    mult(other) {
        if (typeof (other) === "number") {
            return new Vec2D(this.x * other, this.y * other);
        }
        return new Vec2D(this.x * other.x, this.y * other.y);
    }

    dist(other) {
        return Math.hypot(this.x - other.x, this.y - other.y);
    }

    dot(other) {
        return (this.x * other.x) + (this.y * other.y);
    }

    rotate(angle, centre) {
        return new Vec2D(
            Math.cos(angle) * (this.x - centre.x) - Math.sin(angle) * (this.y - centre.y) + centre.x,
            Math.sin(angle) * (this.x - centre.x) + Math.cos(angle) * (this.y - centre.y) + centre.y
        );
    }
}


class Physics2D {
    constructor(size, gravity) {
        this.size = size;
        if (gravity) {
            this.gravity = gravity;
        } else {
            this.gravity = new Vec2D(0, -500); // px/s/s
        }
        this.objects = [];
        this.timeStep = 20 / 1000; // 20 ms

        this.edgeColliders = [
            // new EdgeCollider(new Vec2D(0, 1), -size.y / 2),
            // new EdgeCollider(new Vec2D(0, -1), -size.y / 2),
            new EdgeCollider(new Vec2D(1, 0), -size.x / 2),
            new EdgeCollider(new Vec2D(-1, 0), -size.x / 2)
        ];
    }

    fixedUpdate() {

        for (let phObject of this.objects) {
            if (!phObject.fixed) {
                phObject.newPos = phObject.position.add(phObject.velocity.mult(this.timeStep));
            }
        }

        // Process collisions
        for (let i = 0; i < this.objects.length - 1; i++) {
            for (let j = i + 1; j < this.objects.length; j++) {
                const a = this.objects[i];
                const b = this.objects[j];
                if (a.collider && b.collider && !(a.fixed && b.fixed)) {
                    const collision = a.collider.collide(b.collider);

                    if (collision) {

                        if (a.onCollision && typeof (a.onCollision) === "function") {
                            a.onCollision(b, collision);
                        }
                        if (b.onCollision && typeof (b.onCollision) === "function") {
                            b.onCollision(a, collision);
                        }
                        if (!collision.ignore) {

                            const n = collision.normal;
                            const t = new Vec2D(-n.y, n.x);
                            const a_n = n.dot(a.velocity);
                            const a_t = t.dot(a.velocity);
                            const b_n = n.dot(b.velocity);
                            const b_t = t.dot(b.velocity);

                            // Moving towards each other
                            const a_n2 = (a_n * (a.mass - b.mass) + 2 * b.mass * b_n) / (a.mass + b.mass);
                            const b_n2 = (b_n * (b.mass - a.mass) + 2 * a.mass * a_n) / (a.mass + b.mass);

                            if (!a.fixed) {
                                a.velocity = n.mult(a_n2).add(t.mult(a_t));
                                a.newPos = a.newPos.add(n.mult(collision.overlap / 2));
                            }
                            if (!b.fixed) {
                                b.velocity = n.mult(b_n2).add(t.mult(b_t));
                                b.newPos = b.newPos.add(n.mult(collision.overlap / -2));
                            }
                        }

                    }
                }
            }
        }
        // Move via fixed update
        for (let phObject of this.objects) {
            phObject.fixedUpdate();
        }
    }
}


class PhysicsObject {
    constructor(position, mass) {
        this.physics = null;
        this.render = null;
        this.collider = null;
        this.position = position;
        this.newPos = position;
        this.rotation = 0;
        this.mass = mass;
        this.velocity = new Vec2D(0, 0); // px/s
        this.forces = [];
        this.fixed = false;
        this.bounce = true;
        this.onFixedUpdate = null;
    }

    setRenderer(render) {
        render.parent = this;
        this.render = render;
    }

    setCollider(collider) {
        collider.parent = this;
        this.collider = collider;
    }

    onCollision(other) {

    }


    fixedUpdate() {

        this.edgeBounce();
        this.position = this.newPos;

        if (this.onFixedUpdate && typeof (this.onFixedUpdate) === "function") {
            this.onFixedUpdate.call(this);
        }
        if (!this.fixed) {
            this.velocity = this.velocity.add(this.physics.gravity.mult(this.physics.timeStep));
        }
    }

    edgeBounce() {
        for (let edgeCollider of this.physics.edgeColliders) {
            const collision = this.collider.collide(edgeCollider);
            if (collision) {

                // Bounce
                this.velocity = this.velocity.add(collision.normal.mult(-2 * this.velocity.dot(collision.normal)));

                // Inelastic collision
                //this.velocity = this.velocity.mult(0.9);

                // Continue move
                this.newPos = this.position.add(this.velocity.mult(this.physics.timeStep));
            }
        }
    }

    remove() {
        for (let i = 0; i < this.physics.objects.length; i++) {
            if (this.physics.objects[i] === this) {
                this.physics.objects.splice(i, 1);
                break;
            }
        }
    }
}


class Collider {
    constructor(finite, radius) {
        this.radius = radius;
        this.finite = finite;
    }

    checkRadius(other) {
        if (this.finite && other.finite) {
            const dist = this.parent.newPos.dist(other.parent.newPos);
            if (dist < this.radius + other.radius) {
                return true;
            }
        }
        return false;
    }
}


class Collision {
    constructor(location, normal, overlap, other) {
        this.location = location;
        this.normal = normal;
        this.overlap = overlap;
        this.other = other;
        this.ignore = false;
    }
}


class CircleCollider extends Collider {
    constructor(radius) {
        super(true, radius);
        this.type = "circle";
    }

    collide(other) {
        if (other.type === "circle") {
            if (this.checkRadius(other)) {
                const gap = this.parent.newPos.sub(other.parent.newPos);
                const normal = gap.mult(1 / gap.mag());
                const position = normal.mult(other.radius);
                const overlap = this.radius + other.radius - gap.mag();
                return new Collision(position, normal, overlap, other);
            }
        }
        if (other.type === "edge") {
            const normal = other.direction;
            const edge = normal.mult(other.offset);
            const project = edge.dot(this.parent.newPos) / other.offset - this.radius;
            if (project < other.offset) {
                return new Collision(this.parent.newPos, normal, 0, other);
            }

        }
        if (other.type === "box") {
            const collision = other.collide(this);
            if (collision) {
                collision.normal = collision.normal.mult(-1);
                collision.other = other;
            }
            return collision;
        }
        return null;
    }
}

class EdgeCollider extends Collider {
    constructor(direction, offset) {
        super(false, 0);
        this.type = "edge";
        this.direction = direction;
        this.offset = offset;
    }

    collide(other) {
        if (other.type === "circle") {
            const collision = other.collide(this);
            if (collision) {
                collision.normal = collision.normal.mult(-1);
                collision.other = other;
            }
            return collision;
        }
        if (other.type === "box") {
            //return other.collide(this);
        }
        return null;
    }
}

class BoxCollider extends Collider {
    constructor(width, height) {
        super(true, new Vec2D(width / 2, height / 2).mag());
        this.type = "box";
        this.width = width;
        this.height = height;
    }

    collide(other) {
        if (other.type === "circle") {
            if (this.checkRadius(other)) {
                let gap = this.parent.newPos.sub(other.parent.newPos);

                if (Math.abs(gap.y) < other.radius + this.height / 2) {
                    console.log(gap.y);
                    gap = new Vec2D(gap.x, gap.y - this.width * Math.abs(Math.sin(this.width / 2 / gap.x)))
                    const normal = gap.mult(1 / gap.mag());
                    const position = normal.mult(other.radius);
                    //const overlap = this.radius + other.radius - gap.mag();
                    return new Collision(position, normal, 20, other);
                }
            }
        }
        if (other.type === "edge") {
            return other.collide(this);
        }
        if (other.type === "box") {
            if (this.checkRadius(other)) {
            }
            return other.collide(this);
        }
        return null;
    }
}

class GameObject extends DrawingArea {
    constructor(xCoord, yCoord) {
        /* CONSTRUCTOR method for rectangle shape
        @inherits: 

        @param: xCoord, yCoord

        @attr:    xCoord    integer    x position of GameObject
        @attr:    yCoord    integer    y position of GameObject
 
        @method:      draw the object on the given canvas
        */
        this.xCoord = xCoord;
        this.yCoord = yCoord;
    }
}

class Player {
    constructor(xCoord, yCoord, xVelocity, yVelocity, health, hitboxX, hitboxY, sprite) {
        /* CONSTRUCTOR method for Player GameObject
        @inherits: xCoord, yCoord

        @param: xCoord, yCoord, xVelocity, yVelocity, health, hitboxX, hitboxY

        @attr:    xCoord    integer x coordinate of player
        @attr:    yCoord    integer y coordinate of player
        @attr:    xVelocity integer x velocity of player
        @attr:    yVelocity integer y velocity of player
        @attr:    health    integer number of health points
        @attr:    hitboxX   integer x coordinate of area which can be damaged
        @attr:    hitboxY   integer y coordinate of area which can be damaged
 
        @method:      draw the object on the given canvas
        @method:      move the character using arrow keys
        @method:      attack enemies reducing their health
        @method:      take damage when attack by enemies
        */

        //set extended attributes
        this.xCoord = xCoord;
        this.yCoord = yCoord
        this.xVelocity = xVelocity;
        this.yVelocity = yVelocity;
        this.health = health;
        this.hitbox = hitboxX;
        this.hitboxY = hitboxY;
        this.sprite = sprite;
    }

    moveByKey(keyCode) {
        switch (keyCode) {
            case 37:
                this.xCoord = this.xCoord - 15;
                console.log("left");
                break;
            case 38:
                this.yCoord = this.yCoord - 15;
                console.log("up");
                break;
            case 39:
                this.xCoord = this.xCoord + 15;
                console.log("right");
                break;
            case 40:
                this.yCoord = this.yCoord + 15;
                console.log("down");
                break;
        }
    }

    draw(canvas) {
        //draw the sprite
        this.sprite.draw(canvas, this.xCoord, this.yCoord)
    }

    reDraw(canvas) {

        //update the sprite
        this.sprite.update(this.xCoord, this.yCoord)
        
        //redraw the sprite
        this.sprite.draw(canvas, this.layer)
    }
}

class Sprite {
    constructor(source, xcoord, ycoord, layer, scale) {
        /* CONSTRUCTOR method for rectangle shape
           @inherit: strokeStyle, strokeWidth, x, y from shape
 
           @attr:    fillStyle    (hex)String  colour for fill
           @attr:    width        integer      width of rectangle
           @attr:    height       integer      height of rectangle
 
           @method: draw     draw the object on the given canvas
        */


        //set extended attributes
        this.source = source;
        this.xcoord = xcoord;
        this.ycoord = ycoord;
        this.layer = layer;
        this.scale = scale;

    }

    draw(canvas, x, y, layer) {
        /* METHOD for drawing image
           @param:  canvas  canvas object   canvas to draw on
 
        */

        this.xcoord = x
        this.ycoord = y

        //draw this object
        canvas.drawImage({
            source: this.source,
            x: this.xcoord,
            y: this.ycoord,
            layer: this.layer,
            scale: this.scale
        })
    }

    redraw(canvas, layer){
        
        //remove anything from this layer
        canvas.removeLayer(layer)

        //draw this object
        canvas.drawImage({
            source: this.source,
            x: this.xcoord,
            y: this.ycoord,
            layer: this.layer,
            scale: this.scale
        })
        
    }
    update(xcoord, ycoord){
        this.xcord = xcoord
        this.ycord = ycoord
    }

}

class Enemy extends GameObject {
    constructor(xCoord, yCoord, xVelocity, yVelocity, health, hitboxX, hitboxY, sprite) {
        /* CONSTRUCTOR method for Player GameObject
        @inherits: xCoord, yCoord

        @param: xCoord, yCoord, xVelocity, yVelocity, health, hitboxX, hitboxY

        @attr:    xCoord    integer x coordinate of player
        @attr:    yCoord    integer y coordinate of player
        @attr:    xVelocity integer x velocity of player
        @attr:    yVelocity integer y velocity of player
        @attr:    health    integer number of health points
        @attr:    hitboxX   integer x coordinate of area which can be damaged
        @attr:    hitboxY   integer y coordinate of area which can be damaged
 
        @method:      draw the object on the given canvas
        @method:      move the character using arrow keys
        @method:      attack the player reducing their health
        @method:      take damage when attacked by the player
        */

        //set inherited attributes
        super(xCoord, yCoord)

        //set extended attributes
        this.xVelocity = xVelocity;
        this.yVelocity = yVelocity;
        this.health = health;
        this.hitbox = hitboxX;
        this.hitboxY = hitboxY;
    }
}

class Elf extends Enemy {
    constructor(xCoord, yCoord, xVelocity, yVelocity, health, hitboxX, hitboxY) {
        /* CONSTRUCTOR method for Player GameObject
        @inherits: xCoord, yCoord

        @param: xCoord, yCoord, xVelocity, yVelocity, health, hitboxX, hitboxY

        @attr:    xCoord    integer x coordinate of player
        @attr:    yCoord    integer y coordinate of player
        @attr:    xVelocity integer x velocity of player
        @attr:    yVelocity integer y velocity of player
        @attr:    health    integer number of health points
        @attr:    hitboxX   integer x coordinate of area which can be damaged
        @attr:    hitboxY   integer y coordinate of area which can be damaged
 
        @method:      draw the object on the given canvas
        @method:      move the character using arrow keys
        @method:      attack the player reducing their health
        @method:      take damage when attacked by the player
        */

        //set inherited attributes
        super(xCoord, yCoord, xVelocity, yVelocity, health, hitboxX, hitboxY)
    }
}

class Spider extends Enemy {
    constructor(xCoord, yCoord, xVelocity, yVelocity, health, hitboxX, hitboxY) {
        /* CONSTRUCTOR method for Player GameObject
        @inherits: xCoord, yCoord

        @param: xCoord, yCoord, xVelocity, yVelocity, health, hitboxX, hitboxY

        @attr:    xCoord    integer x coordinate of player
        @attr:    yCoord    integer y coordinate of player
        @attr:    xVelocity integer x velocity of player
        @attr:    yVelocity integer y velocity of player
        @attr:    health    integer number of health points
        @attr:    hitboxX   integer x coordinate of area which can be damaged
        @attr:    hitboxY   integer y coordinate of area which can be damaged
 
        @method:      draw the object on the given canvas
        @method:      move the character using arrow keys
        @method:      attack the player reducing their health
        @method:      take damage when attacked by the player
        */

        //set inherited attributes
        super(xCoord, yCoord, xVelocity, yVelocity, health, hitboxX, hitboxY)
    }
}

class Scorpion extends Enemy {
    constructor(xCoord, yCoord, xVelocity, yVelocity, health, hitboxX, hitboxY) {
        /* CONSTRUCTOR method for Player GameObject
        @inherits: xCoord, yCoord

        @param: xCoord, yCoord, xVelocity, yVelocity, health, hitboxX, hitboxY

        @attr:    xCoord    integer x coordinate of player
        @attr:    yCoord    integer y coordinate of player
        @attr:    xVelocity integer x velocity of player
        @attr:    yVelocity integer y velocity of player
        @attr:    health    integer number of health points
        @attr:    hitboxX   integer x coordinate of area which can be damaged
        @attr:    hitboxY   integer y coordinate of area which can be damaged
 
        @method:      draw the object on the given canvas
        @method:      move the character using arrow keys
        @method:      attack the player reducing their health
        @method:      take damage when attacked by the player
        */

        //set inherited attributes
        super(xCoord, yCoord, xVelocity, yVelocity, health, hitboxX, hitboxY)
    }
}

class Trap extends Elf {
    constructor(xCoord, yCoord, hitboxX, hitboxY) {
        /* CONSTRUCTOR method for Player GameObject
        @inherits: xCoord, yCoord

        @param: xCoord, yCoord, xVelocity, yVelocity, health, hitboxX, hitboxY

        @attr:    xCoord    integer x coordinate of player
        @attr:    yCoord    integer y coordinate of player
        @attr:    hitboxX   integer x coordinate of area which can be damaged
        @attr:    hitboxY   integer y coordinate of area which can be damaged
 
        @method:      draw the object on the given canvas
        @method:      trigger the object when interacted with the player class

        */

        //set inherited attributes
        super(xCoord, yCoord, hitboxX, hitboxY)
    }

    trigger() {
        triggered = false
        if (Trap.hitboxX == Player.hitboxX & Trap.hitboxY == Player.hitboxY) {
            triggered = true
        }
    }
}

class Bomb extends Trap {
    constructor(xCoord, yCoord, hitboxX, hitboxY, time) {
        /* CONSTRUCTOR method for Player GameObject
        @inherits: xCoord, yCoord

        @param: xCoord, yCoord, xVelocity, yVelocity, health, hitboxX, hitboxY

        @attr:    xCoord    integer x coordinate of player
        @attr:    yCoord    integer y coordinate of player
        @attr:    hitboxX   integer x coordinate of area which can be damaged
        @attr:    hitboxY   integer y coordinate of area which can be damaged
        @attr:    time      integer time after triggered until explosion
 
        @method:      draw the object on the given canvas
        @method:      trigger the object when interacted with the player class

        */

        //set inherited attributes
        super(xCoord, yCoord, hitboxX, hitboxY)

        //set extended attributes
        this.time = time;
    }

    trigger() {
        triggered = false
        if (Trap.hitboxX == Player.hitboxX & Trap.hitboxY == Player.hitboxY) {
            triggered = true
        }
    }

    damagePlayer() {
        if (triggered) {
            Player.health = Player.health - 25
        }
    }

}

class Spiderweb extends Trap {
    constructor(xCoord, yCoord, hitboxX, hitboxY) {
        /* CONSTRUCTOR method for Player GameObject
        @inherits: xCoord, yCoord

        @param: xCoord, yCoord, xVelocity, yVelocity, health, hitboxX, hitboxY

        @attr:    xCoord    integer x coordinate of player
        @attr:    yCoord    integer y coordinate of player
        @attr:    hitboxX   integer x coordinate of area which can be damaged
        @attr:    hitboxY   integer y coordinate of area which can be damaged
 
        @method:      draw the object on the given canvas
        @method:      trigger the object when interacted with the player class
        @method:      decreaseVelocity of player when trap is triggered

        */

        //set inherited attributes
        super(xCoord, yCoord, hitboxX, hitboxY)
    }

    trigger() {
        triggered = false
        if (Trap.hitboxX == Player.hitboxX & Trap.hitboxY == Player.hitboxY) {
            triggered = true
        }
    }

    decreaseVelocity() {
        if (triggered) {
            Player.xVelocity = Player.xVelocity * 0.5
            Player.yVelocity = Player.yVelocity * 0.5
        }
    }
}

class Spikes extends Trap {
    constructor(xCoord, yCoord, hitboxX, hitboxY) {
        /* CONSTRUCTOR method for Player GameObject
        @inherits: xCoord, yCoord

        @param: xCoord, yCoord, xVelocity, yVelocity, health, hitboxX, hitboxY

        @attr:    xCoord    integer x coordinate of player
        @attr:    yCoord    integer y coordinate of player
        @attr:    hitboxX   integer x coordinate of area which can be damaged
        @attr:    hitboxY   integer y coordinate of area which can be damaged
 
        @method:      draw the object on the given canvas
        @method:      trigger the object when interacted with the player class
        @method:      attack the player reducing their health

        */

        //set inherited attributes
        super(xCoord, yCoord, hitboxX, hitboxY)
    }

    trigger() {
        triggered = false
        if (Trap.hitboxX == Player.hitboxX & Trap.hitboxY == Player.hitboxY) {
            triggered = true
        }
    }

    damagePlayer() {
        if (triggered) {
            Player.health = Player.health - 10
        }
    }
}

class Backgrounds extends GameObject {
    constructor() {

    }
}

let current; 

class Maze{
    constructor(size, rows, columns, ctx) {
        /* CONSTRUCTOR method for Maze
        @param: size, rows, columns

        @attr:    size    integer size of the maze
        @attr:    rows    integer number of rows in the maze
        @attr:    columns integer number of columns in the maze
        @attr:    grid    array   stores the maze
        @attr:    stack   array   stores the unvisited neighbours
 
        @method:      setup setup the maze as a grid
        @method:      draw the maze on the canvas
        */
        
        this.size = size;
        this.rows = rows;
        this.columns = columns;
        this.grid = [];
        this.stack = [];
        this.ctx = ctx;
    }

    setup(){
        //creating the rows
        for (let r = 0; r < this.rows; r++) {
            let row = []
            //creating columns
            for (let c = 0; c < this.columns; c++){
                //creating cells and pushing them to the rows
                let cell = new Cell(r, c, this.grid, this.size, this.ctx);
                row.push(cell);
            }
            //adding the rows to the grid
            this.grid.push(row);
        }
        //creating the starting point of the maze
        current = this.grid[0][0];
    }

    draw(){
        Maze.width = this.size;
        Maze.height = this.size;
        Maze.background = "black";
        current.visited = true;

        for (let r = 0; r < this.rows; r++){
            for (let c = 0; c < this.columns; c++){
                let grid = this.grid;
                grid[r][c].show(this.size, this.rows, this.columns);
            }
        }

        let next = current.checkNeighbours();

        if(next){
            next.visited = true;

            this.stack.push(current);

            current.highlight(this.columns);

            current.removeWalls(current, next);

            current = next;
        } else if (this.stack.length > 0) {
            let cell = this.stack.pop();
            current = cell;
            current.highlight(this.columns);
        }

        if (this.stack.length === 0) {
            return;
        }

        window.requestAnimationFrame(() => {
            this.draw();
        })
    }
}

class Cell {
    constructor(rowNum, columnNum, parentGrid, parentSize, ctx) {
        /* CONSTRUCTOR method for Cell
        @param: rowNum, columnNum, parentGrid, parentSize

        @attr:    rowNum     integer the number of a row
        @attr:    columnNum  integer the number of a column
        @attr:    parentGrid array   the maze as a grid
        @attr:    parentSize integer size of the maze
        @attr:    visited    boolean 
        @attr:    walls      dictionary 
 
        @method:      checkNeighbours checks which nodes have not been visited
        @method:      drawTopWall     draws the top Wall
        @method:      drawRightWall   draws the right Wall
        @method:      drawBottomWall  draws the bottom wall
        @method:      drawLeftWall    draws the left wall
        @method:      highlight       highlights the current node
        @method:      removeWalls     removes the wall when a neighbour is visited
        @method:      show            shows the maze
        */

        this.rowNum = rowNum;
        this.columnNum = columnNum;
        this.parentGrid = parentGrid;
        this.parentSize = parentSize;
        this.visited = false;
        this.walls = { 
            topWall    : true,
            rightWall  : true,
            bottomWall : true,
            leftWall   : true
        }
        this.ctx = ctx;
    }

    checkNeighbours(){
        let grid = this.parentGrid;
        let row = this.rowNum;
        let col = this.columnNum;
        let neighbours = [];

        let top    = row !== 0 ? grid[row-1][col] : undefined;
        let right  = col !== grid.length - 1 ? grid[row][col + 1] : undefined;
        let bottom = row !== grid.length - 1 ? grid[row + 1][col] : undefined;
        let left   = col !== 0 ? grid[row][col - 1] : undefined;

        if(top && !top.visited){
            neighbours.push(top)
        }        
        if(right && !right.visited){
            neighbours.push(right)
        }        
        if(bottom && !bottom.visited){
            neighbours.push(bottom)
        }        
        if(left && !left.visited){
            neighbours.push(left)
        }

        if(neighbours.length !== 0){
            let random = Math.floor(Math.random() * neighbours.length); 
            return neighbours[random]; 
        } else {
            return undefined;
        }
    }
    drawTopWall(x, y, size, columns, rows){
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x + size / columns, y);
        this.ctx.stroke();
    }

    drawRightWall(x, y, size, columns, rows){
        this.ctx.beginPath();
        this.ctx.moveTo(x + size / columns, y);
        this.ctx.lineTo(x + size / columns, y + size / rows);
        this.ctx.stroke();
    }

    drawBottomWall(x, y, size, columns, rows){
        this.ctx.beginPath();
        this.ctx.moveTo(x, y + size / rows);
        this.ctx.lineTo(x + size / columns, y + size / rows);
        this.ctx.stroke();
    }

    drawLeftWall(x, y, size, columns, rows){
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x, y + size / rows);
        this.ctx.stroke();
    }

    highlight(columns){
        let x = (this.columnNum * this.parentSize) / columns + 1; 
        let y = (this.rowNum * this.parentSize) / columns + 1;

        this.ctx.fillStyle = 'red'; 
        this.ctx.fillRect(x, y, this.parentSize / columns - 3, this.parentSize / columns - 3);
    }

    removeWalls(cell1, cell2){
        let x = cell1.columnNum - cell2.columnNum;

        if(x === 1){
            cell1.walls.leftWall = false;
            cell2.walls.rightWall = false;
        } else if (x === -1){
            cell1.walls.rightWall = false;
            cell2.walls.leftWall = false;
        }

        let y = cell1.rowNum - cell2.rowNum;

        if(y === 1){
            cell1.walls.topWall = false;
            cell2.walls.bottomWall = false;
        } else if (y === -1){
            cell1.walls.bottomWall = false;
            cell2.walls.topWall = false;
        }
    }

    show(size, rows, columns){
        let x = (this.columnNum * size) / columns;
        let y = (this.rowNum * size) / rows;

        this.ctx.strokeStyle = "yellow";
        this.ctx.fillStyle = "black";
        this.ctx.lineWidth = 2;

        if (this.walls.topWall) { 
            this.drawTopWall(x, y, size, columns, rows);
        }
        if (this.walls.rightWall) {
            this.drawRightWall(x, y, size, columns, rows);
        }
        if (this.walls.bottomWall) { 
            this.drawBottomWall(x, y, size, columns, rows);
        }
        if (this.walls.leftWall) { 
            this.drawLeftWall(x, y, size, columns, rows);
        }
        if (this.visited){
            this.ctx.fillRect(x + 1, y + 1, size / columns - 2, size / rows - 2);
        }
    }
} 