class Food{
    constructor() {
         this.foodStock=20,
         this.lastFed=0,
         this.image = loadImage("images/Milk.png");
    }
    

    getFoodStock() {
    return this.foodStock;
    }

    updateFoodStock(value) {
        this.foodStock=value;
    }

    //deductFood();

    bedroom(){
        background(bedroomImg,550,500);
    }
    garden(){
        background(gardenImg,550,500);
    }
    washroom(){
        background(washroomImg,550,500);
    }

    display() {
        var x=80,y=100;
        
        imageMode(CENTER);
        image(this.image,720,220,70,70);

        if(this.foodStock!=0){
            for(var i=0;i<this.foodStock;i++){
                if(i%10==0){
                    x=80;
                    y=y+50;
                }
           image(this.image,x,y,50,50);
           x=x+30;
            }
    }
    }
}