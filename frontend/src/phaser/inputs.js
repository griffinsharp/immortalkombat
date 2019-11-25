export function inputKeyboardHandle ({luigi, mario}, speed, cursors, {swingHammer}, marioSwingTotal, luigiSwingTotal) {
  // if (mario.body.onFloor()) && mario.play('jumping', true);

  if (!cursors.shift.isDown) {
    // hit with hammer
    if (cursors.space.isDown){
      marioHammer( () => {

      swingHammer.apply(this, [mario])

      marioSwingTotal = marioSwingTotal + 1;
      // check if right or left 
        if (mario.data.values.facing === 'right') { mario.play('m-hammer-right',false ).setCrop(0, 1, 43, 42);
        }
        if (mario.data.values.facing ==='left') { mario.play('m-hammer-left', true).setCrop(2, 2, 44, 42);
      }

      })
   }
    //jumping
      else if (cursors.up.isDown && mario.body.touching.down) {
          mario.setVelocityY(-speed * 4)
    }
    //walk left
    else if (cursors.left.isDown) {
      mario.data.values.facing = 'left'
        mario.setVelocityX(-speed)
        // if not in the air
      if (mario.body.touching.down){

    // execute if hammering action completed
    if (mario.getData('hammerCompleted')){
        mario.play('m-left', 1)
      }
      }
    }
    // walk right
    else if (cursors.right.isDown) {
  mario.data.values.facing = 'right'
      mario.setVelocityX(speed)
      // if not in the air 
      if (mario.body.touching.down){

    // execute if hammering action completed
    if (mario.getData('hammerCompleted')){
          mario.play('m-right', 1)
        }
      }
    } else {
    
    mario.setVelocityX(0);

    // execute if hammering action completed
    if (mario.getData('hammerCompleted')){

    // display standing facing 
    if (mario.data.values.facing === 'left'){ 
          mario.play('m-face-left', 1)
     }

    if (mario.data.values.facing === 'right'){
          mario.play('m-face-right', 1)
      }

    // mario is going up 
    if (!mario.body.touching.down  &&  mario.body.facing === 11){
        // check prevFacing
        // if (currentAction(mario) !== 'hammer'){
          if (mario.data.values.facing === 'left') { mario.play('m-jump-right', 1).setCrop(0,1,43,42)}
          if  (mario.data.values.facing === 'right') { mario.play('m-jump-left', 1).setCrop(0,1,43,42)}
        // }
    }
    // mario is falling
    if (!mario.body.touching.down  &&  mario.body.facing === 12){
        // if (currentAction(mario) !== 'hammer'){
          if (mario.data.values.facing === 'right') { mario.play('m-falling-right', 1).setCrop(0,1,43,42)}
          if (mario.data.values.facing === 'right') { mario.play('m-falling-left', 1).setCrop(0,1,43,42)}
        // }
    }
  }
    }

  } else {
    //LUIGI

    // hit with hammer
    if (cursors.space.isDown){
    luigiHammer(() => {
        swingHammer.apply(this, [luigi])
         luigiSwingTotal = luigiSwingTotal + 1;
        // check if right or left 
        if (luigi.data.values.facing === 'right') { luigi.play('l-hammer-right', 1).setCrop(0, 1, 43, 42);
        }
        if (luigi.data.values.facing === 'left') { luigi.play('l-hammer-left', 1).setCrop(2, 2, 44, 42);
        }
    }) 
   }
    //jumping
      else if (cursors.up.isDown && luigi.body.touching.down) {
          luigi.setVelocityY(-speed * 4)
    }
    //walk left
    else if (cursors.left.isDown) {
      luigi.data.values.facing = 'left'
        luigi.setVelocityX(-speed)
        // if not in the air
      if (luigi.body.touching.down){
    if (luigi.getData('hammerCompleted')){
        luigi.play('l-left', 1)
      }
      }
    }
    // walk right
    else if (cursors.right.isDown) {
      luigi.data.values.facing = 'right'
      luigi.setVelocityX(speed)
      // if not in the air 
      if (luigi.body.touching.down){
    if (luigi.getData('hammerCompleted')){
        luigi.play('l-right', 1)
    }
      }
    } else {
    
    luigi.setVelocityX(0);

    if (luigi.getData('hammerCompleted')){

      // display standing facing 
      if (luigi.data.values.facing === 'left'){ luigi.play('l-face-left', 1) }
      if (luigi.data.values.facing === 'right'){ luigi.play('l-face-right', 1) }

      // luigi is going up 
      if (!luigi.body.touching.down  &&  luigi.body.facing === 11){
          // check prevFacing
          if (luigi.data.values.facing === 'right') { luigi.play('l-jump-right', 1).setCrop(0,1,43,42)}
          if (luigi.data.values.facing === 'left') { luigi.play('l-jump-left', 1).setCrop(0,1,43,42)}
      }
      // luigi is falling
      if (!luigi.body.touching.down  &&  luigi.body.facing === 12){
          if (luigi.data.values.facing === 'left') { luigi.play('l-falling-right', 1).setCrop(0,1,43,40)}
          if (luigi.data.values.facing === 'left') { luigi.play('l-falling-left', 1).setCrop(0,1,43,42)}
        }
      }
    }
  }

}


let marioHammerThrottle = false
function marioHammer (callback) {
    if (!marioHammerThrottle) {
      callback();
      marioHammerThrottle = true
      setTimeout(() => marioHammerThrottle = false, 800)
    }
}
let luigiHammerThrottle = false
function luigiHammer (callback) {
    if (!luigiHammerThrottle) {
      callback();
      luigiHammerThrottle = true
      setTimeout(() => luigiHammerThrottle = false, 800)
    }
}

export function handleMessage({ luigi, mario, msg }, speed, { swingHammer }, marioSwingTotal, luigiSwingTotal) {

// player is mario
// msg.action ? right,left,jump,hammer
// msg.username ? username
  if (msg.username === mario.name) {

    // hit with hammer
    if (msg.action === 'hammer'){
      marioHammer( () => {
        swingHammer.apply(this, [mario])
        marioSwingTotal = marioSwingTotal + 1;
        // check if right or left 
        if (mario.data.values.facing === 'right') { mario.play('m-hammer-right', 1).setCrop(0, 1, 43, 42);
        }
        if (mario.data.values.facing ==='left') { mario.play('m-hammer-left', 1).setCrop(2, 2, 44, 42);
        }
      })
   }
    //jumping
      else if (msg.action === 'jump' && mario.body.touching.down) {
          mario.setVelocityY(-speed * 4)
    }
    //walk left
    else if (msg.action === 'left') {
      mario.data.values.facing = 'left'
        mario.setVelocityX(-speed)
        // if not in the air
      if (mario.body.touching.down){
    if (mario.getData('hammerCompleted')){
        mario.play('m-left', 1)
    }
      }
    }
    // walk right
    else if (msg.action === 'right') {
  mario.data.values.facing = 'right'
      mario.setVelocityX(speed)
      // if not in the air 
      if (mario.body.touching.down){
    if (mario.getData('hammerCompleted')){
        mario.play('m-right', 1)
        }
      }
    } else {

    mario.setVelocityX(0);
    
    if (mario.getData('hammerCompleted')){
    // display standing facing 
      if (mario.data.values.facing === 'left'){ mario.play('m-face-left', 1) }
      if (mario.data.values.facing === 'right'){ mario.play('m-face-right', 1) }


      // mario is going up 
      if (!mario.body.touching.down  &&  mario.body.facing === 11){
          // check prevFacing
          if (mario.data.values.facing === 'left') { mario.play('m-jump-right', 1).setCrop(0,1,43,42)}
          if  (mario.data.values.facing === 'right') { mario.play('m-jump-left', 1).setCrop(0,1,43,42)}
      }
      // mario is falling
      if (!mario.body.touching.down  &&  mario.body.facing === 12){
          if (mario.data.values.facing === 'right') { mario.play('m-falling-right', 1).setCrop(0,1,43,42)}
          if (mario.data.values.facing === 'right') { mario.play('m-falling-left', 1).setCrop(0,1,43,42)}
      }

      }
    }

  } else if (msg.username === luigi.name ) {
    //LUIGI

    // hit with hammer
    if (msg.action === 'hammer'){
      luigiHammer( () => {
        swingHammer.apply(this, [luigi])
        luigiSwingTotal = luigiSwingTotal + 1;
        // check if right or left 
        if (luigi.data.values.facing === 'right') { luigi.play('l-hammer-right', true).setCrop(0, 1, 43, 42);
        }
        if (luigi.data.values.facing === 'left') { luigi.play('l-hammer-left', true).setCrop(2, 2, 44, 42);
        }
      })
   }
    //jumping
      else if (msg.action === 'jump' && luigi.body.touching.down) {
          luigi.setVelocityY(-speed * 4)
    }
    //walk left
    else if (msg.action === 'left') {
      luigi.data.values.facing = 'left'
        luigi.setVelocityX(-speed)
        // if not in the air
      if (luigi.body.touching.down){
    if (luigi.getData('hammerCompleted')){
        luigi.play('l-left', 1)
    }
      }
    }
    // walk right
    else if (msg.action === 'right' ) {
      luigi.data.values.facing = 'right'
      luigi.setVelocityX(speed)
      // if not in the air 
      if (luigi.body.touching.down){
    if (luigi.getData('hammerCompleted')){
        luigi.play('l-right', 1)
        }
      }
    } else {
    
    luigi.setVelocityX(0);

    if (luigi.getData('hammerCompleted')){
    // display standing facing 
      if (luigi.data.values.facing === 'left'){ luigi.play('l-face-left', 1) }
      if (luigi.data.values.facing === 'right'){ luigi.play('l-face-right', 1) }

      // luigi is going up 
      if (!luigi.body.touching.down  &&  luigi.body.facing === 11){
          // check prevFacing
          if (luigi.data.values.facing === 'right') { luigi.play('l-jump-right', 1).setCrop(0,1,43,42)}
          if (luigi.data.values.facing === 'left') { luigi.play('l-jump-left', 1).setCrop(0,1,43,42)}
      }
      // luigi is falling
      if (!luigi.body.touching.down  &&  luigi.body.facing === 12){
          if (luigi.data.values.facing === 'left') { luigi.play('l-falling-right', 1).setCrop(0,1,43,40)}
          if (luigi.data.values.facing === 'left') { luigi.play('l-falling-left', 1).setCrop(0,1,43,42)}
      }

    }
  }
}
}
