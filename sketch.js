//Create variables here
var dog, happyDog, database, foodS, foodStock, foodObj;

var changeState, readState;

var bedroomImg, gardenImg, washroomImg, happyImg;

var gameState=["Hungry","Sleeping","Playing", "Bathing"];

function preload()
{
  //load images here
  dog=loadImage("images/dogImg.png");
  happyDog=loadImage("images/Happy.png");
  bedroomImg=loadImage("images/Bed Room.png");
  gardenImg=loadImage("images/Garden.png");
  washroomImg=loadImage("images/Wash Room.png");
  //happyImg=loadImage("images/happyDog.pnh");
}

function setup() {
  createCanvas(500, 500);
  
  database=firebase.database();
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  readState=database.ref('/');
  readState.on("value",function(data){ 
  
    gameState=data.val();
  })
}

function draw() {  
background(46,139,87);
//if(keyWentDown(UP_ARROW)){
//writeStock(foodS);
//dog.addImage(happyDog);
food = new display();
textSize(15);
fill("white");
stroke("black");

if(lastFed>=12){
  Text("Last Feed : "+ lastFed%12 + " PM", 350,30);
}else if(lastFed==0){
  Text("Last Feed : 12 AM", 350,30);
}else{
  Text("Last Feed : "+ lastfed + " AM", 350,30);
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
  dog.remove();
}else{
  feed.show();
  addFood.show();
  dog.addImage(sadDog);
}
drawSprites();
}



 
  //add styles here
//Text("Note: Press UP_ARROW Key to Feed Drago Milk!");



function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  database.ref('/').update({
    Food:x
  })
}

function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function update(state){
  database.ref('/').update({
    gameState:state
  })
}

