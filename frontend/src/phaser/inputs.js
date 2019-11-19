export function inputHandle ({luigi, mario}, speed, cursors, time, delta, {mPrevFacing, lPrevFacing}) {
  // if (mario.body.onFloor()) && mario.play('jumping', true);


  if (!cursors.shift.isDown) {
    if (cursors.space.isDown && (cursors.right.isDown || mario.body.facing === 14)){
      mario.play('m-hammer-right', 1).setCrop(0, 1, 43, 42);

   }
    else if (cursors.space.isDown && (cursors.left.isDown || mario.body.facing === 13)){
    mario.play('m-hammer-left', 1).setCrop(2, 2, 44, 42);

    }
    else if (cursors.left.isDown) {
        // mario.x -= speed * delta;
        mario.setVelocityX(-speed)
        mario.play('m-left', 1)

      if (cursors.up.isDown && mario.body.touching.down) {
          mario.setVelocityY(-speed * 4)
          mario.play('m-jump-left', 1)
      } 
        
    }
    else if (cursors.right.isDown) {
      // mario.x += speed * delta;
      mario.setVelocityX(speed)
      mario.play('m-right', 1)

      if (cursors.up.isDown && mario.body.touching.down) {
        mario.setVelocityY(-speed * 4)
        mario.play('m-jump-right', 1)

      }
    }
    else if (cursors.up.isDown && mario.body.touching.down){
      mario.setVelocityY(-speed * 4)
      mario.play('m-jump-left', 1)
    }
    else if (cursors.up.isDown && cursors.right.isDown && mario.body.touching.down){
      mario.setVelocityY(-speed * 4)
      mario.play('m-jump-right', 1)
    }
    else if (mario.body.facing === 13){
    mario.play('m-face-left', 1) 

    } else if (mario.body.facing === 14){
    mario.play('m-face-right', 1)

    } else {
    
      mario.play('m-standing', 1)
      mario.setVelocityX(0);

      luigi.play('l-standing', 1)
      luigi.setVelocityX(0);

    }

  } else {

    // lugi handler
    // need to hold shift
     if (cursors.space.isDown && (cursors.right.isDown || luigi.body.facing === 14)){
      luigi.play('l-hammer-right', 1).setCrop(0, 1, 43, 42);

   }
    else if (cursors.space.isDown && (cursors.left.isDown || luigi.body.facing === 13)){
    luigi.play('l-hammer-left', 1).setCrop(2, 2, 44, 42);

    }
    else if (cursors.left.isDown) {
        // luigi.x -= speed * delta;
        luigi.setVelocityX(-speed)
        luigi.play('l-left', 1)

      if (cursors.up.isDown && luigi.body.touching.down) {
          luigi.setVelocityY(-speed * 4)
          luigi.play('l-jump-left', 1)
      } 
        
    }
    else if (cursors.right.isDown) {
      luigi.setVelocityX(speed)
      luigi.play('l-right', 1)

      if (cursors.up.isDown && luigi.body.touching.down) {
        luigi.setVelocityY(-speed * 4)
        luigi.play('l-jump-right', 1)

      }
    }
    else if (cursors.up.isDown && luigi.body.touching.down){
      luigi.setVelocityY(-speed * 4)

    }
    else if (cursors.up.isDown && cursors.right.isDown && luigi.body.touching.down){
      luigi.setVelocityY(-speed * 4)
      luigi.play('l-jump-right', 1)
    }
    else if (luigi.body.facing === 13){
    luigi.play('l-face-left', 1) 

    } else if (luigi.body.facing === 14){
    luigi.play('l-face-right', 1)

    } else {
      luigi.play('l-standing', 1)
      luigi.setVelocityX(0);
    }
}

  // play animation if body in the air

  console.log(luigi.body.facing, lPrevFacing)
if (!luigi.body.touching.down){
    if (lPrevFacing === 13) {
        luigi.play('l-jump-left', 1).setCrop(0, 1, 43, 42);
    } else if (lPrevFacing === 14)  {
        luigi.play('l-jump-right', 1)
    }
}

if (!mario.body.touching.down){
    if ( mPrevFacing === 13) {
        mario.play('m-jump-left', 1)
    } else if (mPrevFacing === 14){
        mario.play('m-jump-right', 1)
    }
}


}

