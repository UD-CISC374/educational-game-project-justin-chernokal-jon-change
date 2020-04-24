export default class EnemyObject extends Phaser.GameObjects.PathFollower {

    constructor(scene, path: Phaser.Curves.Path) {
        var x = 352;
        var y = -10;

        super(scene, path,  x, y, 'enemyObject');

        scene.enemyObjectLabel = scene.add.bitmapText(100, 100, "pixelFont", 'Enemy: ' + scene.enemyObjectValue, 36);
    


        
        scene.add.existing(this);
    }

}
