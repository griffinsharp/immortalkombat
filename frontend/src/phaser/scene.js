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
let lPrevFacing;
let mPrevFacing;


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

  mPrevFacing = mario.body.facing
  lPrevFacing = luigi.body.facing

  // set colision and global phisycs
  this.physics.add.collider(platforms, mario);
  this.physics.add.collider(platforms, luigi);

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

function update(time, delta) {
  if (mario.body.facing !== mPrevFacing) { mPrevFacing = mario.body.facing }
  if (luigi.body.facing !== lPrevFacing) { lPrevFacing = luigi.body.facing }
  inputHandle.apply(this, [{mario, luigi}, speed, cursors, time, delta, {mPrevFacing, lPrevFacing}])
}

export default scene;