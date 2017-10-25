import React from 'react';

class ForgotForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "investtwon89@gmail.com",
      forgotUsername: false,
      forgotPassword: true,
    }

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.toggleUsernameCheck = this.toggleUsernameCheck.bind(this);
    this.togglePasswordCheck = this.togglePasswordCheck.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleUsernameCheck(event) {
    this.setState({
      forgotUsername: !this.state.forgotUsername,
    })
  }

  togglePasswordCheck(event) {
    this.setState({
      forgotPassword: !this.state.forgotPassword,
    })
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value} );
  }

  handleSubmit(event) {
    event.preventDefault();

    // Goes back to the form to resubmit their email
    if (this.props.submittedEmail) {
      this.props.clearSubmittedEmail();
      return;
    }

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
          <div>
            <div className="checkbox-container">
              <div className={"forgot-checkboxes" + (this.state.forgotUsername ? " checked" : "")} onClick={this.toggleUsernameCheck}>
                <input type="checkbox" name="forgotUsername" checked={this.state.forgotUsername} onChange={this.toggleUsernameCheck}/>
                <label onClick={this.toggleUsernameCheck} htmlFor="forgotUsername"></label>
              </div>
              <span>Forgot Username</span>
            </div>
            <div className="checkbox-container">
              <div className={"forgot-checkboxes" + (this.state.forgotPassword ? " checked" : "")} onClick={this.togglePasswordCheck}>
                <input type="checkbox" name="forgotPassword" checked={this.state.forgotPassword} onChange={this.togglePasswordCheck}/>
                <label onClick={this.togglePasswordCheck} htmlFor="forgotPassword"></label>
              </div>
              <span>Forgot Password</span>
            </div>
          </div>
          <input type="submit" value="Submit" />
        </form>
    );

    if (this.props.submittedEmail) {
      resetForm = (
        <div className="auth-form">
          <p style={{color: "black", marginBottom: "1em"}}>An email with the relevant information has been sent to <span style={{color: "white", textDecoration: "underline" }}>{this.props.submittedEmail}</span>.</p><button type="submit" onClick={this.handleSubmit}>Resend</button>
        </div>
      )
    }

    return (
      <div>
        {resetForm}
      </div>
    );
  }
}

export default ForgotForm;
