export default class EnemyObject extends Phaser.Physics.Arcade.Sprite {

    constructor(scene: Phaser.Scene, x: number, y: number, image: string) {
        super(scene,  x, y, image);

        
        scene.add.existing(this);
    }

}
