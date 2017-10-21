import React from 'react';

class ForgotForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "investtwon89@gmail.com",
      forgotUsername: false,
      forgotPassword: false,
    }

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleToggleCheckbox = this.handleToggleCheckbox.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleToggleCheckbox(event) {
    const target = event.target;
    const value = target.checked
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value} );
  }

  handleSubmit(event) {
    event.preventDefault();
    if (!this.state.forgotUsername && !this.state.forgotPassword) {
      alert("Please select either forgot password or forgot username");
      return;
    }

    this.props.emailForgotAuthInfo({
      email: this.state.email,
      forgotUsername: this.state.forgotUsername,
      forgotPassword: this.state.forgotPassword,
    });
  }

  render() {

    let resetForm;

    resetForm = (
        <form className="auth-form" onSubmit={this.handleSubmit}>
           <div>
              <div className="input-field">
                <input type="text" required name="email" onChange={this.handleEmailChange} value={this.state.email} />
                 <span className="floating-label">Account Email</span>
              </div>
            </div>
            <label>Forgot Username</label>
            <input type="checkbox" name="forgotUsername" checked={this.state.forgotUsername} onChange={this.handleToggleCheckbox}/>

            <label>Forgot Password</label>
            <input type="checkbox" name="forgotPassword" checked={this.state.forgotPassword} onChange={this.handleToggleCheckbox}/>
            <input type="submit" value="Reset Password" />
        </form>
    );

    if (this.props.submittedEmail) {
      resetForm = (
        <div>
        <p>An email with the relevant information has been sent to <span style={{color: "white", textDecoration: "underline"}}>{this.props.submittedEmail}</span>.</p><button onClick={this.handleSubmit}>Resend</button>
        </div>)
    }

    return (
      <div>
        {resetForm}
      </div>
    );
  }
}

export default ForgotForm;
