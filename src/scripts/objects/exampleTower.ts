export default class ExampleTower extends Phaser.Physics.Arcade.Sprite {
    constructor(scene,i,j,map) {

        var towerButtonUp;
        var towerButtonDown;

        var x = j * 64 + 64;
        var y = i * 64 + 32;
        
        
        super(scene,x,y,"exampleTower");

        scene.textTowerLabel = scene.add.bitmapText(x - 100, y-20, "pixelFont", scene.towerValue, 36);

        towerButtonUp = scene.add.text(x-78, y - 50, "<", {fill:'#0f0', fontSize: 40})
        .setInteractive()
        .on('pointerdown', () => {
            scene.towerValueUp();
        });

        towerButtonUp.angle = 90;

        towerButtonDown = scene.add.text(x-77, y + 10, ">", {fill:'#0f0', fontSize: 40})
        .setInteractive()
        .on('pointerdown', () => {
            scene.towerValueDown();
        });
        
        
        towerButtonDown.angle = 90;

        scene.physics.add.sprite(x,y,"exampleTower");
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