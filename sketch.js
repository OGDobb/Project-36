//Create variables here
var dog, happyDog, database, foodS, foodStock, foodObj, sadDog, dogImg;

var changeState, readState;

var bedroomImg, gardenImg, washroomImg, happyImg;

var lastFed;

var gameState=["Hungry","Sleeping","Playing", "Bathing"];

function preload()
{
  //load images here
  dogImg=loadImage("Images/Dog.png");
  sadDog=loadImage("Images/deadDog.png")
  happyDog=loadImage("Images/Happy.png");
  bedroomImg=loadImage("Images/Bed Room.png");
  gardenImg=loadImage("Images/Garden.png");
  washroomImg=loadImage("Images/Wash Room.png");
  //happyImg=loadImage("images/happyDog.pnh");
}

function setup() {
  createCanvas(600, 500);

  foodObj = new Food();

  dog=createSprite(250, 250, 50, 50);
  dog.addImage("dog", dogImg);
  dog.addImage("happyDog", happyDog);
  dog.scale=0.2;
  
  database=firebase.database();
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  readState=database.ref('gameState');
  readState.on("value",function(data){
  
    gameState=data.val();
  
  })
  feedTimeRef=database.ref("FeedTime")
  feedTimeRef.on("value", function(data){
    lastFed=data.val();
  })
}

function draw() {  
background(46,139,87);
textSize(15);
fill("white");
stroke("black");

if(lastFed>=12){
  text("Last Feed : "+ lastFed%12 + " PM", 350,30);
}else if(lastFed==0){
  text("Last Feed : 12 AM", 350,30);
}else{
  text("Last Feed : "+ lastFed + " AM", 350,30);
}

currentTime=hour();
if(currentTime==(lastFed+1)){
  update("Playing");
  foodObj.garden();
}
else if(currentTime==(lastFed+2)){
  update("Sleeping");
  foodObj.bedroom();
}
else if(currentTime==(lastFed+3)){
  update("Bathing");
  foodObj.washroom();
}
else{
  update("Hungry");
  foodObj.display();
}

if(gameState!="Hungry"){
  feed.hide();
  addFood.hide();
  dog.visible=false;
}else{
  feed.show();
  addFood.show();
  dog.visible=true;
  dog.addImage(sadDog);
}
drawSprites();
}



 
  //add styles here
//Text("Note: Press UP_ARROW Key to Feed Drago Milk!");



function readStock(data){
  foodObj.foodStock=data.val();
}

function writeStock(x){
  database.ref('/').update({
    Food:x
  })
}

function feedDog(){
  dog.changeImage("happyDog");

  if(foodObj.foodStock>0) {

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}
}

function addFoods(){
  foodObj.foodStock++;
  database.ref('/').update({
    Food:foodObj.foodStock
  })
}

function update(state){
  database.ref('/').update({
    gameState:state
  })
}

