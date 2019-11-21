import Phaser from "phaser";
import marioSprite from './assets/sprites/mario/mario.png';
import luigiSprite from './assets/sprites/luigi/luigi.png';
import marioBackground from './assets/sprites/stages/mario-background.jpg';
import floor from './assets/sprites/stages/floor.png';
import gameOverImg from './assets/sprites/stages/gameover1.png';
import pipe from './assets/sprites/stages/pipe.png';
import pipeRotated from './assets/sprites/stages/piperotated.png';
import {renderSprites} from './sprite_animation';
import {inputKeyboardHandle, handleMessage} from './inputs';
import * as io from 'socket.io-client'

//global variables
let inputDevice = 'keyboard' || 'socket'
let socket;
let debug = true;
let backgroundImage;
let mario;
let luigi;
let platforms;
let width = 900;
let height = 600;
let speed = 100;
let cursors;
let gameState;
let hammers;
let luigiBar;
let marioBar;
let gameOverText;

const scene = {
  game: {
    width,
    height,
    type: Phaser.AUTO,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 300 },
        debug
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


//websocket 



function init() {

  if (inputDevice !== 'keyboard'){
    socket = io.connect("http://localhost:5000/games");
    gameState = JSON.parse(window.localStorage.getItem('gameRoom'))

    socket.on("welcome", (msg) => console.log("Received: ", msg));
    // connect to the server room
    socket.emit("joinRoom", JSON.stringify({code: gameState.code, username: "game"}));

    socket.on("message", msg => handleMessage.apply(this, [{ mario, luigi, msg }, speed, {swingHammer}]));
  }
  
}

function preload () {

  this.load.image('background', marioBackground);
  this.load.image('pipe', pipe);
  this.load.image('pipeRotated', pipeRotated);
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


  //game over text
  gameOverText = this.add.text();
  gameOverText.font =  "Roboto Condensed"
  gameOverText.setOrigin(0.5)
  gameOverText.x = width / 2
  gameOverText.y = height / 2

  platforms = this.physics.add.staticGroup({allowGravity: false, immovable: true});
  platforms.create(70, 500, 'pipe').setScale(0.4).refreshBody().setBounce(0,0);
  platforms.create(850, 430, 'pipeRotated').setScale(0.4).refreshBody();
  platforms.create(400, 600, 'floor').setScale(1).setBounce(0,0);

  //define players init pos
  luigi = this.physics.add.sprite(300, 410, 'luigi');
  mario = this.physics.add.sprite(600, 410, 'mario');

  //define player health
  luigi.setData('health', 100)
  mario.setData('health', 100)

  // helth bar
  marioBar = this.add.rectangle()
  luigiBar = this.add.rectangle()
  marioBar.setOrigin(0,0)
  marioBar.setFillStyle(16711680)
  luigiBar.setFillStyle(16711680)
  luigiBar.setOrigin(0,0)

  //default facing
  luigi.setData('facing','right')
  mario.setData('facing','left')

  //define projectile hammer
  hammers = this.physics.add.group({ immovable: true, allowGravity: false})
  hammers.enableBody = true;

  // assign username to player
  if (gameState) {
    luigi.setName(gameState.players[0])
    mario.setName(gameState.players[1])
  }else {
    luigi.setName('luigi')
    mario.setName('mario')
  }

  //set default hitbox size
  mario.setSize(14,31)
  mario.setOffset(16,12)

  luigi.setSize(14,31)
  luigi.setOffset(16,12)


  // set colision and global phisycs
  this.physics.add.collider(platforms, mario);
  this.physics.add.collider(platforms, luigi);

  this.physics.add.overlap(hammers, luigi, (player, hammer) => {if (player.name !== hammer.name) {player.data.values.health -= 0.01 } }, null );
  this.physics.add.overlap(hammers, mario, (player, hammer) => {if (player.name !== hammer.name) {player.data.values.health -= 0.01 } }, null );

  this.physics.add.collider(mario, luigi);


  [luigi, mario].forEach( player => {
    player.setGravityY(200);
    player.setScale(2);
    player.setBounce(0,0)
    player.body.drag.x = 150;
    player.body.drag.y = 0;
    player.body.friction.x = 200;
    // player.body.friction.y = 200;
  })


  renderSprites.apply(this, [luigi, mario]);
  // add a keyboard as cursor
    cursors = this.input.keyboard.createCursorKeys();
}

function update(time, delta) {
  if (inputDevice === 'keyboard') {
    inputKeyboardHandle.apply(this, [{ mario, luigi }, speed, cursors, {swingHammer}]);
  }
  updateBar();
  gameOver.apply(this);
}

function gameOver() {
  if ([mario,luigi].some((player) => player.data.values.health <= 0)){
    let winnerList = [mario,luigi].sort( (a,b) => b.data.values.health - a.data.values.health)
    console.log('gameOver')
    gameOverText.fontSize = 72
    gameOverText.color = '#fff' 
    gameOverText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2)
    gameOverText.text = `Game Over!\n${winnerList[0].name} Won!`

    //TODO: Add winner animation

    // restart game
    setTimeout( () => this.scene.restart(), 5000)
    return (winnerList)
 }
}

function swingHammer (player) {
    let now = this.time.now
    let hammer;

    // player facing left
    if (player.data.values.facing === 'left'){
      hammer = hammers.create( player.x + 38 , player.y + 23, null, null,false )
      hammer.setSize(10,10)
      hammer.name = player.name // assing name as the author of the action
      hammer.body.bounce.setTo(1,1)
      setTimeout(() =>{hammer.x = player.x + 33; hammer.y = player.y - 0}, 100)
      setTimeout(() =>{hammer.x = player.x + 33; hammer.y = player.y - 15}, 200)
      setTimeout(() =>{hammer.x = player.x + 0; hammer.y = player.y - 30}, 300)
      setTimeout(() =>{hammer.x = player.x - 25; hammer.y = player.y - 10}, 400)
      setTimeout(() =>{hammer.x = player.x - 26; hammer.y = player.y + 13}, 500)
      setTimeout(() =>{hammer.x = player.x - 24; hammer.y = player.y }, 600)
      setTimeout(() =>{hammer.destroy()}, 700)
    }else {
      hammer = hammers.create( player.x - 25 , player.y + 30, null, null, false )
      hammer.setData('author',player)
      hammer.name = player.name  // assing name as the author of the action
      hammer.setSize(10,10)
      setTimeout(() =>{hammer.x = player.x - 30; hammer.y = player.y + 0}, 100)
      setTimeout(() =>{hammer.x = player.x - 25; hammer.y = player.y - 20}, 200)
      setTimeout(() =>{hammer.x = player.x + 0; hammer.y = player.y - 30}, 300)
      setTimeout(() =>{hammer.x = player.x + 25; hammer.y = player.y - 10}, 400)
      setTimeout(() =>{hammer.x = player.x + 22; hammer.y = player.y + 15}, 500)
      // setTimeout(() =>{hammer.x = player.x - 40; hammer.y = player.y }, 600)
      setTimeout(() =>{hammer.destroy()}, 700)

    }

   
}

function updateBar(){

  const marioHealth = Math.floor(mario.data.values.health)
  const luigiHealth = Math.floor(luigi.data.values.health)

  marioBar.width = 100 + (marioHealth - 100)
  //fix
  marioBar.x = mario.x - 50
  marioBar.y = mario.y - 50
  marioBar.height = 3

  luigiBar.width = 100 + (luigiHealth - 100);
  // fix
  luigiBar.y = luigi.y - 50
  luigiBar.x = luigi.x - 50
  luigiBar.height = 3

  // increase when health go down
    luigiBar.alpha = ((luigiHealth - 100) / 100 ) * -1 
    marioBar.alpha = ((marioHealth - 100) / 100 ) * -1 


}

export default scene;


