export default class StartScene extends Phaser.Scene {
    constructor() {
      super({ key: 'StartScene' });

   
    }

    init() {
 
    };
  
    create() {
        this.add.image(this.scale.width/2, this.scale.height/2, "menuBackground");
        

        let startButton = this.add.image(this.scale.width/2, this.scale.height/2, "startButton")
        .setInteractive()
        .on('pointerover', () => {
            startButton.setTint(0x00ff00);
        })
        .on('pointerout', () => {
            startButton.clearTint();
        })
        .on('pointerdown', () => {
            this.scene.start('MainScene');
        });
    }

  }
  