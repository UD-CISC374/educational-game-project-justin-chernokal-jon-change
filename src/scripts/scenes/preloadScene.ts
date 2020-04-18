export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    this.load.spritesheet("exampleTower", "./assets/spritesheets/wind_sprite_anim.png", {
      frameWidth: 160,
      frameHeight: 130
    });

    this.load.spritesheet("enemyObject", "./assets/spritesheets/ship3.png", {
      frameWidth: 32,
      frameHeight: 32
    });

    this.load.spritesheet("exampleObject", "./assets/spritesheets/ship2.png", {
      frameWidth: 32,
      frameHeight: 32
    });

  }

  create() {
    this.scene.start('MainScene');
  }
}
