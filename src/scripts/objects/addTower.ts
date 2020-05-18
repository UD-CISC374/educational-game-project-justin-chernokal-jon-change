export default class AddTower extends Phaser.Physics.Arcade.Sprite {
    constructor(scene,i,j,map) {

        var towerButtonUp;
        var towerButtonDown;

        var x = j * 64 + 32;
        var y = i * 64 + 64;
        
        
        super(scene,x,y,"addTower");

        scene.textAddTowerLabel = scene.add.bitmapText(x - 10, y - 100, "pixelFont", scene.towerAddValue, 50);

        towerButtonUp = scene.add.image(x + 30, y - 85, "upButton")
        .setInteractive()
        .on('pointerover', () => {
            towerButtonUp.setTint(0x00ff00);
        })
        .on('pointerout', () => {
            towerButtonUp.clearTint();
        })
        .on('pointerdown', () => {
            scene.towerAddValueUp();
        });

        towerButtonDown = scene.add.image(x - 30, y - 85, "downButton")
        .setInteractive()
        .on('pointerover', () => {
            towerButtonDown.setTint(0x00ff00);
        })
        .on('pointerout', () => {
            towerButtonDown.clearTint();
        })
        .on('pointerdown', () => {
            scene.towerAddValueDown();
        });
        


        scene.physics.add.sprite(x,y,"addTower");
        //scene.add.existing(this);
       
    }


}