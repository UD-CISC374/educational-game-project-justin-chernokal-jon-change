export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    this.load.spritesheet("exampleTower", "./assets/spritesheets/tower_add.png", {
      frameWidth: 128,
      frameHeight: 64
    });

    this.load.spritesheet("enemyObject", "./assets/spritesheets/ship3.png", {
      frameWidth: 32,
      frameHeight: 32
    });

    this.load.spritesheet("exampleObject", "./assets/spritesheets/ship2.png", {
      frameWidth: 32,
      frameHeight: 32
    });

    this.load.bitmapFont("pixelFont", "./assets/font/font.png", "assets/font/font.xml");


  }

  create() {
    this.scene.start('MainScene');
  }
}
