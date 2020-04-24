import ExampleObject from '../objects/exampleObject';
import ExampleTower from '../objects/exampleTower';
import EnemyObject from '../objects/enemyObject';

export default class MainScene extends Phaser.Scene {
  private exampleObject: ExampleObject;
  enemyObject: Phaser.GameObjects.PathFollower;
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

    this.enemyObject = new EnemyObject(this, this.path);

    this.towers = this.physics.add.group();
    this.enemies = this.physics.add.group();
    this.enemies.add(this.enemyObject);

    this.physics.add.overlap(this.towers, this.enemyObject, this.towerAdd, function (tower,enemyObject) {
    },
    this);

    

  }

  update() {

    this.moveEnemy();
    this.respawnEnemy();

    if (this.game.input.activePointer.isDown) {
      this.placeTower();
    }

    if (this.towerCount > 0) {
      this.textTowerLabel.text = this.towerValue;
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

  moveEnemy(){
    this.enemyObject.y ++;
  }

  respawnEnemy(){
    if (this.enemyObject.y > 546){
      this.enemyObject.y = -32;
    }
  }

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
     
    }

    //this.physics.add.overlap(this.tower, this.enemyObject, this,)

    this.towerCount += 1;
    
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


  towerAdd(tower, enemyObject) {
    // if(!enemyObject.hasOverlapped) {
    //   enemyObject.hasOverlapped = true;

    //   this.enemyObjectValue = this.enemyObjectValue + this.towerValue;
    //   this.enemyObjectLabel.text = "Enemy: " + this.enemyObjectValue;
    // }   


    this.enemyObjectValue = this.enemyObjectValue + this.towerValue;
    this.enemyObjectLabel.text = "Enemy: " + this.enemyObjectValue;

  }
}
