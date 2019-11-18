import Phaser from "phaser";

const scene = {
  game: {
    width: "100%",
    height: "100%",
    type: Phaser.AUTO,
    scene: {
      init: init,
      create: create,
      update: update
    }
  }
};

function init() {
  this.cameras.main.setBackgroundColor("#24252A");
}

function create() {
  this.helloWorld = this.add.text(
    this.cameras.main.centerX,
    this.cameras.main.centerY,
    "Hello World",
    {
      font: "40px Arial",
      fill: "#ffffff"
    }
  );
  this.helloWorld.setOrigin(0.5);
}

function update() {
  this.helloWorld.angle += 1;
}

export default scene;
