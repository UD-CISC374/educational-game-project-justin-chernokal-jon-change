export default class StartScene extends Phaser.Scene {
    constructor() {
      super({ key: 'StartScene' });

   
    }
    music;
    init() {
 
    };
  
    create() {
        this.add.image(this.scale.width/2, this.scale.height/2, "menuBackground");

        /* SOUND */
        //music
        this.music = this.sound.add("startMusic");

        var musicConfig = {
        mute: false,
        volume: 1,
        rate: 1,
        detune: 0,
        seek: 0,
        loop: false,
        delay: 0
        }

        this.music.play(musicConfig);
        

        let startButton = this.add.image(this.scale.width/2, this.scale.height/2, "startButton")
        .setInteractive()
        .on('pointerover', () => {
            startButton.setTint(0x00ff00);
        })
        .on('pointerout', () => {
            startButton.clearTint();
        })
        .on('pointerdown', () => {
            this.music.stop();
            this.scene.start('MainScene');
        });
    }

  }
  