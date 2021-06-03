//Create variables here
var dog,dog1,happyDog;
var database,foodS,foodStock,foodimage,add,feed;




function preload()
{
	//load images here
  dog1 = loadImage("Dog.png");
  happyDog = loadImage("happy dog.png");
  
}




function setup() {
	createCanvas(500, 500);

  dog = createSprite(250,380);
  dog.addImage(dog1);
  dog.scale = 0.2;

  database = firebase.database();
  foodStock = database.ref("food");
  foodStock.on("value",readStock);

  add = createButton("ADD FOOD");
  add.position(400,140);
  add.mousePressed(addStock);

  foodimage = new Food();

  feed = createButton("FEED");
  feed.position(340,140);
  feed.mousePressed(deductStock);
}





function draw() { 
  
  
  background(46,139,87);
  foodimage.display();

  fill(255);
  textSize(25);
  stroke(255,0,0);
  text("Bottles remaining: "+foodS,10,120);
  fill(11,230,219);
 
  
  drawSprites();
}





function readStock(data){

foodS = data.val();
food.getStock(foodS);
}




function deductStock(){

  if(foodS<=1){
    foodS = 0;
  } else if(foodS>=0){
    foodS = foodS-1;
  }
  dog.addImage(happyDog);

  database.ref("/").update({
    food: foodS
  })
}



function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  database.ref("/").update({
    Food: foodObj.getFoodStock(),
    FeedTime : hour()

  })

}

function addStock(){

  if(foodS>=0 && foodS<20){
    foodS = foodS+1;
  }
  
dog.addImage(dog1);
  database.ref("/").update({
    food: foodS
  })
}