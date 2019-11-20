// Must be defined outside of the function
let marioSwingTimer = false;
let luigiSwingTimer = false;
let marioHealth = 20;
let luigiHealth = 20;

export function checkHealth() {
    if (marioHealth <= 0 || luigiHealth <= 0) {
        console.log('GAME OVER!');
    }
}

export function hammerTime (mario, luigi) {
    
    // given mario and luigi are colliding:
    // mario hammering right, facing right, and luigi is to the right of mario

    if (marioHealth > 0 && luigiHealth > 0) {
        if ((mario.anims.getCurrentKey() === 'm-hammer-right') && (mario.body.facing === 14) && (mario.x < luigi.x) && (marioSwingTimer === false)) {
            console.log("mario hits luigi with a right swing from the left of luigi");
            luigiHealth -= 10;
            console.log(luigiHealth);
            marioSwingTimer = true;
            window.setTimeout(() => { marioSwingTimer = false; }, 2000);

            // mario hammering left, facing left, and luigi is to the left of mario
        } else if ((mario.anims.getCurrentKey() === 'm-hammer-left') && (mario.body.facing === 13) && (mario.x > luigi.x) && (marioSwingTimer === false)) {
            console.log("mario hits luigi with a left swing from the right of luigi");
            luigiHealth -= 10;
            console.log(luigiHealth);
            marioSwingTimer = true;
            window.setTimeout(() => { marioSwingTimer = false; }, 2000);

            // luigi hammering right, facing right, and mario is to the right of luigi
        } else if ((luigi.anims.getCurrentKey() === 'l-hammer-right') && (luigi.body.facing === 14) && (luigi.x < mario.x) && (luigiSwingTimer === false)) {
            console.log("luigi hits mario with a right swing from the left of mario");
            marioHealth -= 10;
            console.log(marioHealth);
            luigiSwingTimer = true;
            window.setTimeout(() => { luigiSwingTimer = false; }, 2000);

            // luigi hammering left, facing left, and mario is to the left of luigi
        } else if ((luigi.anims.getCurrentKey() === 'l-hammer-left') && (luigi.body.facing === 13) && (luigi.x > mario.x) && (luigiSwingTimer === false)) {
            console.log("luigi hits mario with a left swing from the right of mario");
            marioHealth -= 10;
            console.log(marioHealth);
            luigiSwingTimer = true;
            window.setTimeout(() => { luigiSwingTimer = false; }, 2000);
        }
    }
    
}