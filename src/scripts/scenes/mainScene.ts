import ExampleObject from '../objects/exampleObject';

export default class MainScene extends Phaser.Scene {
  private exampleObject: ExampleObject;
  

  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    this.exampleObject = new ExampleObject(this, 0, 0);
  

  /* PATH */
  var graphics = this.add.graphics();
  graphics.fillStyle(0x000000, 1);
  graphics.beginPath();
  graphics.moveTo(0, 0);
  graphics.lineTo(this.scale.width, 0);
  graphics.lineTo(this.scale.width, 400);
  graphics.lineTo(0, 400);
  graphics.lineTo(0, 0);
  graphics.closePath();
  graphics.fillPath();

  var path = this.add.path(200, -32);
  path.lineTo(200, 400);

  graphics.lineStyle(3, 0xffffff, 1);
  path.draw(graphics);

  }

  update() {
  }
}
