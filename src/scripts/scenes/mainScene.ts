import ExampleObject from '../objects/exampleObject';
import ExampleTower from './exampleTower';

export default class MainScene extends Phaser.Scene {
  private exampleObject: ExampleObject;
  exampleTower: Phaser.Physics.Arcade.Sprite;

  map = [[0,0,0,0,0,-1,0,0,0,0],
         [0,0,0,0,0,-1,0,0,0,0],
         [0,0,0,0,0,-1,0,0,0,0],
         [0,0,0,0,0,-1,0,0,0,0],
         [0,0,0,0,0,-1,0,0,0,0],
         [0,0,0,0,0,-1,0,0,0,0],
         [0,0,0,0,0,-1,0,0,0,0],
         [0,0,0,0,0,-1,0,0,0,0]];
  

  constructor() {
    super({ key: 'MainScene' });
  }

 

  create() {
    this.exampleObject = new ExampleObject(this, 0, 0);
    //this.towers = this.physics.add.group({classType:Tower, runChildUpdate: true} );
  

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
  var path = this.add.path(352, -32);
  path.lineTo(352, 544);

  //graphics used for path visualization: line
  graphics.lineStyle(3, 0xffffff, 1);
  path.draw(graphics);


  /* GRID */
  var graphics = this.add.graphics();
  //drawGrid function is defined below the update function
  this.drawGrid(graphics);

  }

  update() {

    if (this.game.input.activePointer.isDown) {
      this.placeTower();
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

  placeTower() {
    var i = Math.floor(this.input.mousePointer.y/64);
    var j = Math.floor(this.input.mousePointer.x/64);

    if(this.map[i][j] === 0) {
      var tower = new ExampleTower(this,i,j,this.map);
      this.map[i][j] = 1;
    }
    
  }
}
