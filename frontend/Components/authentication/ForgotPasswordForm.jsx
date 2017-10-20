import React from 'react';

class ForgotPasswordForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "investtwon89@gmail.com",
    }

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value} );
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.emailResetPassword(this.state.email);
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
            <input type="submit" value="Reset Password" />
        </form>
    );

    if (this.props.submittedEmail) {
      resetForm = <p>Instructions to reset your password have been sent to <span style={{color: "white", textDecoration: "underline"}}>{this.props.submittedEmail}</span>.</p>
    }

    return (
      <div>
        {resetForm}
      </div>
    );
  }
}

export default ForgotPasswordForm;
