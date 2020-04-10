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
  var path = this.add.path(120, -32);
  path.lineTo(120, 544);

  }

  update() {
  }
}
