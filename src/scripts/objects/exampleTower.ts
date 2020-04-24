export default class ExampleTower extends Phaser.Physics.Arcade.Sprite {
    constructor(scene,i,j,map) {
        var x = j * 64 + 64;
        var y = i * 64 + 32;
        
        
        super(scene,x,y,"exampleTower");

        scene.add.existing(this);
       
    }
    // Turret(scene) {
    //     Phaser.GameObjects.Image.call(this,scene,0,0,this.nextTic=0;)
    // }

    // place(i, j) {
    //     this.y = i * 64 + 64/2;
    //     this.x = j * 64 + 64/2;
    //     map[i][j] = 1;
    // }

}