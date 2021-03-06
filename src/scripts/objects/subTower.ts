import { GameObjects } from "phaser";

export default class subTower extends Phaser.Physics.Arcade.Sprite {
    constructor(scene,i,j,map) {

        var towerButtonUp;
        var towerButtonDown;

        var x = j * 64 + 32;
        var y = i * 64;
        
        
        super(scene,x,y,"subTower");
        /*this.setInteractive();
        scene.input.setDraggable(this);
        scene.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            gameObject.x = dragX;
            gameObject.y = dragY;
        })
        */

        scene.textSubTowerLabel = scene.add.bitmapText(x - 5, y + 75, "pixelFont", scene.towerSubValue, 50);

        towerButtonUp = scene.add.image(x + 32, y + 88, "upButton")
        .setInteractive()
        .on('pointerover', () => {
            towerButtonUp.setTint(0x00ff00);
        })
        .on('pointerout', () => {
            towerButtonUp.clearTint();
        })
        .on('pointerdown', () => {
            console.log('sub up');
            scene.towerSubValueUp();
        });

        towerButtonDown = scene.add.image(x - 30, y + 88, "downButton")
        .setInteractive()
        .on('pointerover', () => {
            towerButtonDown.setTint(0x00ff00);
        })
        .on('pointerout', () => {
            towerButtonDown.clearTint();
        })
        .on('pointerdown', () => {
            scene.towerSubValueDown();
        })

        
        scene.physics.add.sprite(x,y,"subTower");

        // .on('drag', () => {
        //     scene.doDrag();
        // });
        //scene.add.existing(this);
       
    }

}