export default class ExampleObject extends Phaser.Physics.Arcade.Sprite {

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'z');
        scene.add.existing(this);
    }
}
