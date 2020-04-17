export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    //this.load.image('exampleTower', './assets/images/...');
  }

  create() {
    this.scene.start('MainScene');
  }
}
