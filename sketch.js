
var monkey,monkey_running,moving;
var ground,groundImage;
var banana,bananaImage,bananaGroup;
var obstacle,obstacleImage,obstacleGroup, invisibleGround;
var score = 0;
var bg, bgImg

var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameOver = "nice try";
var survivalTime

function preload(){
 
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
bananaImage = loadImage("banana.png");  
obstacleImage = loadImage("obstacle.png");  
 bgImg = loadImage("j.jpg")
 
}


function setup() {
  createCanvas(600,400);

  
  
  bg = createSprite(300,300,600,600)
  bg.addImage("bg", bgImg)
  bg.velocityX = -3
  
  ground=createSprite(400,355,900,5);
  ground.shapeColor ="black"
  
  
 
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  
  bananaGroup = createGroup();
  obstacleGroup = createGroup();
  invisibleGround = createSprite(400,360,900,10);
  invisibleGround.visible = false;

 
  
  
}


function draw() {
  background("white");

  
  if(keyDown("space")&& monkey.y >= 200)
     {
     monkey.velocityY=-10;
     }
  gameOver.depth = bg.depth
  bg.depth = bg.depth -1
   
  
  
  monkey.velocityY = monkey.velocityY+0.8;
  
  if (bg.x < 0)
  {
    bg.x = bg.width/2;
  }
  food();
  spawnRocks();

  if(gameState===PLAY){
    gameOver.visible=false;

  if(bananaGroup.isTouching(monkey)){
      
    bananaGroup.destroyEach();
    survivalTime = survivalTime+2;
  }
}
    if (obstacleGroup.isTouching(monkey)) {
     gamestate=END
     obstacleGroup.destroyEach();
  
  } if(gameState===END){
    
    monkey.destroy();
    ground.destroy();
    bananaGroup.destroyEach();
    obstacleGroup.destroyEach();
    gameover.visible=true;
    stroke("black");
    textSize(20);
    fill("black");
    text("Gameover: " + gameover,180,200);

    
  }
  
  
 
  
         
 
  monkey.collide( invisibleGround);
  drawSprites();
  
  stroke("black");
  textSize(20);
  fill("black");
  text("SCORE:", + score, 30,10)
  
  
  fill("black")
  text("SURVIVAL TIME", + survivalTime, 50, 30)
  
  
   
}

     
function food(){
  
   if(World.frameCount%80==0){
 
  banana = createSprite(300,130,20,20);
  banana.addImage(bananaImage); 
  banana.scale=0.1;
  banana.y = Math.round(random(120,200));
  banana.velocityX=-5;
  banana.lifetime=150;

  bananaGroup.add(banana);  
      
  }
}
function spawnRocks(){
  
  if(World.frameCount%60==0){
    obstacle = createSprite(400,330,10,40);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.1;
    obstacle.velocityX=-5;
    obstacle.lifetime=150;
    obstacleGroup.add(obstacle);

  }
}
