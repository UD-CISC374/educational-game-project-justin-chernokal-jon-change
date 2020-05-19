import ExampleObject from '../objects/exampleObject';
import AddTower from '../objects/addTower';
import SubTower from '../objects/subTower';
import EnemyObject from '../objects/enemyObject';

export default class MainScene extends Phaser.Scene {
  private exampleObject: ExampleObject;
  enemyObject: Phaser.Physics.Arcade.Sprite;
  enemyObject2: Phaser.Physics.Arcade.Sprite;
  enemyObject3: Phaser.Physics.Arcade.Sprite;
  enemyObject0: Phaser.Physics.Arcade.Sprite;
  enemyObject4: Phaser.Physics.Arcade.Sprite;
  enemyObject5: Phaser.Physics.Arcade.Sprite;
  enemyObject6: Phaser.Physics.Arcade.Sprite;
  enemyObject7: Phaser.Physics.Arcade.Sprite;
  data: Phaser.Data.DataManager;

  addTower: Phaser.Physics.Arcade.Sprite;
  subTower: Phaser.Physics.Arcade.Sprite;
  path: Phaser.Curves.Path;

  towersAdd: Phaser.Physics.Arcade.Group;
  towersSub: Phaser.Physics.Arcade.Group;
  enemies: Phaser.Physics.Arcade.Group;

  towerAddCount = 0;
  towerSubCount = 0;

  textAddTowerLabel;
  textSubTowerLabel;

  towerAddValue = 1;
  towerSubValue = 1;
  
  nextNumLabel;

  enemyAddLabel;
  enemySubLabel;
  enemyObjectValue = 0;
  enemyValueSub = 0;

  scoreLabel;
  score = 0;

  music;
  changeSound1;
  changeSound2;

  objective = Phaser.Math.RND.between(-9,9);





  // enemy path = -1; open tower slot = 0; blocked/used tower slot = 1
  map = [[1,1,1,1,1,1,1,1,1,1],
         [1,1,1,1,1,1,1,1,1,1],
         [1,1,1,1,1,1,1,1,1,1],
         [1,1,1,1,0,1,1,1,1,1],
         [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
         [1,1,1,1,1,1,1,1,2,1],
         [1,1,1,1,1,1,1,1,1,1],
         [1,1,1,1,1,1,1,1,1,1]];
  

  constructor() {
    super({ key: 'MainScene' });
  }

 //ENEMY SPAWN x = 352 y = 0

  create() {
    this.exampleObject = new ExampleObject(this, 0, 0);

    /* Hash table */
    //stores number sprite keys
    this.data.set('0', 'enemy0');
    this.data.set('1', 'enemy1');
    this.data.set('2', 'enemy2');
    this.data.set('3', 'enemy3');
    this.data.set('4', 'enemy4');
    this.data.set('5', 'enemy5');
    this.data.set('6', 'enemy6');
    this.data.set('7', 'enemy7');
    this.data.set('8', 'enemy8');
    this.data.set('9', 'enemy9');
    this.data.set('-1', 'enemyN1');
    this.data.set('-2', 'enemyN2');
    this.data.set('-3', 'enemyN3');
    this.data.set('-4', 'enemyN4');
    this.data.set('-5', 'enemyN5');
    this.data.set('-6', 'enemyN6');
    this.data.set('-7', 'enemyN7');
    this.data.set('-8', 'enemyN8');
    this.data.set('-9', 'enemyN9');

    /* SOUND */
    //music
    this.music = this.sound.add("mainMusic");

    var musicConfig = {
      mute: false,
      volume: 0.1,       //range from 0.0 - 1.0
      rate: 1,
      detune: 0,
      seek: 0,
      loop: false,
      delay: 0
    }

    this.music.play(musicConfig);

    //sound effects
    this.changeSound1 = this.sound.add("change1");
    this.changeSound2 = this.sound.add("change2");


    /* PATH */
    //graphics used for path visualization: background
    var graphics = this.add.graphics();
    graphics.fillStyle(0x000000, 1);
    graphics.beginPath();
    graphics.moveTo(0, 0);
    graphics.lineTo(this.scale.width, 0);
    graphics.lineTo(this.scale.width, 512);
    graphics.lineTo(0, 640);
    graphics.lineTo(0, 0);
    graphics.closePath();
    graphics.fillPath();

    //path declaration for enemies
    this.path = new Phaser.Curves.Path(-32, 288);
    this.path.lineTo(640, 288);

    //graphics used for path visualization: line
    graphics.lineStyle(3, 0xffffff, 1);
    this.path.draw(graphics);


    /* GRID */
    var graphics = this.add.graphics();
    //drawGrid function is defined below the update function
    this.drawGrid(graphics);

    /*TEXT*/
    //Text labels
    this.add.text(20, 5, "Click the specified location to place a tower.", {font: "15px Arial", fill: "white"});
    this.add.text(20, 30, "Towers will add the value on left to the", {font: "15px Arial", fill: "white"});
    this.add.text(20, 45, "moving objects.", {font: "15px Arial", fill: "white"});
    this.add.text(20, 70, 'Change the tower value by clicking', {font: "15px Arial", fill: "white"});
    this.add.text(20, 85, ' Up and Down Arrows.', {font: "15px Arial", fill: "white"});
    this.add.text(20, 150, "Objective =  " + this.objective, {font: "20px Arial", fill: "red"});
    this.add.text(260, 202, "Click For", {font: "10px Arial", fill: "white"});
    this.add.text(260, 222, "Addition", {font: "10px Arial", fill: "white"});
    this.add.text(518, 330, "Click For", {font: "10px Arial", fill: "white"});
    this.add.text(518, 350, "Subtraction", {font: "10px Arial", fill: "white"});

    // correct text
    this.add.text(484, 150, "Correct:    / 4", {font: "20px Arial", fill: "lightgreen"});

    //Next number warning
    this.add.text(5,192, "Coming up", {font: "10px Arial", fill: "white"});
    this.add.text(5,202, "next: ", {font: "10px Arial", fill: "white"});
    this.nextNumLabel = this.add.bitmapText(22, 202, "pixelFont", ' = ', 24);

    //other label
    this.scoreLabel = this.add.bitmapText(564, 150, "pixelFont", '', 30);
    this.scoreLabel.setText(this.score, 54);

    //add and sub labels
    this.enemyAddLabel = this.add.bitmapText(228, 360, "pixelFont", ' x' + ' + ' + 'y' + ' = ' + "?", 36);
    this.enemySubLabel = this.add.bitmapText(474, 212, "pixelFont", ' y' + ' - ' + 'x' + ' = ' + "?", 36);


    /*Enemy*/
    //spawn
    this.enemyObject0 = new EnemyObject(this, -460, 288, "enemy0");
    this.enemyObject = new EnemyObject(this, -10, 288, "enemy1");
    this.enemyObject2 = new EnemyObject(this, -160, 288, "enemy2");
    this.enemyObject3 = new EnemyObject(this, -310, 288, "enemy3");
   
    
    //add created enemies to group
    this.enemies = this.physics.add.group();
    this.enemies.add(this.enemyObject0);
    this.enemies.add(this.enemyObject);
    this.enemies.add(this.enemyObject2);
    this.enemies.add(this.enemyObject3); 
    // this.enemies.add(this.enemyObject4);
    // this.enemies.add(this.enemyObject5);
    // this.enemies.add(this.enemyObject6);
    // this.enemies.add(this.enemyObject7); 

    //Give enemies reference values
    this.enemyObject.data.set("value", 1);
    this.enemyObject2.data.set("value", 2);
    this.enemyObject3.data.set("value", 3);
    this.enemyObject0.data.set("value", 0);
    // this.enemyObject4.data.set("value", 4);
    // this.enemyObject5.data.set("value", 5);
    // this.enemyObject6.data.set("value", 6);
    // this.enemyObject7.data.set("value", 7);

    //Number tower Collision - Add
    this.enemyObject.data.set("collideAdd", "true");
    this.enemyObject2.data.set("collideAdd", "true");
    this.enemyObject3.data.set("collideAdd", "true");
    this.enemyObject0.data.set("collideAdd", "true");

    //Number tower Collision - Sub
    this.enemyObject.data.set("collideSub", "true");
    this.enemyObject2.data.set("collideSub", "true");
    this.enemyObject3.data.set("collideSub", "true");
    this.enemyObject0.data.set("collideSub", "true");

    /* Tower Group */
    this.towersAdd = this.physics.add.group();
    this.towersSub = this.physics.add.group();
    

    /* Overlap Physics */
    this.physics.add.overlap(this.towersAdd, this.enemies, this.towerAdd, function (tower,enemy) {
    },
    this);
    
    this.physics.add.overlap(this.towersSub, this.enemies, this.towerSub, function (tower,enemy) {
    },
    this);

    console.log(this.enemies.getFirst());

  }

  /*Update*/
  update() {

    this.moveEnemy();
    this.killEnemy3();
    this.respawnEnemy();
    this.endScene();

    if (this.game.input.activePointer.isDown) {
      this.placeTower();
    }

    if (this.towerAddCount > 0) {
      this.textAddTowerLabel.text = this.towerAddValue;
    }

    if (this.towerSubCount > 0) { 
      this.textSubTowerLabel.text = this.towerSubValue;
    }
    
  }


  drawGrid(graphics){
    graphics.lineStyle(1, 0x0000ff, 0.8);
    for(var i = 0; i < 8; i++) {
      graphics.moveTo(0, i* 64);
      graphics.lineTo(640, i * 64);
    }
    for(var j = 0; j < 10; j++) {
      graphics.moveTo(j*64, 0);
      graphics.lineTo(j * 64, 512);
    }
    graphics.strokePath();
  }

  /* Enemy Update Functions */
  moveEnemy(){
    //moves enemy one down
    this.enemies.incX(0.75);
  }

  killEnemy3(){
    //kills enemy of value three at bottom of screen
    for(let enemy of this.enemies.getChildren()){
      if ( (enemy as EnemyObject).x >= this.scale.width){
        if( (enemy as EnemyObject).data.get("value") == this.objective){
          (enemy as EnemyObject).setActive(false);
          (enemy as EnemyObject).destroy();
          this.score++;
          this.scoreLabel.setText(this.score, 36);
        }  
      }
    }
  }

  respawnEnemy(){
    //respawn eneimes after passing bottom of screen
    
    for(let enemy of this.enemies.getChildren()){
      if ( (enemy as EnemyObject).x >= this.scale.width){
          (enemy as EnemyObject).x = -32 
          enemy.data.set("collideAdd", "true");
          enemy.data.set("collideSub", "true");
      }
    }
  }


  endScene(){
    //when no enemies remain return to start screen
    if (this.enemies.getTotalUsed() == 0){

      this.map[3][4] = 0;
      this.map[6][4] = 0;
      this.music.stop();
      this.scene.start('VictoryScene');
    }
  }



  /* Tower Interaction */
  
  placeTower() {
    //Place towers
    var i = Math.floor(this.input.mousePointer.y/64);
    var j = Math.floor(this.input.mousePointer.x/64);

    if(this.map[i][j] === 0) {

      var x = j * 64 + 64;
      var y = i * 64 + 32;

      
      var tower = new AddTower(this,i,j,this.map);

      this.towersAdd.add(tower);

      this.map[i][j] = 1;

      this.towerAddCount += 1;
     
    }

    if(this.map[i][j] === 2) {

      var x = j * 64 + 64;
      var y = i * 64 + 32;

      var tower = new SubTower(this,i,j,this.map);

      this.towersSub.add(tower);

      this.map[i][j] = 1;

      this.towerSubCount += 1;
     
    }    
  }

  /* Tower Value Manipulation */
  //Add Tower 
  towerAddValueUp() {
    if(this.towerAddValue >= 3) {
      this.towerAddValue = 3;
    }

    else {
      ++this.towerAddValue;
    }
  }

  towerAddValueDown() {
    if(this.towerAddValue <= 0) {
      this.towerAddValue = 0;
    }

    else {
      --this.towerAddValue;
    }
  }

  //Sub Tower
  towerSubValueUp() {
    if(this.towerSubValue >= 3) {
      this.towerSubValue = 3;
    }

    else {
      ++this.towerSubValue;
    }
  }

  towerSubValueDown() {
    if(this.towerSubValue <= 0) {
      this.towerSubValue = 0;
    }

    else {
      --this.towerSubValue;
    }
  }


  /* Enemy & Tower Interaction */
  towerAdd(tower, enemy) {

    if(enemy.data.get("collideAdd") ==  "true"){

      let eo: EnemyObject = enemy as EnemyObject; 

      if(this.towerAddValue == 0) {
        this.enemyAddLabel.setText('0' + ' + ' + eo.data.get('value') + ' = ' + eo.data.get('value'), 36);
      }

      if(this.towerAddValue != 0){
      
        enemy.setActive(false);

        let enemyObjectValue = eo.data.get('value') + this.towerAddValue ;
        
        if(enemyObjectValue > 9) {
          this.enemyAddLabel.setText("Max Limit, Subtract!");
          return;
        }

        else {
        var key = enemyObjectValue.toString();

        //update "Enemy" value (right now adds the differnce between old and new numbers)
        this.enemyAddLabel.setText(this.towerAddValue + ' + ' + eo.data.get('value') + ' = ' + enemyObjectValue, 36);
        
        
        //call to make new number
        this.enemyChange(eo.x, eo.y, eo.data.get('value'), key);

        //destroy old number
        enemy.destroy();

        //Animation ****CAUSES CRASHING ON COLLISION****
        //enemy.play("change_anim");
        }
      }
    }     
  }

  towerSub(tower, enemy) {

    if(enemy.data.get("collideSub") ==  "true"){

      let eo: EnemyObject = enemy as EnemyObject; 

      if(this.towerSubValue == 0) {
        this.enemySubLabel.setText(eo.data.get('value') + ' - ' + '0' + ' = ' + eo.data.get('value'), 36);
      }

      if(this.towerSubValue != 0){
      
        enemy.setActive(false);

        let enemyValueSub = eo.data.get('value') - this.towerSubValue;

        if( enemyValueSub < -9) {
          this.enemySubLabel.setText("Min Limit, Add!");
          return;
        }

        else {

          var key = enemyValueSub.toString();
    
          //update "Enemy" value (right now adds the differnce between old and new numbers)
          this.enemySubLabel.setText(eo.data.get('value') + ' - ' + this.towerSubValue + ' = ' + enemyValueSub, 36);
          
          //call to make new number
          this.enemyChangeSub(eo.x, eo.y, eo.data.get('value'), key);

          //destroy old number
          enemy.destroy();

          //Animation ****CAUSES CRASHING ON COLLISION****
          //enemy.play("change_anim");
        }
      }     
    }     
  }


  //Creates new nubmer object addition

  enemyChange(posX, posY, currVal, key){
    var numNew = (this.towerAddValue + currVal);

    //sound effect
    var changeConfig ={
      mute: false,
      volume: 0.25,     //range from 0.0 - 1.0
      rate: 1,
      detune: 0,
      seek: 0,
      loop: false,
      delay: 0
    }

    this.changeSound1.play(changeConfig);

    let newEnemy: EnemyObject = new EnemyObject(this, posX, posY, this.data.get(key)); 
    this.enemies.add(newEnemy);
    newEnemy.data.set("value", numNew);
    newEnemy.data.set("collideAdd", "false");
    newEnemy.data.set("collideSub", "true");
  }

  //Creates new nubmer object subtraction
  enemyChangeSub(posX, posY, currVal, key){
    var numNew = (currVal - this.towerSubValue);

    //sound effect
    var changeConfig ={
      mute: false,
      volume: 0.25,   //range from 0.0 - 1.0
      rate: 1,
      detune: 0,
      seek: 0,
      loop: false,
      delay: 0
    }

    this.changeSound1.play(changeConfig);

    let newEnemy: EnemyObject = new EnemyObject(this, posX, posY, this.data.get(key)); 
    this.enemies.add(newEnemy);
    newEnemy.data.set("value", numNew);
    newEnemy.data.set("collideSub", "false");
    newEnemy.data.set("collideAdd", "true");
  }

}
