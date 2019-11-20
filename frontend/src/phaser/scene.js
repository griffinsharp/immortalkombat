import Phaser from "phaser";
import marioSprite from './assets/sprites/mario/mario.png';
import luigiSprite from './assets/sprites/luigi/luigi.png';
import marioBackground from './assets/sprites/stages/mario-background.jpg';
import floor from './assets/sprites/stages/floor.png';
import {renderSprites} from './sprite_animation'
import {inputHandle} from './inputs'

//global variables
let backgroundImage;
let mario;
let luigi;
let platforms;
let width = 900;
let height = 600;
let speed = 100;
let cursors;
let marioSwingTimer = false;
let luigiSwingTimer = false;
let lPrevFacing; // Array< currentFacingValue, prevFacingValue >
let mPrevFacing; // Array< currentFacingValue, prevFacingValue >


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

  this.load.spritesheet('luigi', luigiSprite, {
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

  //define players init pos
  luigi = this.physics.add.sprite(300, 510, 'luigi');
  mario = this.physics.add.sprite(600, 510, 'mario');

  mPrevFacing = [mario.body.facing, mario.body.facing, 0]
  lPrevFacing = [luigi.body.facing, mario.body.facing, 0]


  // set colision and global phisycs
  this.physics.add.collider(platforms, mario);
  this.physics.add.collider(platforms, luigi);
  // this.physics.add.collider(mario, luigi);
  this.physics.add.overlap(mario, luigi, hammerTime, null, this);

  


  [luigi, mario].forEach( player => {
    player.setGravityY(100);
    player.setScale(2);
    player.body.drag.x = 200;
    player.body.drag.y = 0;
    player.body.friction.x = 200;
    player.body.friction.y = 200;
  })


  renderSprites.apply(this, [luigi, mario]);
  // add a keyboard as cursor
    cursors = this.input.keyboard.createCursorKeys();


  
}

function hammerTime(mario, luigi) {
  // given mario and luigi are colliding:
  // mario hammering right, facing right, and luigi is to the right of mario
  if ((mario.anims.getCurrentKey() === 'm-hammer-right') && (mario.body.facing === 14) && (mario.x < luigi.x) && (marioSwingTimer === false)) {
    console.log("mario hits luigi with a right swing from the left of luigi");
    marioSwingTimer = true;
    window.setTimeout( () => { marioSwingTimer = false; }, 2000);
  


    // mario hammering left, facing left, and luigi is to the left of mario
  } else if ((mario.anims.getCurrentKey() === 'm-hammer-left') && (mario.body.facing === 13) && (mario.x > luigi.x) && (marioSwingTimer === false)) {
    console.log("mario hits luigi with a left swing from the right of luigi");
    marioSwingTimer = true;
    window.setTimeout(() => { marioSwingTimer = false; }, 2000);
    

    // luigi hammering right, facing right, and mario is to the right of luigi
  } else if ((luigi.anims.getCurrentKey() === 'l-hammer-right') && (luigi.body.facing === 14) && (luigi.x < mario.x) && (luigiSwingTimer === false)) {
    console.log("luigi hits mario with a right swing from the left of mario");
    luigiSwingTimer = true;
    window.setTimeout(() => { luigiSwingTimer = false; }, 2000);

    // luigi hammering left, facing left, and mario is to the left of luigi
  } else if ((luigi.anims.getCurrentKey() === 'l-hammer-left') && (luigi.body.facing === 13) && (luigi.x > mario.x) && (luigiSwingTimer === false)) {
    console.log("luigi hits mario with a left swing from the right of mario");
    luigiSwingTimer = true;
    window.setTimeout(() => { luigiSwingTimer = false; }, 2000);
  }



function update(time, delta) {
  if (mario.body.facing !== mPrevFacing[0]) { mPrevFacing[1] = mPrevFacing[0]; mPrevFacing[0] = mario.body.facing }
  if (luigi.body.facing !== lPrevFacing[0]) { lPrevFacing[1] = lPrevFacing[0]; lPrevFacing[0] = luigi.body.facing }
  inputHandle.apply(this, [{mario, luigi}, speed, cursors, time, delta, {mPrevFacing, lPrevFacing}])

}

export default scene;