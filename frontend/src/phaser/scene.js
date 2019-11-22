import Phaser from "phaser";
import marioSprite from './assets/sprites/mario/mario.png';
import luigiSprite from './assets/sprites/luigi/luigi.png';
import marioBackground from './assets/sprites/stages/mario-background.jpg';
import floor from './assets/sprites/stages/floor.png';
import pipe from './assets/sprites/stages/pipe.png';
import pipeRotated from './assets/sprites/stages/piperotated.png';
import {renderSprites} from './sprite_animation';
import {inputKeyboardHandle, handleMessage} from './inputs';
import * as io from 'socket.io-client'
import themeMusicPath from './assets/audio/thememusic.mp3'
import hit1Path from './assets/audio/hitsounds/hit1.mp3'
import hit2Path from './assets/audio/hitsounds/hit2.mp3'
import hit3Path from './assets/audio/hitsounds/hit3.mp3'
import hit4Path from './assets/audio/hitsounds/hit4.mp3'
import hit5Path from './assets/audio/hitsounds/hit5.mp3'
import miss1Path from './assets/audio/hitsounds/miss1.mp3'
import miss2Path from './assets/audio/hitsounds/miss2.mp3'
import miss3Path from './assets/audio/hitsounds/miss3.mp3'
import fightPath from './assets/audio/announcer/fight.mp3'
import mutePath from './assets/images/mute.png'
import speakerPath from './assets/images/speaker.png'


//global variables
let inputDevice = 'keyboard' || 'socket'
// let inputDevice = 'socket'
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
let themeMusic;
let hitaudios;
let missaudios;
let hit1audio;
let hit2audio;
let hit3audio;
let hit4audio;
let hit5audio;
let miss1audio;
let miss2audio;
let miss3audio;
let fightaudio;
let marioScore = 0;
let luigiScore = 0;
let textScore;
let gameIsOver;
let gameCodeText;
let muteBtn;
let muteImg;
let speakerImg
let mute = false;

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



function init() {
  gameIsOver = false;




  if (inputDevice !== 'keyboard'){
    let hostname =
			window.location.hostname === "localhost"
				? "http://localhost:5000/games"
        : `https://${window.location.hostname}/games`;
    socket = io.connect(hostname);
    gameState = JSON.parse(window.localStorage.getItem('gameRoom'))

    socket.on("welcome", (msg) => console.log("Received: ", msg));
    // connect to the server room
    socket.emit("joinRoom", JSON.stringify({code: gameState.code, username: "game"}));

    socket.on("message", msg => handleMessage.apply(this, [{ mario, luigi, msg }, speed, {swingHammer}]));
  }
  
}

function preload () {

  this.load.audio('thememusic', themeMusicPath )
  this.load.audio('fight', fightPath)
  this.load.audio('hit1', hit1Path)
  this.load.audio('hit2', hit2Path)
  this.load.audio('hit3', hit3Path)
  this.load.audio('hit4', hit4Path)
  this.load.audio('hit5', hit5Path)
  this.load.audio('miss1', miss1Path)
  this.load.audio('miss2', miss2Path)
  this.load.audio('miss3', miss3Path)

  this.load.image('background', marioBackground);
  this.load.image('pipe', pipe);
  this.load.image('pipeRotated', pipeRotated);
  this.load.image('floor', floor);

  this.load.image('mute', mutePath);
  this.load.image('speaker', speakerPath);

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
  backgroundImage = this.add.image(0, 0, 'background').setOrigin(0, 0).setScale(0.45).setInteractive()
  backgroundImage.smoothed = true;

  //mute button
  muteBtn = this.add.rectangle().setOrigin(0,0).setInteractive()
  muteBtn.setPosition(width - 183, 9)
  muteBtn.setDisplaySize(30, 30)
  muteBtn.setFillStyle(1,0)
  muteBtn.on('pointerdown', () => toggleMute.apply(this))

  muteImg = this.add.image(width -180, 10, 'mute').setScale(0.45).setOrigin(0,0)
  muteImg.setVisible(false)
  // muteImg.on('pointerdown', () => toggleMute.apply(this))
  // muteBtn.on('pointerdown', () => unmuteGame.apply(this))

  speakerImg = this.add.image(width -182, 10, 'speaker').setOrigin(0, 0).setScale(0.45)
  speakerImg.setVisible(true)
  // speakerBtn.on('pointerdown', () => toggleMute.apply(this))

  // sound FX
  themeMusic = this.sound.add('thememusic')
  themeMusic.play({loop:true, volume: 0.2, delay: 2})
  fightaudio = this.sound.add('fight')
  fightaudio.play({delay: 1});
  hit1audio = this.sound.add('hit1')
  hit2audio = this.sound.add('hit2')
  hit3audio = this.sound.add('hit3')
  hit4audio = this.sound.add('hit4')
  hit5audio = this.sound.add('hit5')
  miss1audio = this.sound.add('miss1')
  miss2audio = this.sound.add('miss2')
  miss3audio = this.sound.add('miss3')

  hitaudios = [hit1audio, hit2audio, hit3audio,hit4audio,hit5audio]
  missaudios = [miss1audio, miss2audio, miss3audio]

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

  // score text
  gameCodeText = this.add.text();
  gameCodeText.setOrigin(0.5)
  gameCodeText.setColor('#34d2eb')
  gameCodeText.setFontSize(15)
  // gameCodeText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2)
  gameCodeText.x = width - 59
  gameCodeText.y =  18
  gameCodeText.text = `Room: ${gameState ? gameState.code: '#TEST'}`


  //default facing
  luigi.setData('facing','right')
  mario.setData('facing','left')

  mario.setBounce(0.2);
  mario.setCollideWorldBounds(true);
  luigi.setBounce(0.2);
  luigi.setCollideWorldBounds(true);

  //define projectile hammer
  hammers = this.physics.add.group({ immovable: true, allowGravity: false})
  hammers.enableBody = true;

  // assign username to player
  if (gameState) {
    mario.setName(gameState.players[1])
    luigi.setName(gameState.players[0])
  }else {
    luigi.setName('luigi')
    mario.setName('mario')
  }

  //game over text
  gameOverText = this.add.text();
  gameOverText.setOrigin(0.5)
  gameOverText.setColor('#d9250d')
  gameOverText.setFontSize(92)
  gameOverText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2)
  gameOverText.setX(width / 2)
  gameOverText.setY(height / 2)

  // game score text
  textScore = this.add.text();
  // textScore.setFont('Press Start 2P')
  textScore.setOrigin(0.5)
  textScore.setX(90)
  textScore.setY(70)
  // textScore.setPadding(10,40,10,10)
  textScore.setFontSize(25)
  textScore.setLineSpacing(20)
  textScore.setColor('#07db00')
  textScore.setStroke('#E0E4E4', 5)
  // textScore.setShadow(3, 3, 'rgba(29,76,219,0.5)', 2)
  textScore.text = `${mario.name}: ${marioScore}\n${luigi.name}: ${luigiScore}`

  //set default hitbox size
  mario.setSize(14,31)
  mario.setOffset(16,12)

  luigi.setSize(14,31)
  luigi.setOffset(16,12)

  mario.on('animationcomplete', function (anim, frame) {
    console.log(anim,frame)
    // this.emit('animationcomplete_' + anim.key, anim, frame);
  }, mario);

  // set colision and global phisycs
  this.physics.add.collider(platforms, mario);
  this.physics.add.collider(platforms, luigi);

  // hit detection
  this.physics.add.overlap(hammers, luigi, (player, hammer) => {
    if (player.name !== hammer.name) {
      player.data.values.health -= 0.5;
      playHitSound();
     }
     
     }, null );

  this.physics.add.overlap(hammers, mario, (player, hammer) => {
    if (player.name !== hammer.name) {
      player.data.values.health -= 0.5;
      playHitSound();
      } }, null );

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

  // check if game is muted 
  if (mute) {
    this.sound.setMute(mute)
    muteImg.setVisible(true)
    speakerImg.setVisible(false)
  }else {
    muteImg.setVisible(false)
    speakerImg.setVisible(true)
    this.sound.setMute(mute)
  }

  renderSprites.apply(this, [luigi, mario]);
  // add a keyboard as cursor
    cursors = this.input.keyboard.createCursorKeys();
}

function update(time, delta) {
  if (!gameIsOver){
    if (inputDevice === 'keyboard') {
      inputKeyboardHandle.apply(this, [{ mario, luigi }, speed, cursors, {swingHammer}]);
    }
    gameOver.apply(this);
  }
    updateBar();

}

function gameOver() {
  if (!gameIsOver) {

  if ([mario,luigi].some((player) => player.data.values.health <= 0)){
    let winnerList = [mario,luigi].sort( (a,b) => b.data.values.health - a.data.values.health)

    gameOverText.text = `Game Over!\n${winnerList[0].name} Won!`

    
    // add player score
      if (winnerList[0].name === 'mario') {
          marioScore++;
          mario.play('m-winner')
          luigi.play('l-back')
        }else{
          luigiScore++
          luigi.play('l-winner')
          mario.play('m-back')
        }
      
      textScore.text = `${mario.name}: ${marioScore}\n${luigi.name}: ${luigiScore}`


    // restart game
    setTimeout( () => this.scene.restart(), 5000)

    gameIsOver = true;
  }
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
      setTimeout(() =>{hammer.destroy()}, 700)
    }
}


let missThrottle = false
function playMissSound () {
    if (!missThrottle) {
      missaudios[Math.floor(Math.random() * missaudios.length)].play();
      missThrottle = true
      setTimeout(() => missThrottle = false, 1000)
    }
}

let hitThrottle = false
function playHitSound () {
    if (!hitThrottle) {
      hitaudios[Math.floor(Math.random() * hitaudios.length)].play();
      hitThrottle = true
      setTimeout(() => hitThrottle = false, 1000)
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

    if (gameIsOver){
      luigiBar.setVisible(false)
      marioBar.setVisible(false)
    }
}


function toggleMute () {
  if (mute){
    mute = false
    muteImg.setVisible(false)
    speakerImg.setVisible(true)

    this.sound.setMute(mute)

  }else {
    mute = true
    muteImg.setVisible(true)
    speakerImg.setVisible(false)

    this.sound.setMute(mute)

  }

}

export default scene;


