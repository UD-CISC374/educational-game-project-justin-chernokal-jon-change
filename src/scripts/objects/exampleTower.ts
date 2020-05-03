import { GameObjects } from "phaser";

export default class ExampleTower extends Phaser.Physics.Arcade.Sprite {
    constructor(scene,i,j,map) {

        var x = j * 64 + 64;
        var y = i * 64 + 32;
        
        
        super(scene,x,y,"exampleTower");
        /*this.setInteractive();
        scene.input.setDraggable(this);
        scene.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            gameObject.x = dragX;
            gameObject.y = dragY;
        })
        */

        scene.textTowerLabel = scene.add.bitmapText(x - 100, y-20, "pixelFont", scene.towerValue, 36);

        scene.towerButtonUp = scene.add.text(x-120, y - 40, "MORE", {fill:'#0f0'})
        .setInteractive()
        .on('pointerdown', () => {
            scene.towerValueUp();
        });

        scene.towerButtonDown = scene.add.text(x-120, y + 20, "LESS", {fill:'#0f0'})
        .setInteractive()
        .on('pointerdown', () => {
            scene.towerValueDown();
        })
        
        
        scene.physics.add.sprite(x,y,"exampleTower");

        // .on('drag', () => {
        //     scene.doDrag();
        // });
        //scene.add.existing(this);
       
    }

    

    
    // updateTowerValue(scene) {
    //     scene.textTowerLabel.text = scene.towerValue;
    //     console.log(scene.towerValue);
    // }
    // Turret(scene) {
    //     Phaser.GameObjects.Image.call(this,scene,0,0,this.nextTic=0;)
    // }

    // place(i, j) {
    //     this.y = i * 64 + 64/2;
    //     this.x = j * 64 + 64/2;
    //     map[i][j] = 1;
    // }

}