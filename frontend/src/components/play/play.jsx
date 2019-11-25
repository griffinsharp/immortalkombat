import React, { Component } from "react";
import QrReader from "react-qr-reader";
import NavBarContainer from "../nav/navbar_container";

export default class Play extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: "",
      username: this.props.currentUser.username,
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
      <>
        <NavBarContainer />
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
          <div style={{ display: "flex", justifyContent: "center" }}>
            {" "}
            Add Code{" "}
            <span style={{ color: "red", fontWeight: "500" }}>
              &nbsp;or&nbsp;
            </span>{" "}
            scan QR code.
          </div>
          <form style={{ display: "flex", justifyContent: "center" }}>
            <input
              style={{ width: "30%" }}
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
              paddingTop: "2em",
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
      </>
    );
  }
}
