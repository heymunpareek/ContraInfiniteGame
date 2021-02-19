//press x to shoot, space to jump
//you can shoot the fireblocks or the red cannons to defend


var contra, contraAnimation, contrashooting;
var infinitegroundImg, infground;
var shooterImg, shooter, shooterGrp;
var bomb1, bomb1Grp;
var block, blockImg, blockGrp;
var bullet, bulletGrp;
PLAY = 1;
END=0;
var gs = PLAY;
var scoreCounter = 0;
var jumpSound, dieSound, checkPoint;

function preload(){
  contraAnimation = loadAnimation("firstmov.png","secondmov.png", "thirdmov.png", "fourthmov.png", "fifthmov.png");
  contrashooting = loadAnimation("contrashooting.png");
  infinitegroundImg = loadImage("infiniteground.png");
  blockImg = loadImage("block.png");
  shooterImg = loadImage("shooter.png");
  jumpSound = loadSound("jump.mp3");
  dieSound = loadSound("die.mp3");
  checkPoint = loadSound("checkPoint.mp3");
}

function setup() {
   createCanvas(400,400);
   contra = createSprite(50,200,10,10);
   contra.addAnimation("contra", contraAnimation);
  contra.addAnimation("shooting", contrashooting);
   contra.scale = 0.15;
  
   infground = createSprite(400,380,400,100);
   infground.addImage("infground", infinitegroundImg);
   
  
   contra.velocityY = contra.velocityY + 0.8; //gravity
  

  
  bomb1Grp = new Group();
  blockGrp = new Group();
  bulletGrp = new Group();
  shooterGrp = new Group();
}

function draw() {
   background("black");
   //contra.debug = true;
   //infground.debug = true;
         infground.setCollider("rectangle",0,0,infground.width,25);
    if(gs === PLAY) {
      contra.collide(infground);
      
     //infinite scrolling background
     if (infground.x < 0) {
       infground.x = width/2;
       }
      
    if(bulletGrp.isTouching(blockGrp)) {
    blockGrp.destroyEach();
    bulletGrp.destroyEach();
  }
  if(bulletGrp.isTouching(bomb1Grp)) {
    bomb1Grp.destroyEach();
    bulletGrp.destroyEach();
  }
      spawnShooter();
  spawnBlock();  
  shoot();
  jump();
  infground.velocityX = -(6 + scoreCounter/100);
//console.log("ground: " + infground.velocityX);
  bomb1Grp.bounceOff(infground);
  drawSprites();
  fill("white");
  text("Score: " +scoreCounter, 300, 50);
  scoreCounter = Math.round((scoreCounter + getFrameRate()/60));
}
  else if(gs === END) {
    contra.destroy();
    blockGrp.destroyEach();
    bulletGrp.destroyEach();
    bomb1Grp.destroyEach();
    shooterGrp.destroyEach();
    infground.destroy();
  }
    
    
   
  
  infground.depth = contra.depth;
  contra.depth = contra.depth+1;
  if(blockGrp.isTouching(contra) || bomb1Grp.isTouching(contra)) {
    dieSound.play();
    gs = END;
  }
  if(scoreCounter % 100 ===0 && scoreCounter > 0) {
    checkPoint.play();
  }
  
  
  
  
  
   drawSprites();
  
  if(gs === END) {
    fill("white");
    textSize(20);
    text("GAME OVER", 160,200);
  }
}

function spawnShooter() {
  if (frameCount % 500 === 0) {
  shooter = createSprite(400,Math.round(random(50,150)));
  shooter.addImage("shooter", shooterImg);
  shooter.scale = 0.5;
  shooter.velocityX = -(6 + scoreCounter/100);
  shooter.lifetime = 150;
  shooterGrp.add(shooter);
    
    bomb1 = createSprite(400,shooter.y,10,10);
    bomb1.velocityX = -(6 + scoreCounter/100);
    bomb1.shapeColor="red";
    bomb1.velocityY = 3;
    
    bomb1.lifetime = 200;
    
    bomb1Grp.add(bomb1);
  }
}

function spawnBlock() {
  if(frameCount % 100 === 0) {
    block = createSprite(400,350);
    block.addImage("block",blockImg);
    block.scale = 0.5;
    block.velocityX = -(6 + scoreCounter/100);
    //console.log(block.velocityX);
    block.lifetime = 150;
    
    blockGrp.add(block);
  }
}

function shoot() {
  if(keyWentDown("x")) {
    contra.changeAnimation("shooting", contrashooting);
    bullet = createSprite(contra.x,contra.y,7,2);
    bullet.shapeColor = "blue";
    bullet.velocityX = 20;
    bullet.lifetime = 20;
    bulletGrp.add(bullet);
  }
  else {
    contra.changeAnimation("contra", contraAnimation);
  }
}
function jump() {
  if(keyDown("space") && contra.y >= 340) {
    contra.velocityY = contra.velocityY-12;
    jumpSound.play();
    
  }
  else
    {
      contra.velocityY = contra.velocityY + 0.8;
     
    }
}