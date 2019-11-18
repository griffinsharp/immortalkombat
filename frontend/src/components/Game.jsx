import React from 'react'
import { IonPhaser } from '@ion-phaser/react'
import scene from '../phaser/scene'
 
const Game = () => {
    return (
      <IonPhaser game={scene.game} initialize={true} />
    )
  }
export default Game;
