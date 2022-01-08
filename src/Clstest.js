import React, { Component } from "react";

export default class Clstest extends Component {
  state = {
    message: "welcome",
  };
  componentDidMount() {
    setTimeout(() => {
      this.setState({ message: "Bye" });
    }, 2000);
  }

  render() {
    return <div>class component testing:{this.state.message}</div>;
  }
}
