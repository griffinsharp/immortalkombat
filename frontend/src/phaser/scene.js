import Phaser from "phaser";
import marioSprite from './assets/sprites/mario/mario.png';
import marioBackground from './assets/sprites/stages/mario-background.jpg';

//global variables
let backgroundImage;
let mario;
let platforms;
let width = 900;
let height = 600;
let speed = 30
let cursors;
let facing = 'standing'


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

  this.load.spritesheet('mario', marioSprite, {
     frameWidth: 38.9,
     frameHeight: 38.2,
    //  startFrame: 6,
    //   endFrame: 8
    })

}

function create() {
  // load background 
  backgroundImage = this.add.image(0, 0, 'background').setOrigin(0, 0);
  backgroundImage.smoothed = false;


  mario = this.physics.add.sprite(300, 500, 'mario');

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
        start: 20,
         end: 21 }),
      frameRate: 5,
      repeat: -1
    });

  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('mario', {
       start: 28,
       end: 29 }),
    frameRate: 5,
    repeat: -1
  });

  this.anims.create({
    key: 'standing',
    frames: this.anims.generateFrameNumbers('mario', { start: 23, end: 23 }),
    frameRate: 30,
    repeat: -1
  });

  this.anims.create({
    key: 'face-right',
    frames: this.anims.generateFrameNumbers('mario', { frames: [25] }),
    frameRate: 30,
    repeat: -1
  });

  this.anims.create({
    key: 'face-left',
    frames: this.anims.generateFrameNumbers('mario', { frames: [24] }),
    frameRate: 30,
    repeat: -1
  });


  this.anims.create({
    key: 'jump-right',
    frames: this.anims.generateFrameNumbers('mario', {
       start: 35,
        end: 36 }),
    frameRate: 5,
    repeat: -1
  });

  this.anims.create({
    key: 'jump-left',
    frames: this.anims.generateFrameNumbers('mario', {
       start: 33,
        end: 34 }),
    frameRate: 5,
    repeat: -1
  });

  this.anims.create({
    key: 'hammer-right',
    frames: this.anims.generateFrameNumbers('mario',
    { frames: [75, 76, 77, 78, 79] }),
    frameRate: 9,
    repeat: -1
  });

  this.anims.create({
    key: 'hammer-left',
    frames: this.anims.generateFrameNumbers('mario', {
       frames: [74, 73, 72, 71, 70] }),
    frameRate: 9,
    repeat: -1
  });
    
}

function inputHandle (player, time,delta) {

    if (cursors.space.isDown && (cursors.right.isDown || player.body.facing === 14)){
    player.play('hammer-right', 1)
      }
    else if (cursors.space.isDown && (cursors.left.isDown || player.body.facing === 13)){
    player.play('hammer-left', 1)
      }
    else if (cursors.left.isDown) {
        // player.x -= speed * delta;
        player.setVelocityX(-speed)
        mario.facing = 'left'
        player.play('left', 1)
    }
    else if (cursors.right.isDown)
    {

      // player.x += speed * delta;
      player.setVelocityX(speed)
      mario.facing = 'right'
      player.play('right', 1)
    }
    else if (cursors.up.isDown && cursors.left.isDown){
      player.play('jump-left', 1)
    }
    else if (cursors.up.isDown && cursors.right.isDown){
      player.play('jump-right', 1)
      }
    else if (player.facing = 'standing') {
    player.play('standing', 1)

    } else if ( player.facing = 'left'){
    player.play('face-left', 1) 

    } else if ( player.facing = 'right'){
    player.play('face-right', 1)
    } else {
      player.setVelocityX(0);

    }


}


export default scene;




