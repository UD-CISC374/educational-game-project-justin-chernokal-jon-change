import ExampleObject from '../objects/exampleObject';
import AddTower from '../objects/addTower';
import SubTower from '../objects/subTower';
import EnemyObject from '../objects/enemyObject';

export default class MainScene extends Phaser.Scene {
  private exampleObject: ExampleObject;
  enemyObject: Phaser.Physics.Arcade.Sprite;
  enemyObject2: Phaser.Physics.Arcade.Sprite;
  enemyObject3: Phaser.Physics.Arcade.Sprite;
  enemyObject0: Phaser.Physics.Arcade.Sprite;

  data: Phaser.Data.DataManager;

  addTower: Phaser.Physics.Arcade.Sprite;
  subTower: Phaser.Physics.Arcade.Sprite;
  path: Phaser.Curves.Path;

  towersAdd: Phaser.Physics.Arcade.Group;
  towersSub: Phaser.Physics.Arcade.Group;
  enemies: Phaser.Physics.Arcade.Group;

  towerAddCount = 0;
  towerSubCount = 0;

  textAddTowerLabel;
  textSubTowerLabel;

  towerAddValue = 1;
  towerSubValue = 1;
  

  enemyAddLabel;
  enemySubLabel;
  enemyObjectValue = 1;





  // enemy path = -1; open tower slot = 0; blocked/used tower slot = 1
  map = [[1,1,1,1,1,-1,1,1,1,1],
         [1,1,1,1,1,-1,1,1,1,1],
         [1,1,1,1,1,-1,1,1,1,1],
         [1,1,1,1,0,-1,1,1,1,1],
         [1,1,1,1,1,-1,1,1,1,1],
         [1,1,1,1,1,-1,1,1,1,1],
         [1,1,1,1,2,-1,1,1,1,1],
         [1,1,1,1,1,-1,1,1,1,1]];
  

  constructor() {
    super({ key: 'MainScene' });
  }

 //ENEMY SPAWN x = 352 y = 0

  create() {
    this.exampleObject = new ExampleObject(this, 0, 0);

    /* Hash table */
    //stores number sprite keys
    this.data.set('0', 'enemy0');
    this.data.set('1', 'enemy1');
    this.data.set('2', 'enemy2');
    this.data.set('3', 'enemy3');


    /* PATH */
    //graphics used for path visualization: background
    var graphics = this.add.graphics();
    graphics.fillStyle(0x000000, 1);
    graphics.beginPath();
    graphics.moveTo(0, 0);
    graphics.lineTo(this.scale.width, 0);
    graphics.lineTo(this.scale.width, 512);
    graphics.lineTo(0, 640);
    graphics.lineTo(0, 0);
    graphics.closePath();
    graphics.fillPath();

    //path declaration for enemies
    this.path = new Phaser.Curves.Path(352, -32);
    this.path.lineTo(352, 544);

    //graphics used for path visualization: line
    graphics.lineStyle(3, 0xffffff, 1);
    this.path.draw(graphics);


    /* GRID */
    var graphics = this.add.graphics();
    //drawGrid function is defined below the update function
    this.drawGrid(graphics);

    /*TEXT*/
    //Text labels
    this.add.text(20, 5, "Click the specified location to place a tower.", {font: "15px Arial", fill: "white"});
    this.add.text(20, 30, "Towers will add the value on left to the", {font: "15px Arial", fill: "white"});
    this.add.text(20, 45, "moving objects.", {font: "15px Arial", fill: "white"});
    this.add.text(20, 70, 'Change the tower value by clicking', {font: "15px Arial", fill: "white"});
    this.add.text(20, 85, '"MORE" and "LESS".', {font: "15px Arial", fill: "white"});
    this.add.text(20, 150, "Objective: Make Enemy = 3", {font: "20px Arial", fill: "red"});
    this.add.text(260, 330, "Click to", {font: "10px Arial", fill: "white"});
    this.add.text(260, 350, "Place Tower", {font: "10px Arial", fill: "white"});

    this.enemyAddLabel = this.add.bitmapText(400, 215, "pixelFont", ' = ', 36);
    this.enemySubLabel = this.add.bitmapText(400, 400, "pixelFont", ' = ', 36);


    /*Enemy*/
    //spawn
    this.enemyObject0 = new EnemyObject(this, 352, -460, "enemy0");
    this.enemyObject = new EnemyObject(this, 352, -10, "enemy1");
    this.enemyObject2 = new EnemyObject(this, 352, -160, "enemy2");
    this.enemyObject3 = new EnemyObject(this, 352, -310, "enemy3");
   
    
    
    this.enemies = this.physics.add.group();
    this.enemies.add(this.enemyObject0);
    this.enemies.add(this.enemyObject);
    this.enemies.add(this.enemyObject2);
    this.enemies.add(this.enemyObject3); 
    this.enemyObject.data.set("value", 1);
    this.enemyObject2.data.set("value", 2);
    this.enemyObject3.data.set("value", 3);
    this.enemyObject0.data.set("value",0);


    //Number tower Collision - Add
    this.enemyObject.data.set("collideAdd", "true");
    this.enemyObject2.data.set("collideAdd", "true");
    this.enemyObject3.data.set("collideAdd", "false");
    this.enemyObject0.data.set("collideAdd", "true");

    //Number tower Collision - Sub
    this.enemyObject.data.set("collideSub", "true");
    this.enemyObject2.data.set("collideSub", "true");
    this.enemyObject3.data.set("collideSub", "false");
    this.enemyObject0.data.set("collideSub", "true");

    /* Tower Group */
    this.towersAdd = this.physics.add.group();
    this.towersSub = this.physics.add.group();
    

    /* Overlap Physics */
    this.physics.add.overlap(this.towersAdd, this.enemies, this.towerAdd, function (tower,enemy) {
    },
    this);
    
    this.physics.add.overlap(this.towersSub, this.enemies, this.towerSub, function (tower,enemy) {
    },
    this);

    console.log(this.enemies.getFirst());

  }

  /*Update*/
  update() {

    this.moveEnemy();
    this.killEnemy3();
    this.respawnEnemy();
    this.endScene();

    if (this.game.input.activePointer.isDown) {
      this.placeTower();

    }

    if (this.towerAddCount > 0) {
      this.textAddTowerLabel.text = this.towerAddValue;
    }

    if (this.towerSubCount > 0) { 
      this.textSubTowerLabel.text = this.towerSubValue;
    }
    
  }


  drawGrid(graphics){
    graphics.lineStyle(1, 0x0000ff, 0.8);
    for(var i = 0; i < 8; i++) {
      graphics.moveTo(0, i* 64);
      graphics.lineTo(640, i * 64);
    }
    for(var j = 0; j < 10; j++) {
      graphics.moveTo(j*64, 0);
      graphics.lineTo(j * 64, 512);
    }
    graphics.strokePath();
  }

  /* Enemy Update Functions */
  moveEnemy(){
    this.enemies.incY(1);
  }

  killEnemy3(){
    for(let enemy of this.enemies.getChildren()){
      if ( (enemy as EnemyObject).y >= this.scale.height){
        if( (enemy as EnemyObject).data.get("value") == 3  ){
          (enemy as EnemyObject).setActive(false);
          (enemy as EnemyObject).destroy();
        }  
      }
    }
  }

  respawnEnemy(){

    
    for(let enemy of this.enemies.getChildren()){
      if ( (enemy as EnemyObject).y >= this.scale.height){
          (enemy as EnemyObject).y = -32 
          enemy.data.set("collide", "true");
      }
    }
  }


  endScene(){
    if (this.enemies.getTotalUsed() == 0){

      this.map[3][4] = 0;
      this.map[6][4] = 0;
      this.scene.start('StartScene');
    }
  }



  /* Tower Interaction */
  placeTower() {
    var i = Math.floor(this.input.mousePointer.y/64);
    var j = Math.floor(this.input.mousePointer.x/64);

    if(this.map[i][j] === 0) {

      var x = j * 64 + 64;
      var y = i * 64 + 32;

      //this.exampleTower = this.physics.add.sprite(0,0,"exampleTower");
      var tower = new AddTower(this,i,j,this.map);

      this.towersAdd.add(tower);

      this.map[i][j] = 1;

      this.towerAddCount += 1;
     
    }

    if(this.map[i][j] === 2) {

      var x = j * 64 + 64;
      var y = i * 64 + 32;

      //this.exampleTower = this.physics.add.sprite(0,0,"exampleTower");
      var tower = new SubTower(this,i,j,this.map);

      this.towersSub.add(tower);

      this.map[i][j] = 1;

      this.towerSubCount += 1;
     
    }

    //this.physics.add.overlap(this.tower, this.enemyObject, this,)

    
    
    
  }

  towerAddValueUp() {
    if(this.towerAddValue >= 3) {
      this.towerAddValue = 3;
    }

    else {
      ++this.towerAddValue;
    }
  }

  towerAddValueDown() {
    if(this.towerAddValue <= 0) {
      this.towerAddValue = 0;
    }

    else {
      --this.towerAddValue;
    }
  }

  towerSubValueUp() {
    if(this.towerSubValue >= 3) {
      this.towerSubValue = 3;
    }

    else {
      ++this.towerSubValue;
    }
  }

  towerSubValueDown() {
    if(this.towerSubValue <= 0) {
      this.towerSubValue = 0;
    }

    else {
      --this.towerSubValue;
    }
  }



  towerAdd(tower, enemy) {

    if(enemy.data.get("collideAdd") ==  "true"){

      let eo: EnemyObject = enemy as EnemyObject; 

      if(this.towerAddValue != 0){
      
      enemy.setActive(false);

      let enemyObjectValue = this.towerAddValue + eo.data.get('value');
      var key = enemyObjectValue.toString();
      
      //call to make new number
      this.enemyChange(eo.x, eo.y, eo.data.get('value'), key);

      //destroy old number
      enemy.destroy();
    

      //update "Enemy" value (right now adds the differnce between old and new numbers)
      this.enemyAddLabel.setText(' = ' + key, 36);
      }

      if(this.towerAddValue == 0) {
        this.enemyAddLabel.setText(' = ' + eo.data.get('value'), 36);
      }
    }     
  }

  towerSub(tower, enemy) {

    if(enemy.data.get("collideSub") ==  "true"){

      let eo: EnemyObject = enemy as EnemyObject; 

      if(this.towerSubValue != 0){
      
      enemy.setActive(false);

      let enemyObjectValue = eo.data.get('value') - this.towerSubValue;
      var key = enemyObjectValue.toString();
      
      //call to make new number
      this.enemyChangeSub(eo.x, eo.y, eo.data.get('value'), key);

      //destroy old number
      enemy.destroy();
    

      //update "Enemy" value (right now adds the differnce between old and new numbers)
      this.enemySubLabel.setText(' = ' + key, 36);
      }

      if(this.towerSubValue == 0) {
        this.enemySubLabel.setText(' = ' + eo.data.get('value'), 36);
      }
    }     
  }


  //Creates new nubmer object addition

  enemyChange(posX, posY, currVal, key){
    var numNew = (this.towerAddValue + currVal);

    let newEnemy: EnemyObject = new EnemyObject(this, posX, posY, this.data.get(key)); 
    this.enemies.add(newEnemy);
    newEnemy.data.set("value", numNew);
    newEnemy.data.set("collideAdd", "false");
    newEnemy.data.set("collideSub", "true");
  }

  //Creates new nubmer object subtraction
  enemyChangeSub(posX, posY, currVal, key){
    var numNew = (this.towerSubValue + currVal);

    let newEnemy: EnemyObject = new EnemyObject(this, posX, posY, this.data.get(key)); 
    this.enemies.add(newEnemy);
    newEnemy.data.set("value", numNew);
    newEnemy.data.set("collideSub", "false");
    newEnemy.data.set("collideAdd", "true");
  }

}
