import React  from 'react'
import { IonPhaser } from '@ion-phaser/react'
import scene from '../phaser/scene'

class Game extends React.Component  {

  constructor(props) {
    super(props)
    }
  
    render() {
      return (
      <>
        <IonPhaser  game={scene.game} initialize={true} />
      </>
      )
    }

  }
export default Game;
