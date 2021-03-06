export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    this.load.image("menuBackground", "./assets/images/menuBackground.png");
    this.load.image("victoryBackground", "./assets/images/victoryBackground.png");
    this.load.image("defeatBackground", "./assets/images/defeatBackground.png");
    this.load.image("startButton", "./assets/images/startButton.png");
    this.load.image("restartButton", "./assets/images/restartButton.png");
    this.load.image("upButton", "./assets/images/btn_up.png");
    this.load.image("downButton", "./assets/images/btn_down.png");

    //* Images *//
    /* Background */
    this.load.image("asteroid", "assets/images/asteroid_1.png");
    this.load.image("z", "./assets/images/z.png");


    /* TOWER IMAGES */

    this.load.spritesheet("towerSpace", "./assets/spritesheets/towerSpace.png", {
      frameWidth: 64,
      frameHeight: 64
    });

    this.load.spritesheet("addTower", "./assets/spritesheets/tower_add.png", {
      frameWidth: 128,
      frameHeight: 64
    });
    this.load.spritesheet("subTower", "./assets/spritesheets/tower_sub.png", {
      frameWidth: 128,
      frameHeight: 64
    });

    /* NUMBER IMAGES */
    this.load.spritesheet('enemy0', "./assets/images/0.png",{
      frameWidth: 64,
      frameHeight: 64
    });

    this.load.spritesheet("enemy1", "./assets/images/1.png",{
      frameWidth: 64,
      frameHeight: 64
    });

    this.load.spritesheet("enemy2", "./assets/images/2.png",{
      frameWidth: 64,
      frameHeight: 64
    });

    this.load.spritesheet("enemy3", "./assets/images/3.png",{
      frameWidth: 64,
      frameHeight: 64
    });

    this.load.spritesheet("enemy4", "./assets/images/4.png",{
      frameWidth: 64,
      frameHeight: 64
    });

    this.load.spritesheet("enemy5", "./assets/images/5.png",{
      frameWidth: 64,
      frameHeight: 64
    });

    this.load.spritesheet("enemy6", "./assets/images/6.png",{
      frameWidth: 64,
      frameHeight: 64
    });

    this.load.spritesheet("enemy7", "./assets/images/7.png",{
      frameWidth: 64,
      frameHeight: 64
    });

    this.load.spritesheet("enemy8", "./assets/images/8.png",{
      frameWidth: 64,
      frameHeight: 64
    });

    this.load.spritesheet("enemy9", "./assets/images/9.png",{
      frameWidth: 64,
      frameHeight: 64
    });

    this.load.spritesheet('enemyN1', "./assets/images/-1.png",{
      frameWidth: 64,
      frameHeight: 64
    });

    this.load.spritesheet('enemyN2', "./assets/images/-2.png",{
      frameWidth: 64,
      frameHeight: 64
    });

    this.load.spritesheet('enemyN3', "./assets/images/-3.png",{
      frameWidth: 64,
      frameHeight: 64
    });

    this.load.spritesheet('enemyN4', "./assets/images/-4.png",{
      frameWidth: 64,
      frameHeight: 64
    });

    this.load.spritesheet('enemyN5', "./assets/images/-5.png",{
      frameWidth: 64,
      frameHeight: 64
    });
    this.load.spritesheet('enemyN6', "./assets/images/-6.png",{
      frameWidth: 64,
      frameHeight: 64
    });

    this.load.spritesheet('enemyN7', "./assets/images/-7.png",{
      frameWidth: 64,
      frameHeight: 64
    });

    this.load.spritesheet('enemyN8', "./assets/images/-8.png",{
      frameWidth: 64,
      frameHeight: 64
    });

    this.load.spritesheet('enemyN9', "./assets/images/-9.png",{
      frameWidth: 64,
      frameHeight: 64
    });

    this.load.spritesheet("numChange", "assets/spritesheets/explosion.png",{
      frameWidth: 16,
      frameHeight: 16
    });

    //* Other contextuals *//
    /* Font */
    this.load.bitmapFont("pixelFont", "./assets/font/font.png", "assets/font/font.xml");

    /* SOUNDS */
    //music
    this.load.audio("startMusic", "assets/Sounds/Hardmoon_-_Deep_space.mp3");
    this.load.audio("mainMusic", "assets/Sounds/PetterTheSturgeon - Anything_1.waw_.mp3");

    //sound effects
    this.load.audio("change1", "assets/Sounds/change_noise_1.mp3");
    this.load.audio("change2", "assets/Sounds/change_noise_2.mp3");




  }

  create() {

    /* Animations */
    this.anims.create({
      key: "change_anim",
      frames: this.anims.generateFrameNumbers("numChange", {start: 0, end: 4}),
      frameRate: 5,
      repeat: 0
    });

    this.anims.create({
      key: "towerSpace_anim",
      frames: this.anims.generateFrameNumbers("towerSpace", {start: 0, end: 3}),
      frameRate: 15,
      repeat: -1  
    });

    this.scene.start('StartScene');
  }
}
