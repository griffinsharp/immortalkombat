export function renderSprites (luigi, mario)  {
  
    

    // mario animation
    this.anims.create({
      key: 'm-left',
      frames: this.anims.generateFrameNumbers('mario', {
        frames: [0,1,4]
         }),
      frameRate: 5,
      repeat: -1
    });

    this.anims.create({
      key: 'm-falling-right',
      frames: this.anims.generateFrameNumbers('mario', {
        frames: [11]
         }),
      frameRate: 5,
      repeat: -1
    });

    this.anims.create({
      key: 'm-falling-left',
      frames: this.anims.generateFrameNumbers('mario', {
        frames: [8]
         }),
      frameRate: 5,
      repeat: -1
    });


  this.anims.create({
    key: 'm-right',
    frames: this.anims.generateFrameNumbers('mario', {
      frames: [6,7,5]
        }),
    frameRate: 5,
    repeat: -1
  });

  this.anims.create({
    key: 'm-standing',
    frames: this.anims.generateFrameNumbers('mario', { start: 3, end: 3 }),
    frameRate: 30,
    repeat: -1
  });

  this.anims.create({
    key: 'm-face-right',
    frames: this.anims.generateFrameNumbers('mario', { frames: [5] }),
    frameRate: 30,
    repeat: -1
  });

  this.anims.create({
    key: 'm-face-left',
    frames: this.anims.generateFrameNumbers('mario', { frames: [4] }),
    frameRate: 30,
    repeat: -1
  });

  this.anims.create({
    key: 'm-jump-right',
    frames: this.anims.generateFrameNumbers('mario', {
      frames: [10]
         }),
    frameRate: 5,
    repeat: -1
  });

  this.anims.create({
    key: 'm-jump-left',
    frames: this.anims.generateFrameNumbers('mario', {
      frames: [9] 
         }),
    frameRate: 5,
    repeat: -1
  });

  this.anims.create({
    key: 'm-hammer-right',
    frames: this.anims.generateFrameNumbers('mario',
    { frames: [30, 29, 28, 27, 26, 25, 24] }),
    frameRate: 9,
    repeat: 0 
  });

   this.anims.create({
    key: 'm-hammer-left',
    frames: this.anims.generateFrameNumbers('mario', {
       frames: [16, 17, 18, 19, 20, 21, 22] }),
    frameRate: 9,
    repeat: 0
  })

  this.anims.create({
    key: 'm-winner',
    frames: this.anims.generateFrameNumbers('mario', {
       frames: [14] }),
    frameRate: 9,
    repeat: -1
  });

  this.anims.create({
    key: 'm-back',
    frames: this.anims.generateFrameNumbers('mario', {
       frames: [2] }),
    frameRate: 9,
    repeat: -1
  });


  // lugi animation

    this.anims.create({
      key: 'l-back',
      frames: this.anims.generateFrameNumbers('luigi', {
        frames: [2]
         }),
      frameRate: 5,
      repeat: -1
    });


    this.anims.create({
      key: 'l-left',
      frames: this.anims.generateFrameNumbers('luigi', {
        frames: [0,4,1]
         }),
      frameRate: 5,
      repeat: -1
    });

  this.anims.create({
    key: 'l-right',
    frames: this.anims.generateFrameNumbers('luigi', {
      frames: [6,5,7]
        }),
    frameRate: 5,
    repeat: -1
  });

  this.anims.create({
    key: 'l-standing',
    frames: this.anims.generateFrameNumbers('luigi', { start: 3, end: 3 }),
    frameRate: 30,
    repeat: -1
  });

    this.anims.create({
      key: 'l-falling-left',
      frames: this.anims.generateFrameNumbers('luigi', {
        frames: [8]
         }),
      frameRate: 5,
      repeat: -1
    });

    this.anims.create({
      key: 'l-falling-right',
      frames: this.anims.generateFrameNumbers('luigi', {
        frames: [11]
         }),
      frameRate: 5,
      repeat: -1
    });

  this.anims.create({
    key: 'l-face-right',
    frames: this.anims.generateFrameNumbers('luigi', { frames: [5] }),
    frameRate: 30,
    repeat: -1
  });

  this.anims.create({
    key: 'l-face-left',
    frames: this.anims.generateFrameNumbers('luigi', { frames: [4] }),
    frameRate: 30,
    repeat: -1
  });

  this.anims.create({
    key: 'l-jump-right',
    frames: this.anims.generateFrameNumbers('luigi', {
      frames: [10]
        }),
    frameRate: 5,
    repeat: -1
  });

  this.anims.create({
    key: 'l-jump-left',
    frames: this.anims.generateFrameNumbers('luigi', {
      frames: [9]
         }),
    frameRate: 5,
    repeat: -1
  });

  this.anims.create({
    key: 'l-hammer-right',
    frames: this.anims.generateFrameNumbers('luigi',
    { start: 24, end: 30}),
    frameRate: 9,
    repeat: 0
  });

  this.anims.create({
    key: 'l-hammer-left',
    frames: this.anims.generateFrameNumbers('luigi', {
       frames: [22, 21, 20, 19, 18, 17, 16] }),
    frameRate: 9,
    repeat: 0
  });

  this.anims.create({
    key: 'l-winner',
    frames: this.anims.generateFrameNumbers('luigi', {
       frames: [14] }),
    frameRate: 9,
    repeat: -1
  });

    
}