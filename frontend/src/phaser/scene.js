import Phaser from "phaser";
import floor from './assets/sprites/stages/floor.png';
import marioSprite from './assets/sprites/mario/mario.png';
import marioBackground from './assets/sprites/stages/mario-background.jpg';

//global variables
let backgroundImage;
let mario;
let platforms;
let width = 900;
let height = 500;


const scene = {
  game: {
    width: width,
    height: height,
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

function preload () {
  this.load.image('background', marioBackground);
  this.load.image('floor', floor);
  this.load.spritesheet('mario', marioSprite, { frameWidth: 38, frameHeight: 38 });
}

function init() {
}

function create() {
  backgroundImage = this.add.image(400, 300, 'background').setOrigin(0, 0);
  backgroundImage.smoothed = false;

  platforms = this.physics.add.staticGroup();
  platforms.create(450, 250, 'floor').setScale(2).refreshBody();
  mario = this.physics.add.sprite(100, 450, 'mario');

  renderSprites.apply(this);

    
}

function update() {
}

function renderSprites ()  {
    mario.setBounce(0.2);
    mario.setCollideWorldBounds(true);
    // mario.body.setGravityY(300);

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('mario', {start: 21, end: 22 }),
      frameRate: 30,
      repeat: -1
    });

  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('mario', { start: 29, end: 30 }),
    frameRate: 30,
    repeat: -1
  });

  this.anims.create({
    key: 'standing',
    frames: this.anims.generateFrameNumbers('mario', { start: 24, end: 24 }),
    frameRate: 30,
    repeat: -1
  });

  this.anims.create({
    key: 'standing',
    frames: this.anims.generateFrameNumbers('mario', { start: 24, end: 24 }),
    frameRate: 30,
    repeat: -1
  });

  this.anims.create({
    key: 'jump-left',
    frames: this.anims.generateFrameNumbers('mario', { start: 45, end: 45 }),
    frameRate: 30,
    repeat: -1
  });

  this.anims.create({
    key: 'jump-right',
    frames: this.anims.generateFrameNumbers('mario', { start: 46, end: 46 }),
    frameRate: 30,
    repeat: -1
  });

  this.anims.create({
    key: 'hammer-left',
    frames: this.anims.generateFrameNumbers('mario', { outputArray: [84, 83, 82, 81] }),
    frameRate: 30,
    repeat: -1
  });

  this.anims.create({
    key: 'hammer-right',
    frames: this.anims.generateFrameNumbers('mario', { start: 87, end: 90 }),
    frameRate: 30,
    repeat: -1
  });
    
}



export default scene;




