import ExampleObject from '../objects/exampleObject';
import ExampleTower from '../objects/exampleTower';
import EnemyObject from '../objects/enemyObject';

export default class MainScene extends Phaser.Scene {
  private exampleObject: ExampleObject;
  enemyObject: Phaser.Physics.Arcade.Sprite;
  enemyObject2: Phaser.Physics.Arcade.Sprite;
  enemyObject3: Phaser.Physics.Arcade.Sprite;
  enemyObject0: Phaser.Physics.Arcade.Sprite;

  data: Phaser.Data.DataManager;

  exampleTower: Phaser.Physics.Arcade.Sprite;
  path: Phaser.Curves.Path;

  towers: Phaser.Physics.Arcade.Group;
  enemies: Phaser.Physics.Arcade.Group;

  towerCount = 0;

  textTowerLabel;
  towerValue = 1;
  towerButtonUp;
  towerButtonDown;

  enemyObjectLabel;
  enemyObjectValue = 1;





  // enemy path = -1; open tower slot = 0; blocked/used tower slot = 1
  map = [[1,1,1,1,1,-1,1,1,1,1],
         [1,1,1,1,1,-1,1,1,1,1],
         [1,1,1,1,1,-1,1,1,1,1],
         [1,1,1,1,0,-1,1,1,1,1],
         [1,1,1,1,1,-1,1,1,1,1],
         [1,1,1,1,1,-1,1,1,1,1],
         [1,1,1,1,1,-1,1,1,1,1],
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
    this.add.text(120, 2, "Make Values 2", {font: "15px Arial", fill: "red"});
    this.add.text(260, 200, "Click to", {font: "10px Arial", fill: "white"});
    this.add.text(260, 220, "Place Tower", {font: "10px Arial", fill: "white"});


    /*Enemy*/
    //spawn
    this.enemyObject = new EnemyObject(this, 352, -10, "enemy1");
    this.enemyObject2= new EnemyObject(this, 352, -70, "enemy2");
    this.enemyObject3 = new EnemyObject(this, 352, -130, "enemy3");
    this.enemyObject0= new EnemyObject(this, 352, -190, "enemy0");
    this.enemyObject.setScale(0.40);
    this.enemyObject2.setScale(0.40);
    this.enemyObject3.setScale(0.40);
    this.enemyObject0.setScale(0.40);


    this.enemies = this.physics.add.group();
    this.enemies.add(this.enemyObject);
    this.enemies.add(this.enemyObject2);
    this.enemies.add(this.enemyObject3);
    this.enemies.add(this.enemyObject0);
    this.enemyObject.setDataEnabled();
    this.enemyObject.data.set('value', 1);


    /* Tower Group */
    this.towers = this.physics.add.group();
    

    /* Overlap Physics */
    this.physics.add.overlap(this.towers, this.enemies, this.towerAdd, function (tower,enemy) {
    },
    this);
    
    console.log(this.enemies.getFirst());

  }

  /*Update*/
  update() {

    this.moveEnemy();
    this.respawnEnemy();

    if (this.game.input.activePointer.isDown) {
      this.placeTower();

      if (this.towerCount > 0) {
        this.textTowerLabel.text = this.towerValue;
      }
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

  respawnEnemy(){

    
    if (this.enemyObject.y > 546){
      this.enemyObject.y = -32;
    }
  
    if (this.enemyObject2.y > 546){
      this.enemyObject2.y = -32;
    }

    if (this.enemyObject3.y > 546){
      this.enemyObject3.y = -32;
    }
  
    if (this.enemyObject0.y > 546){
      this.enemyObject0.y = -32;
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
      var tower = new ExampleTower(this,i,j,this.map);

      this.towers.add(tower);

      this.map[i][j] = 1;

      this.towerCount += 1;
     
    }

    //this.physics.add.overlap(this.tower, this.enemyObject, this,)

    
    
    
  }

  towerValueUp() {
    if(this.towerValue >= 2) {
      this.towerValue = 2;
    }

    else {
      ++this.towerValue;
    }
  }

  towerValueDown() {
    if(this.towerValue <= 1) {
      this.towerValue = 1;
    }

    else {
      --this.towerValue;
    }
  }


  towerAdd(tower, enemy) {
      

    //Check for Number 1 object and changes it
    if(enemy == this.enemyObject){
    
    this.enemyObject.setActive(false);

    this.enemyObjectValue = this.towerValue + this.enemyObject.data.get('value');
    var key = this.enemyObjectValue.toString();
    
    //call to make new number
    this.enemy1Change(enemy.x, enemy.y, this.data.get("1"), key);

    //destroy old number
    this.enemyObject.destroy();
    }

    //update "Enemy" value (right now adds the differnce between old and new numbers)
    this.enemyObjectLabel = this.add.bitmapText(100, 100, "pixelFont", 'Enemy: ' + this.towerValue, 36);

  }

  //Creates new nubmer object
  enemy1Change(posX, posY, currVal, key){

    var numNew = (this.towerValue + currVal);

    this.enemies.create(posX, posY + 60, this.data.get(key)).setScale(0.40);
  }

}
