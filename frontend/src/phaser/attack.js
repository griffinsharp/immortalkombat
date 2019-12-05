// Must be defined outside of the function
let marioSwingTimer = false;
let luigiSwingTimer = false;
let marioHealth = 20;
let luigiHealth = 20;
let gameOver = false;

export function checkHealth() {
    if (marioHealth <= 0 || luigiHealth <= 0) {
     
        let gameoverImage= this.add.image(0, 0, 'gameover').setOrigin(0, 0).setScale(0.5);
        gameOver = true;
    }
}

export function hammerTime (mario, luigi) {
    
    // given mario and luigi are colliding:
    // mario hammering right, facing right, and luigi is to the right of mario

    if (marioHealth > 0 && luigiHealth > 0) {
        debugger
        if ((mario.anims.getCurrentKey() === 'm-hammer-right') && (mario.body.facing === 14) && (mario.x < luigi.x) && (marioSwingTimer === false)) {
            
            luigiHealth -= 10;
           
            marioSwingTimer = true;
            window.setTimeout(() => { marioSwingTimer = false; }, 2000);

            // mario hammering left, facing left, and luigi is to the left of mario
        } else if ((mario.anims.getCurrentKey() === 'm-hammer-left') && (mario.body.facing === 13) && (mario.x > luigi.x) && (marioSwingTimer === false)) {
           
            luigiHealth -= 10;
           
            marioSwingTimer = true;
            window.setTimeout(() => { marioSwingTimer = false; }, 2000);

            // luigi hammering right, facing right, and mario is to the right of luigi
        } else if ((luigi.anims.getCurrentKey() === 'l-hammer-right') && (luigi.body.facing === 14) && (luigi.x < mario.x) && (luigiSwingTimer === false)) {
  
            marioHealth -= 10;
 
            luigiSwingTimer = true;
            window.setTimeout(() => { luigiSwingTimer = false; }, 2000);

            // luigi hammering left, facing left, and mario is to the left of luigi
        } else if ((luigi.anims.getCurrentKey() === 'l-hammer-left') && (luigi.body.facing === 13) && (luigi.x > mario.x) && (luigiSwingTimer === false)) {
            
            marioHealth -= 10;
          
            luigiSwingTimer = true;
            window.setTimeout(() => { luigiSwingTimer = false; }, 2000);
        }
    }
    
}