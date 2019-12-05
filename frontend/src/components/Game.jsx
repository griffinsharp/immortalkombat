import { IonPhaser } from '@ion-phaser/react'
import scene from '../phaser/scene'
import React, { Component } from 'react'

export default class Game extends Component {

  constructor(props) {
    super(props);
    this.state = { count: 0 }
  }

  componentDidMount() {
    if (this.state.count === 0) this.setState({count: 1})
  }

  render() {
    return (
      <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center' }}>
        <IonPhaser style={{ width: '100%', height: '100%' }} game={scene.game} initialize={true} />
      </div>
    )
  }
}
