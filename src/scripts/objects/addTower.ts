export default class AddTower extends Phaser.Physics.Arcade.Sprite {
    constructor(scene,i,j,map) {

        var towerButtonUp;
        var towerButtonDown;

        var x = j * 64 + 32;
        var y = i * 64 + 64;
        
        
        super(scene,x,y,"addTower");

        scene.textAddTowerLabel = scene.add.bitmapText(x - 10, y - 100, "pixelFont", scene.towerAddValue, 50);

        towerButtonUp = scene.add.text(x + 50, y - 100, "<", {fill:'#0f0', fontSize: 40})
        .setInteractive()
        .on('pointerdown', () => {
            scene.towerAddValueUp();
        });

        towerButtonUp.angle = 90;

        towerButtonDown = scene.add.text(x - 10, y - 100, ">", {fill:'#0f0', fontSize: 40})
        .setInteractive()
        .on('pointerdown', () => {
            scene.towerAddValueDown();
        });
        
        
        towerButtonDown.angle = 90;

        scene.physics.add.sprite(x,y,"addTower");
        //scene.add.existing(this);
       
    }


}