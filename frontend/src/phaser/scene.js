import Phaser from "phaser";
import marioSprite from './assets/sprites/mario/mario.png';
import marioBackground from './assets/sprites/stages/mario-background.jpg';
import floor from './assets/sprites/stages/floor.png';

//global variables
let backgroundImage;
let floorImage;
let mario;
let platforms;
let width = 900;
let height = 600;
let speed = 80;
let cursors;
let facing = 'standing';


const scene = {
  game: {
    width,
    height,
    type: Phaser.AUTO,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 300 },
        debug: false
      }
    },
    scene: {
      preload: preload,
      init: init,
      create: create,
      update: update
    }
  }
};

function init() {
}

function preload () {
  this.load.image('background', marioBackground);
  this.load.image('floor', floor);

  this.load.spritesheet('mario', marioSprite, {
     frameWidth: 46,
     frameHeight: 42,
    })

}

function create() {
  // load background
  backgroundImage = this.add.image(0, 0, 'background').setOrigin(0, 0).setScale(0.45);
  backgroundImage.smoothed = false;


  platforms = this.physics.add.staticGroup();
  platforms.create(400, 600, 'floor').setScale(1).refreshBody();

  mario = this.physics.add.sprite(300, 500, 'mario');
  this.physics.add.collider(mario, platforms);

  mario.setGravityY(100);
  mario.setScale(2);

  mario.body.drag.x = 200;
  mario.body.drag.y = 0;
  mario.body.friction.x = 200;
  mario.body.friction.y = 200;


  renderSprites.apply(this);

  // add a keyboard as cursor
    cursors = this.input.keyboard.createCursorKeys();
}

function update(time, delta) {
  console.log(mario.body.facing)
  inputHandle.apply(this, [mario, time, delta])
}

function renderSprites ()  {
    mario.setBounce(0.2);
    mario.setCollideWorldBounds(true);
    // mario.body.setGravityY(300);

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('mario', {
        start: 0,
         end: 1 }),
      frameRate: 5,
      repeat: -1
    });

  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('mario', {
       start: 6,
       end: 7 }),
    frameRate: 5,
    repeat: -1
  });

  this.anims.create({
    key: 'standing',
    frames: this.anims.generateFrameNumbers('mario', { start: 3, end: 3 }),
    frameRate: 30,
    repeat: -1
  });

  this.anims.create({
    key: 'face-right',
    frames: this.anims.generateFrameNumbers('mario', { frames: [5] }),
    frameRate: 30,
    repeat: -1
  });

  this.anims.create({
    key: 'face-left',
    frames: this.anims.generateFrameNumbers('mario', { frames: [4] }),
    frameRate: 30,
    repeat: -1
  });

  this.anims.create({
    key: 'jump-right',
    frames: this.anims.generateFrameNumbers('mario', {
       start: 10,
        end: 11 }),
    frameRate: 5,
    repeat: -1
  });

  this.anims.create({
    key: 'jump-left',
    frames: this.anims.generateFrameNumbers('mario', {
       start: 8,
        end: 9 }),
    frameRate: 5,
    repeat: -1
  });

  this.anims.create({
    key: 'hammer-right',
    frames: this.anims.generateFrameNumbers('mario',
    { frames: [30, 29, 28, 27, 26, 25, 24] }),
    frameRate: 9,
    repeat: -1
  });

  this.anims.create({
    key: 'hammer-left',
    frames: this.anims.generateFrameNumbers('mario', {
       frames: [16, 17, 18, 19, 20, 21, 22] }),
    frameRate: 9,
    repeat: -1
  });
    
}

function inputHandle (player, time,delta) {
  // if (player.body.onFloor()) && player.play('jumping', true);

  
    if (cursors.space.isDown && (cursors.right.isDown || player.body.facing === 14)){
      player.play('hammer-right', 1).setCrop(0, 1, 43, 42);

   }
    else if (cursors.space.isDown && (cursors.left.isDown || player.body.facing === 13)){
    player.play('hammer-left', 1).setCrop(2, 2, 44, 42);

    }
    else if (cursors.left.isDown) {
        // player.x -= speed * delta;
        player.setVelocityX(-speed)
        mario.facing = 'left'
        player.play('left', 1)

      if (cursors.up.isDown && mario.body.touching.down) {
          player.setVelocityY(-speed * 4)
          player.play('jump-left', 1)
      } 
        
    }
    else if (cursors.right.isDown) {
      // player.x += speed * delta;
      player.setVelocityX(speed)
      mario.facing = 'right'
      player.play('right', 1)

      if (cursors.up.isDown && mario.body.touching.down) {
        player.setVelocityY(-speed * 4)
        player.play('jump-right', 1)

      }
    }
    else if (cursors.up.isDown && mario.body.touching.down){
      player.setVelocityY(-speed * 4)
      player.play('jump-left', 1)
    }
    else if (cursors.up.isDown && cursors.right.isDown && mario.body.touching.down){
      player.setVelocityY(-speed * 4)
      player.play('jump-right', 1)
    }
    else if (player.body.facing === 13){
    player.play('face-left', 1) 

    } else if (player.body.facing === 14){
    player.play('face-right', 1)

    } else {
    
      player.play('standing', 1)
      player.setVelocityX(0);

    }

}



export default scene;




