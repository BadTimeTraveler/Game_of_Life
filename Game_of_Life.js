let cols;
let rows;
let resolution = 10;

//For recording gifs
let elapsedFrames;
let recording;
let numFrames;

let canvas;


function GenerateGrid(cols, rows) {
  //makes a 2d array and initalizes values to 0
  let grid = new Array(cols);
  for (let i=0; i<grid.length; i++) {
    grid[i] = new Array(rows);
  }

  for (let i=0; i<cols; i++) {
    for (let j=0; j<rows; j++) {
      grid[i][j] = 0;
    }
  }

  
  return grid;
}

function RandomStart(grid){
  //Random start
  //fill with booleans
  for (let i=0; i<cols; i++) {
    for (let j=0; j<rows; j++) {
      grid[i][j] = floor(random(2));
    }
  }
}

function GosperGliderGun(grid){
  //Gosper's Glider Gun
  
  for (let i=0; i<cols; i++) {
    for (let j=0; j<rows; j++) {
      grid[i][j] = 0;
    }
  }
  
  grid[1][5] = 1;
  grid[2][5] = 1;
  grid[1][6] = 1;
  grid[2][6] = 1;
  
  grid[13][3] = 1;
  grid[14][3] = 1;
  grid[12][4] = 1;
  grid[16][4] = 1;
  grid[11][5] = 1;
  grid[17][5] = 1;
  grid[11][6] = 1;
  grid[15][6] = 1;
  grid[17][6] = 1;
  grid[18][6] = 1;
  
  grid[17][7] = 1;
  grid[11][7] = 1;
  grid[16][8] = 1;
  grid[12][8] = 1;
  grid[14][9] = 1;
  grid[13][9] = 1;

  grid[25][1] = 1;
  grid[23][2] = 1;
  grid[25][2] = 1;
  grid[21][3] = 1;
  grid[22][3] = 1;
  grid[21][4] = 1;
  grid[22][4] = 1;
  grid[21][5] = 1;
  grid[22][5] = 1;
  grid[23][6] = 1;
  grid[25][6] = 1;
  grid[25][7] = 1;
  
  grid[35][3] = 1;
  grid[36][3] = 1;
  grid[35][4] = 1;
  grid[36][4] = 1;
}

function setup() {
  canvas = createCanvas(600, 400);

  //size of grid is determined by the size of the canvas divided by the resolution
  cols = width/resolution;
  rows = height/resolution;

  grid = GenerateGrid(cols, rows);
  
  //initialized the grid with random values.
  RandomStart(grid);
  //initalize the grid with Gosper's Glider gun.
  //GosperGliderGun(grid);
 

  //low framerate set for recording gifs and to make the animation easier to follow along. Comment out to set back to p5js default of 60fps
  frameRate(6);
  
  //For recording gifs
  //elapsedFrames = 0;
  //recording = false;
  //numFrames = 120;
}


function neighbors(grid, x, y) {
  //calculate the number of live neighbors for a given cell [x,y]
  let sum = 0;
  
  for(let i=-1; i<2; i++){
    for(let j=-1; j<2; j++) {
      ////Edges wrap around, to change how the edges behave, uncomment lines 123-125, comment out lines 128-133
      //let col = (x+i+cols) % cols;
      //let row = (y+j+rows) % rows;
      //sum += grid[col][row];
      
      //Edges don't wrap
      try {
        sum += grid[x+i][y+j];
      }
      catch(err) {
        //sum+=10;
      }
      
    }
  }
  sum -= grid[x][y];
  return sum;
}


function draw() {
  background(0);
  //draw only the living cells on a black background
  for(let i=0; i<cols; i++){
    for(let j=0; j<rows; j++) {
      if (grid[i][j]){
        fill(255);
        stroke(0);
        rect(i* resolution, j*resolution, resolution-1, resolution-1);
      }      
    }
  }  
  //create a new grid to hold the next frames values
  let nextgrid = GenerateGrid(cols, rows);
  //loop through grid
  for(let i=0; i<cols; i++){
    for(let j=0; j<rows; j++) {
      //calculate neighbors for each cell
      let count = neighbors(grid, i, j);
      
      //Rules to determine if a cell lives or dies
      if (!grid[i][j] && count==3){
        nextgrid[i][j] = 1;
      } else if (grid[i][j] && (count<2 || count>3)){
        nextgrid[i][j] = 0;
      } else {
        nextgrid[i][j] = grid[i][j];
      }

    }
  }
  
  //For recording gifs
  //if (recording){
    
  //  elapsedFrames++;
  //  //print(elapsedFrames);
  //  saveCanvas(canvas, 'GoL-' + nf(elapsedFrames, 3), 'png');
    
  //  if(elapsedFrames >= numFrames) {
  //   recording = false; 
     
  //  }
  //}
  
  //update current grid
  grid = nextgrid;
  
  
}


function keyPressed(){
  //detects when a key has been pressed
  //r resets the grid to random values
  //g resets the grid to Gosper's Glider Gun
  //1-6 adjust the framerate from 10-60fps in increments of 10fps
 if (key == "r"){
   RandomStart(grid);
    
   //For recording gifs
   //recording = true;
   //elapsedFrames = 0;

 }
 if (key == 'g'){
   GosperGliderGun(grid);
 }
 
 if (key == '1'){
    frameRate(10);
 }
 if (key == '2'){
    frameRate(20);
 }
 if (key == '3'){
    frameRate(30);
 }
 if (key == '4'){
    frameRate(40);
 }
 if (key == '5'){
    frameRate(50);
 }
 if (key == '5'){
    frameRate(60);
 }
 
}
