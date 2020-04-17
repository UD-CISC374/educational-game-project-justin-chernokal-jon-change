export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    this.load.spritesheet("exampleTower", "./assets/spritesheets/wind_sprite_anim.png", {
      frameWidth: 160,
      frameHeight: 130
    });
  }

  create() {
    this.scene.start('MainScene');
  }
}
