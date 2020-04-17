export default class ExampleTower extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        var x = 200;
        var y = 200;
        
        super(scene,x,y,"exampleTower");

        scene.add.existing(this);
    }
}