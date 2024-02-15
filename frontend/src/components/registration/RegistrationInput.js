import React from "react";

export default class RegistrationInput extends React.Component {
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    event.preventDefault();
    const target = event.target;
    this.props.credentialHandler(target.name, target.value);
  }

  render() {
    return (
      <div>
        <label className={"auth-label"} id={"login-label"}>
          Your new username:
          <input
            className={"auth-input"}
            name="username"
            type="text"
            onChange={this.handleInputChange}
          />
        </label>
        <label className={"auth-label"} id={"password-label"}>
          Your new password:
          <input
            className={"auth-input"}
            name="password"
            type="password"
            onChange={this.handleInputChange}
          />
        </label>
      </div>
    );
  }
}
