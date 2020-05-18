import { GameObjects } from "phaser";

export default class subTower extends Phaser.Physics.Arcade.Sprite {
    constructor(scene,i,j,map) {

        var towerButtonUp;
        var towerButtonDown;

        var x = j * 64 + 32;
        var y = i * 64 + 64;
        
        
        super(scene,x,y,"subTower");
        /*this.setInteractive();
        scene.input.setDraggable(this);
        scene.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            gameObject.x = dragX;
            gameObject.y = dragY;
        })
        */

        scene.textSubTowerLabel = scene.add.bitmapText(x - 100, y-20, "pixelFont", scene.towerSubValue, 36);

        towerButtonUp = scene.add.text(x-78, y - 50, "<", {fill:'#0f0', fontSize: 40})
        .setInteractive()
        .on('pointerdown', () => {
            console.log('sub up');
            scene.towerSubValueUp();
        });

        towerButtonUp.angle = 90;

        towerButtonDown = scene.add.text(x-77, y + 10, ">", {fill:'#0f0', fontSize: 40})
        .setInteractive()
        .on('pointerdown', () => {
            scene.towerSubValueDown();
        })

         towerButtonDown.angle = 90;
        
        
        scene.physics.add.sprite(x,y,"subTower");

        // .on('drag', () => {
        //     scene.doDrag();
        // });
        //scene.add.existing(this);
       
    }

}