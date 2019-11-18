import Phaser from "phaser";
import floor from './assets/sprites/stages/floor1.jpg'


//global variables
let backgroundImage;


const scene = {
  game: {
    width: "100%",
    height: "100%",
    type: Phaser.AUTO,
    scene: {
      preload: preload,
      init: init,
      create: create,
      update: update
    }
  }
};

function preload () {
  console.log(floor)
  this.load.image('floor1', floor);
}

function init() {
}

function create() {
  renderStage.apply(this);
    
}

function update() {
}

function renderStage ()  {
    backgroundImage = this.add.image(0, 0, 'floor1').setOrigin(0,0)
    backgroundImage.smoothed = false;
}


export default scene;




