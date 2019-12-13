import React, { Component } from "react";
import * as io from "socket.io-client";
import Repeatable from "react-repeatable";

export default class Controller extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: this.props.game.room,
      username: this.props.currentUser.username,
      id: this.props.currentUser.id,
      vibration: false,
    };
    this.controllerRef = React.createRef();
  }

  componentDidMount() {
    if (this.state.code === undefined) {
      this.props.history.push("/play");
    } else {
      let hostname =
        window.location.hostname === "localhost"
          ? "http://localhost:5000/games"
          : `https://${window.location.hostname}/games`;
      this.socket = io.connect(hostname);
      this.socket.emit("joinRoom", JSON.stringify(this.state));
      this.socket.on("newUser", res => {
        let data = JSON.parse(res);
        console.log(data.msg);
      });
      // this.socket.on("message", msg => console.log(msg));
    }
    this.openFullscreen();
  }

  createAction(action) {
    return JSON.stringify({
      action: action,
      username: this.state.username,
      id: this.state.id,
      room: this.state.code,
    });
  }

  vibration(action) {
    let that = this;
    if (!this.state.vibration) {
      this.setState({ vibrate: true });

      switch (action) {
        case "left":
          window.navigator.vibrate(100);
          setTimeout(() => that.setState({ vibrate: false }), 100);
          break;
        case "right":
          window.navigator.vibrate(100);
          setTimeout(() => this.setState({ vibrate: false }), 100);
          break;
        case "hammer":
          window.navigator.vibrate(700);
          setTimeout(() => this.setState({ vibrate: false }), 700);
          break;
        case "jump":
          window.navigator.vibrate(100);
          setTimeout(() => this.setState({ vibrate: false }), 100);
          break;

        default:
          break;
      }
    }
  }

  setAction(action) {
    this.socket.emit("message", this.createAction(action));
    this.vibration(action);
  }

  renderButton(btnClassName, action) {
    return (
      <Repeatable
        className={btnClassName}
        tag="button"
        type="button"
        onHold={() => this.setAction(action)}
        onRelease={() => this.setAction(action)}
      />
    );
  }

    openFullscreen() {
        
      if (this.controllerRef.requestFullscreen) {
        this.controllerRef.requestFullscreen();
      } else if (this.controllerRef.mozRequestFullScreen) {
        /* Firefox */
        this.controllerRef.mozRequestFullScreen();
      } else if (this.controllerRef.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        this.controllerRef.webkitRequestFullscreen();
      } else if (this.controllerRef.msRequestFullscreen) {
        /* IE/Edge */
        this.controllerRef.msRequestFullscreen();
      }
    }

  render() {
    return (
      <div ref={this.controllerRef} className="controller-container">
        <div className="cable"></div>
        <div className="controller">
          <div className="centerBlue">
            <div className="centerLeft"></div>
            <div className="centerRight"></div>
            <div style={{ zIndex: "3", position: "absolute" }}>
              {this.state.code}
            </div>
          </div>
          <div className="centerStart">
            <div className="SLeft"></div>
            <div className="SRight"></div>
          </div>
          <div className="centerSelect">
            <div className="SLeft"></div>
            <div className="SRight"></div>
          </div>

          <div className="controllerLeft">
            <div className="circle"></div>
            <div className="crossCenter">
              {this.renderButton("crossLeft", "left")}
              {this.renderButton("crossRight", "right")}
              <div className="crossCircle"></div>
            </div>
          </div>
          <div className="controllerRight">
            <div className="backButton1Center">
              {this.renderButton("cornerLeft1", "jump")}
              {this.renderButton("cornerRight1", "hammer")}
            </div>
            {/* <div className='backButton2Center'>
                            <div className= 'cornerLeft2'></div>
                            <div className= 'cornerRight2'></div>
                        </div> */}
          </div>
        </div>
      </div>
    );
  }
}
