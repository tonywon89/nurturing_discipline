import React from 'react';

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // email: "test@test.com",
      // username: "test",
      // password: "curious",
      // passwordConfirmation: "curious",

      email: "",
      username: "",
      password: "",
      passwordConfirmation: "",
      errors: [],
    }

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handlePassConfirmChange = this.handlePassConfirmChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
  }

  handleRegisterSubmit(event) {
    event.preventDefault();
    let errors = []
    if (this.state.email.trim() === "") {
      errors.push("An email must be entered for registration");
    }

    if (this.state.username.trim() === "") {
      errors.push("A username must be entered for registration");
    }

    if (this.state.password.trim() === "") {
      errors.push("A password must be entered for registration");
    }

    if (this.state.password.trim() !== this.state.passwordConfirmation) {
      errors.push("The passwords don't match");
    }

    if (errors.length !== 0) {
      this.setState({ errors });
      return;
    }

    this.props.register({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      username: this.state.username,
      password: this.state.password
    })
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handleUsernameChange(event) {
    this.setState({ username: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  handlePassConfirmChange(event) {
    this.setState({ passwordConfirmation: event.target.value });
  }

  render() {
    let userErrors;

    if (this.state.errors.length > 0) {
      userErrors = this.state.errors.map((error, idx) => {
        return (<li key={idx}><i className="fa fa-exclamation-circle" aria-hidden="true"></i> {error}</li>);
      });
    } else {
      userErrors = null;
    }

    return (
      <div>
        <ul className="error-notifications">
          {userErrors}
        </ul>

        <form className="auth-form" onSubmit={this.handleRegisterSubmit}>
          <div>
            <div className="input-field">
              <input className={this.state.email !== "" ? "valid" : ""} type="email" name="email" required value={this.state.email} onChange={this.handleEmailChange} placeholder=" "/>
              <span className="floating-label">Email</span>
            </div>

            <div className="input-field">
              <input type="text" name="username" required value={this.state.username} onChange={this.handleUsernameChange} />
              <span className="floating-label">Username</span>
            </div>

            <div className="input-field">
              <input type="password" required name="password" value={this.state.password} onChange={this.handlePasswordChange} />
              <span className="floating-label">Password</span>
            </div>

            <div className="input-field">
              <input type="password" required name="passwordConfirmation" value={this.state.passwordConfirmation} onChange={this.handlePassConfirmChange} />
              <span className="floating-label">Confirm Password</span>
            </div>
          </div>

          <input type="submit" value="Sign Up" />
           <p className="auth-alt">Already a member? <a onClick={this.props.openLoginForm}>Login</a></p>
        </form>
      </div>
    );
  }
}

export default RegisterForm;
