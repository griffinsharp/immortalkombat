import React, { Component } from "react";
import QrReader from "react-qr-reader";
import NavBarContainer from "../nav/navbar_container";
import { BrowserView, MobileView, isBrowser, isMobile } from "react-device-detect";

export default class Play extends Component {

	constructor(props) {
		super(props);
		this.state = {
			code: "",
			username: this.props.currentUser.username,
			id: this.props.currentUser.id
		};
	}


  handleScan = data => {
    if (data) {
      this.setState({
        code: data,
	  });
	  if (data.length === 5){
		this.props.addGameRoom(this.state.code);
		this.props.history.push("/controller");
	  }
    }
  };
  handleError = err => {
    console.error(err);
  };

  update(field) {
    return e =>
      this.setState({
        [field]: e.currentTarget.value,
      });
  }

  render() {
    return (
      <div className='play'>
        <NavBarContainer />
          <BrowserView >
              <div style={{display:'flex',flexDirection:'column', justifyContent:'center',paddingTop:'30px', alignItems:"center", color: '#ffffff'}} >
            <h1>Please access this page on your mobile phone. </h1>
              <p>(You are seeing this warning if you are on a desktop browser!)</p>
                </div>
        </BrowserView>
          <MobileView>
        <div
          style={{
            fontFamily: "Montserrat",
            fontWeight: "300",
            fontSize: "2em",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <div style={{flexWrap:'wrap', wordBreak: 'break-all', display: "flex", justifyContent: "center", marginTop: "50px"}}>
            {" "}
            Add Code{" "}
            <span style={{ color: "red", fontWeight: "500" }}>
              &nbsp;or&nbsp;
            </span>{" "}
            scan QR code.
          </div>
          <form className="play-form">
            <input
              style={{ textAlign: "center"}}
              type="text"
              placeholder="Code"
              value={this.state.code}
              onChange={this.update("code")}
            />
            <button
              style={{ fontSize: "0.9em" }}
              className="btn btn-flat"
              type="submit"
              onClick={() => {
                this.props.addGameRoom(this.state.code);
                this.props.history.push("/controller");
              }}
            >
              Go!
            </button>
          </form>
          <div
            style={{
              paddingBottom: "1em",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            {this.state.code === "" && (
              <QrReader
                delay={300}
                onError={this.handleError}
                onScan={this.handleScan}
                style={{ width: "50%" }}
              />
            )}
          </div>
        </div>
        </MobileView>
      </div>
    );
  }
}
