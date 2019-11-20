import React  from 'react'
import { IonPhaser } from '@ion-phaser/react'
import scene from '../phaser/scene'

class Game extends React.Component  {

  constructor(props) {
    super(props)
    this.state = {
          code: `${Math.floor(10000 + Math.random() * 90000)}`,
          username: 'Game'
        }
    }
  
    render() {
    scene.code = 'test'
      return (
      <>
        <IonPhaser  game={scene.game} initialize={true} />
      </>
      )
    }

  }
export default Game;
