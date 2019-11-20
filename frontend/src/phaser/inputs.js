export function inputHandle ({luigi, mario}, speed, cursors, time, delta, {marioFacing, luigiFacing, setMarioFacing, setLuigiFacing}) {
  // if (mario.body.onFloor()) && mario.play('jumping', true);


  if (!cursors.shift.isDown) {

    // hit with hammer
    if (cursors.space.isDown){

      // check if right or left 
      if (marioFacing === 'right') { mario.play('m-hammer-right', 1).setCrop(0, 1, 43, 42);
      }
      if (marioFacing ==='left') { mario.play('m-hammer-left', 1).setCrop(2, 2, 44, 42);
      }
   }
    //jumping
      else if (cursors.up.isDown && mario.body.touching.down) {
          mario.setVelocityY(-speed * 4)
    }
    //walk left
    else if (cursors.left.isDown) {
        setMarioFacing('left')
        mario.setVelocityX(-speed)
        // if not in the air
      if (mario.body.touching.down){
        mario.play('m-left', 1)
      }
    }
    // walk right
    else if (cursors.right.isDown) {
      setMarioFacing('right')
      mario.setVelocityX(speed)
      // if not in the air 
      if (mario.body.touching.down){
        mario.play('m-right', 1)
      }
    } else {
    
    mario.setVelocityX(0);

    // display standing facing 
    if (marioFacing === 'left'){ mario.play('m-face-left', 1) }
    if (marioFacing === 'right'){ mario.play('m-face-right', 1) }


    // mario is going up 
    if (!mario.body.touching.down  &&  mario.body.facing === 11){
        // check prevFacing
        if (marioFacing === 'right') { mario.play('m-jump-right', 1).setCrop(0,1,43,42)}
        if (marioFacing === 'left') { mario.play('m-jump-left', 1).setCrop(0,1,43,42)}
    }
    // mario is falling
    if (!mario.body.touching.down  &&  mario.body.facing === 12){
        if (marioFacing === 'right') { mario.play('m-falling-right', 1).setCrop(0,1,43,42)}
        if (marioFacing === 'left') { mario.play('m-falling-left', 1).setCrop(0,1,43,42)}
    }




    }

  } else {

    // hit with hammer
    if (cursors.space.isDown){

      // check if right or left 
      if (luigiFacing === 'right') { luigi.play('l-hammer-right', 1).setCrop(0, 1, 43, 42);
      }
      if (luigiFacing ==='left') { luigi.play('l-hammer-left', 1).setCrop(2, 2, 44, 42);
      }
   }
    //jumping
      else if (cursors.up.isDown && luigi.body.touching.down) {
          luigi.setVelocityY(-speed * 4)
    }
    //walk left
    else if (cursors.left.isDown) {
        setLuigiFacing('left')
        luigi.setVelocityX(-speed)
        // if not in the air
      if (luigi.body.touching.down){
        luigi.play('l-left', 1)
      }
    }
    // walk right
    else if (cursors.right.isDown) {
      setLuigiFacing('right')
      luigi.setVelocityX(speed)
      // if not in the air 
      if (luigi.body.touching.down){
        luigi.play('l-right', 1)
      }
    } else {
    
    luigi.setVelocityX(0);

    // display standing facing 
    if (luigiFacing === 'left'){ luigi.play('l-face-left', 1) }
    if (luigiFacing === 'right'){ luigi.play('l-face-right', 1) }

    // luigi is going up 
    if (!luigi.body.touching.down  &&  luigi.body.facing === 11){
        // check prevFacing
        if (luigiFacing === 'right') { luigi.play('l-jump-right', 1).setCrop(0,1,43,42)}
        if (luigiFacing === 'left') { luigi.play('l-jump-left', 1).setCrop(0,1,43,42)}
    }
    // luigi is falling
    if (!luigi.body.touching.down  &&  luigi.body.facing === 12){
        if (luigiFacing === 'right') { luigi.play('l-falling-right', 1).setCrop(0,1,43,40)}
        if (luigiFacing === 'left') { luigi.play('l-falling-left', 1).setCrop(0,1,43,42)}
    }

  }
}

}

