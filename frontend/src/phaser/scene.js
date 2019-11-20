import Phaser from "phaser";
import marioSprite from './assets/sprites/mario/mario.png';
import luigiSprite from './assets/sprites/luigi/luigi.png';
import marioBackground from './assets/sprites/stages/mario-background.jpg';
import floor from './assets/sprites/stages/floor.png';
import gameOver from './assets/sprites/stages/gameover.png';
import pipe from './assets/sprites/stages/pipe.png';
import {renderSprites} from './sprite_animation';
import {inputHandle} from './inputs';
import {hammerTime, checkHealth} from './attack';

//global variables
let backgroundImage;
let mario;
let luigi;
let platforms;
let width = 900;
let height = 600;
let speed = 100;
let cursors;

let marioFacing = 'left';
let luigiFacing = 'right';
let setMarioFacing = (facing) => {marioFacing = facing}
let setLuigiFacing = (facing) => {luigiFacing = facing}

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
  this.load.image('pipe', pipe);
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
  platforms.create(100, 500, 'pipe').setScale(0.4).refreshBody();
  platforms.create(400, 600, 'floor').setScale(1).refreshBody();

  //define players init pos
  luigi = this.physics.add.sprite(300, 510, 'luigi');
  mario = this.physics.add.sprite(600, 510, 'mario');


  // set colision and global phisycs
  this.physics.add.collider(platforms, mario);
  this.physics.add.collider(platforms, luigi);

  // overlap does its own built in bind, so no need to do .apply here. 
  // The scope of 'this' is preserved;
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

function update(time, delta) {
  inputHandle.apply(this, [{ mario, luigi }, speed, cursors, time, delta, { marioFacing, luigiFacing, setMarioFacing, setLuigiFacing}]);
  checkHealth();
}

export default scene;