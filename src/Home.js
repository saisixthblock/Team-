import React, { Component } from "react";

export default class Home extends Component {
  state = {
    name: "",
    password: "",
    email: "",
  };
  inputRef = React.createRef();

  componentDidMount() {
    this.inputRef.current.focus();
  }
  emailChange = (expect) => {
    this.setState({ email: expect.target.value }, () =>
      console.log(this.state.email)
    );
  };
  submitHandler = (expect) => {
    console.log("hiiii", expect);
    expect.preventDefault();
    this.setState({});
  };

  render() {
    return (
      <div>
        <h1>Basic Form</h1>
        <form id="form" onSubmit={this.submitHandler}>
          <label>Name:</label>
          <input
            id="name"
            type="text"
            placeholder="ref activated"
            ref={this.inputRef}
          />
          <br />
          <br />
          <label>Password:</label>
          <input id="password" type="password" />
          <br />
          <br />
          <label>Email:</label>
          <input
            id="email"
            type="email"
            value={this.state.email}
            name="email"
            onChange={this.emailChange}
          />
          <br />
          <br />
          <input id="male" type="radio" />
          <label>Male</label>
          <input id="female" type="radio" />
          <label>Female</label>

          <br />
          <br />
          <label>Date:</label>
          <input id="date" type="date" />
          <br />
          <br />
          <button type="submit">click me</button>
        </form>
      </div>
    );
  }
}
