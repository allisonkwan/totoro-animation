// I will be instancing the blue totoro object.

let time = 0;  // track the passage of time, used to move the objects
let moveTotoroX = 0;
let moveTotoroY = 0;
let moveTotoroZ = 0;
let rotateTotoroY = 0;

let moveTreeY = 0;
let moveBlueTotoroX = 0;
let rotateBlueTotoroY = 0;

// called once at the start
function setup() {
  createCanvas(900, 900, WEBGL);
  
  let fov = 60.0;  // 60 degrees FOV
  perspective(PI * fov / 180.0, width / height, 0.1, 2000);
}

// this is called repeatedly to draw new per-frame images
function draw() {

  if (time > 20) {
    noLoop();
  }
  
  background(235, 226, 164);  // light blue background
  
  if (time < 1.5) {
    camera(0, 0, 180 - 6*time, 0, 0, 0, 0, 1, 0);  // from, at, up
  } else if (time >= 1.5 && time < 7) {
    camera(240 - 5*time, 0, 120 - 6*time, 0, 0, 0, 0, 1, 0); // looking in from right
  } else if (time >= 7 && time < 10.5) {
    camera(0, 0, 300 - 6*time, 0, 0, 0, 0, 1, 0);
  } else if (time >= 10.5 && time < 12) {
    camera(-300 + 5*time, 0, 150 - 6*time, 0, 0, 0, 0, 1, 0); // looking in from left
  } else if (time > 12) {
    camera(0, 0, 300 - 6*time, 0, 0, 0, 0, 1, 0);
  }
  
  // include some light even in shadows
  ambientLight(60, 60, 60);
  
  // set light position
  pointLight(255, 255, 255, 100, -100, 300);

  noStroke();

  // Totoro Tree
    push();
    translate(70, 0, -20);
    tree();
    pop();
  
  //sky
    fill(101,194,245);
    push();
    translate(0, -120, -50);
    box(600, 400, 10);
    pop();
    
  //grass
    fill(96, 179, 50);
    push();
    // 0, 55, 0
    translate(0, 55, 0);
    rotateX(radians(90));
    // 600, 110, 10
    box(600, 450, 10);
    pop();

  if (time <= 7 || time > 12) {
    push();
    translate(moveTotoroX, moveTotoroY, moveTotoroZ);
    rotateY(radians(rotateTotoroY));
    totoro();
    pop();
  } 
  
  if (time > 7 && time < 12) {
    push();
    translate(moveTotoroX, moveTotoroY, moveTotoroZ);
    if (time > 10) {
      rotateY(radians(rotateTotoroY));
    }
    totoro();
    pop();
  }

  if (time > 7) {
    // Tree 2
    fill(152, 214, 235);
    push();
    translate(-25, moveTreeY, -20);
    pinkTree();
    pop();

    // Tree 3
    fill(152, 214, 235);
    push();
    translate(-110, moveTreeY, -20);
    pinkTree();
    pop();
  }
  
  if (time > 10 && time <= 10.5) {
    push();
    translate(0, 20, 0);
    blueTotoro();
    pop();
        
    push();
    translate(-90, 20, 0);
    blueTotoro();
    pop();
  } 
           
  if (time > 10.5 && time <= 12) {
    let y_axis = createVector(0, 1, 0);
    push();
    translate(-10, 45 * sin(time) - 40, 0);
    rotate(radians(-time*85 + 50), y_axis);
    rotateY(radians(rotateBlueTotoroY));
    blueTotoro();
    pop();
        
    push();
    translate(-90, 45 * cos(time) - 40, 0);
    rotate(radians(-time*220 + 50), y_axis);
    rotateY(radians(rotateBlueTotoroY));
    blueTotoro();
    pop();
  } 

  if (time > 12 && time <= 14) {
    push();
    translate(moveBlueTotoroX, 20, 0);
    rotateY(radians(rotateBlueTotoroY));
    blueTotoro();
    pop();
        
    push();
    translate(moveBlueTotoroX - 30, 20, 0);
    rotateY(radians(rotateBlueTotoroY));
    blueTotoro();
    pop();
  }
  
  time += 0.01;  // update the time
}

function totoro() {

  if (time > 1 && time <= 1.5) {
    rotateTotoroY = 90;
  } else if (time > 1.5 && time <= 3.5) {
    moveTotoroX = (time * 30) - 15;
  } else if (time > 3.5 && time <= 4) {
    rotateTotoroY = 180;
  } else if (time > 4.5 && time <= 5) {
    moveTotoroZ = -time * 3.5;
  } else if (time > 5 && time <= 6.5) {
    moveTotoroY = (-time * 6.35) + 20;
  } else if (time > 6.5 && time <= 7) {
    rotateTotoroY = 0;
  } else if (time > 10 && time <= 12) {
    rotateTotoroY = 270;
  } else if (time > 12 && time <= 14) {
    moveTotoroX = -time * 45 + 600;
  } else if (time > 14 && time <= 15.75) {
    moveTotoroX = time * 43.5 - 600;
    rotateTotoroY = 90;
  } else if (time > 15.75) {
    rotateTotoroY = 0;
  }

  // main gray body
  // first push scales everything together
  push();
  scale(0.35);
  translate(0, 110, 0);

  fill(184, 184, 184);
  push();
  translate(0, 0);
  ellipsoid(23, 30, 13);
  pop();

  // lighter part of body
  fill(255, 255, 224);
  push();
  translate(0, 6, 11.3);
  ellipsoid(17, 18, 4);
  pop();

  // left curve
  fill(184, 184, 184);
  push();
  translate(-7.5, -3.2, 13.73);
  rotate(radians(-10));
  curvedShape();
  pop();

  // middle curve
  fill(184, 184, 184);
  push();
  translate(0, -4, 14);
  curvedShape();
  pop();

  // right curve
  fill(184, 184, 184);
  push();
  translate(7.5, -3, 13.73);
  rotate(radians(10));
  curvedShape();
  pop();

  // left arm
  fill(184, 184, 184);
  push();
  translate(-23, 0);
  rotate(radians(10));
  ellipsoid(5, 15, 3);
  pop();

  // right arm
  fill(184, 184, 184);
  push();
  translate(23, 0);
  rotate(radians(170));
  ellipsoid(5, 15, 3);
  pop();

  // left foot
  fill(184, 184, 184);
  push();
  translate(-7.5, 18, 12.5);
  rotate(radians(170));
  ellipsoid(5, 7, 2);
  pop();

  // right foot
  fill(184, 184, 184);
  push();
  translate(7.5, 18, 12.5);
  rotate(radians(10));
  ellipsoid(5, 7, 2);
  pop();

  // left ear
  fill(184, 184, 184);
  push();
  translate(-9, -32);
  rotate(radians(165));
  ellipsoid(4, 9, 2);
  pop();

  // right ear
  fill(184, 184, 184);
  push();
  translate(9, -32);
  rotate(radians(15));
  ellipsoid(4, 9, 2);
  pop();

  // left eye - white
  fill(255);
  push();
  translate(-7, -20.2, 8.5);
  sphere(2);
  pop();

  // right eye - white
  fill(255);
  push();
  translate(7, -20.2, 8.5);
  sphere(2);
  pop();

  // left eye - black
  fill(1);
  push();
  translate(-7, -20.2, 10);
  sphere(1);
  scale(0.85);
  pop();

  // right eye - black
  fill(1);
  push();
  translate(7, -20.2, 10);
  sphere(1);
  scale(0.85);
  pop();

  // nose
  fill(1);
  push();
  translate(0, -18.5, 11);
  ellipsoid(2, 0.7, 1);
  pop();

  // mouth
  fill(1);
  push();
  translate(0, -14.5, 11);
  ellipsoid(0.4, 0.4, 1);
  pop();

  // left top whisker
  fill(1);
  push();
  translate(-18, -20.2, 7);
  rotate(radians(10));
  ellipsoid(7, 0.3, 1);
  pop();

  // right top whisker
  fill(1);
  push();
  translate(18, -20.2, 7);
  rotate(radians(170));
  ellipsoid(7, 0.3, 1);
  pop();

  // left middle whisker
  fill(1);
  push();
  translate(-18, -18.2, 7);
  rotate(radians(5));
  ellipsoid(7, 0.3, 1);
  pop();

  // right middle whisker
  fill(1);
  push();
  translate(18, -18.2, 7);
  rotate(radians(175));
  ellipsoid(7, 0.3, 1);
  pop();

  // left bottom whisker
  fill(1);
  push();
  translate(-18, -15.7, 7);
  rotate(radians(-7));
  ellipsoid(7, 0.3, 1);
  pop();

  // right bottom whisker
  fill(1);
  push();
  translate(18, -15.7, 7);
  rotate(radians(-173));
  ellipsoid(7, 0.3, 1);
  pop();

  pop(); // additional pop for rotating section
}

function curvedShape() {
  beginShape();
  curveVertex(-6, 3);
  curveVertex(-3, -3);
  curveVertex(3, -3);
  curveVertex(3, 3);
  endShape();
}

function blueTotoro() {

  if (time >= 10.5 && time < 12) {
    rotateBlueTotoroY = 220;
  }
  if (time > 12) {
    moveBlueTotoroX = -time * 46 + 500;
    rotateBlueTotoroY = 270;
  }

  noStroke();
  push();
  scale(0.2);
  translate(-50, 110, 0);

  // main body
  fill(50, 106, 148);
  push();
  translate(0, 0);
  ellipsoid(23, 30, 13);
  pop();

  // lighter part of body
  fill(141, 148, 153);
  push();
  translate(0, 6, 11.3);
  ellipsoid(17, 18, 4);
  pop();

  // left curve
  fill(50, 106, 148);
  push();
  translate(-7.5, -3.2, 13.73);
  rotate(radians(-10));
  curvedShape();
  pop();

  // middle curve
  fill(50, 106, 148);
  push();
  translate(0, -4, 14);
  curvedShape();
  pop();

  // right curve
  fill(50, 106, 148);
  push();
  translate(7.5, -3, 13.73);
  rotate(radians(10));
  curvedShape();
  pop();

  // left arm
  fill(50, 106, 148);
  push();
  translate(-23, 0);
  rotate(radians(130));
  ellipsoid(5, 15, 3);
  pop();

  // right arm
  fill(50, 106, 148);
  push();
  translate(23, 0);
  rotate(radians(40));
  ellipsoid(5, 15, 3);
  pop();

  // left foot
  fill(50, 106, 148);
  push();
  translate(-7.5, 18, 12.5);
  rotate(radians(170));
  ellipsoid(5, 7, 2);
  pop();

  // right foot
  fill(50, 106, 148);
  push();
  translate(7.5, 18, 12.5);
  rotate(radians(10));
  ellipsoid(5, 7, 2);
  pop();

  // left ear
  fill(50, 106, 148);
  push();
  translate(-9, -32);
  rotate(radians(165));
  ellipsoid(4, 9, 2);
  pop();

  // right ear
  fill(50, 106, 148);
  push();
  translate(9, -32);
  rotate(radians(15));
  ellipsoid(4, 9, 2);
  pop();

  // left eye - white
  fill(255);
  push();
  translate(-7, -20.2, 8.5);
  sphere(2);
  pop();

  // right eye - white
  fill(255);
  push();
  translate(7, -20.2, 8.5);
  sphere(2);
  pop();

  // left eye - black
  fill(1);
  push();
  translate(-7, -20.2, 10);
  sphere(1);
  scale(0.85);
  pop();

  // right eye - black
  fill(1);
  push();
  translate(7, -20.2, 10);
  sphere(1);
  scale(0.85);
  pop();

  // nose
  fill(1);
  push();
  translate(0, -18.5, 11);
  ellipsoid(2, 0.7, 1);
  pop();

  // mouth
  fill(1);
  push();
  translate(0, -14.5, 11);
  ellipsoid(0.4, 0.4, 1);
  pop();

  pop(); // additional pop for rotating section
}

function tree() {

  // greenery
  fill(50, 135, 84);
  push();
  translate(0, -30, 0);
  ellipsoid(40, 30, 10);
  pop();
  
  // trunk
  fill(107, 70, 32);
  push();
  translate(0, 24, 0);
  cylinder(3, 50);
  pop();

  // branch left
  fill(107, 70, 32);
  push();
  translate(-5, 10, 0);
  rotate(radians(160));
  cylinder(2, 25);
  pop();

  // branch right (long)
  fill(107, 70, 32);
  push();
  translate(20, 30, 0);
  rotate(radians(75));
  cylinder(2.5, 40);
  pop();
}

function pinkTree() {

  if (time > 7 && time <= 10) {
    moveTreeY = -time * 23 + 230;
  }

  if (time > 14) {
    moveTreeY = time * 23 - 322;
  }

  // greenery
  fill(224, 181, 173);
  push();
  translate(0, -30, 0);
  ellipsoid(40, 30, 10);
  pop();
  
  // trunk
  fill(107, 70, 32);
  push();
  translate(0, 24, 0);
  cylinder(3, 50);
  pop();

  // branch left
  fill(107, 70, 32);
  push();
  translate(-5, 10, 0);
  rotate(radians(160));
  cylinder(2, 25);
  pop();

  // branch right (long)
  fill(107, 70, 32);
  push();
  translate(20, 30, 0);
  rotate(radians(75));
  cylinder(2.5, 40);
  pop();
}