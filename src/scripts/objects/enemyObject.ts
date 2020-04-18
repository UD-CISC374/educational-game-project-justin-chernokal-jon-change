export default class EnemyObject extends Phaser.GameObjects.PathFollower {

    constructor(scene: Phaser.Scene, path: Phaser.Curves.Path) {
        var x = 352;
        var y = -10;

        super(scene, path,  x, y, 'enemyObject');
        scene.add.existing(this);
    }

}
