import React  from 'react'
import { IonPhaser } from '@ion-phaser/react'
import scene from '../phaser/scene'

const Game = () => {
      return (
        <div style={{width: '100%', height: '100%',display:'flex', justifyContent: 'center'}}>
        <IonPhaser style={{width: '100%', height: '100%'}} game={scene.game} initialize={true} />
       </div>
      )
    }

export default Game;
