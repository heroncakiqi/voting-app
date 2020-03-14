import React, { Component } from 'react'
import { login, signup, removeError } from '../../actions';
import { connect } from 'react-redux';

class LogIn extends Component {
  state = {
    email: "",
    password: "",
    disabled: false,
    isLogin: this.props.match.path === "/login",
  }
  componentWillUnmount() {
    this.props.removeError()
  }
  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  } 
  handleSubmit = async (e) => {
    e.preventDefault();
    const formProps = {
      email: this.state.email,
      password: this.state.password
    }
    this.setState({disabled: true})
    if(this.state.isLogin) {
      await this.props.login(formProps, () => {
        this.props.history.push('/user');
      });
    } else {
      await this.props.signup(formProps, () => {
        this.props.history.push('/user');
      });
    }
    this.setState({disabled: false})
  }
  render() {
    const {email, password, disabled, isLogin} = this.state
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
        <fieldset>
          <label>Email:</label>
          <input
            name='email'
            type='text'
            required
            disabled={disabled}
            value={email}
            onChange={this.handleChange}
          />
          <span style={{color: "red"}}>
            {this.props.errorMessage && this.props.errorMessage.email}
          </span>
          <label>Password:</label>
          <input
            name='password'
            type='password'
            required
            disabled={disabled}
            value={password}
            onChange={this.handleChange}
          />
          <span style={{color: "red"}}>
            {this.props.errorMessage && this.props.errorMessage.password}
          </span>
          <button 
            className="submit-button" 
            disabled={disabled}
          >
            {isLogin ? "Log In!" : "Sign Up!"}
          </button>
        </fieldset>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    errorMessage: state.auth.errorMessage,
  }
}

export default connect(mapStateToProps, {login, signup, removeError})(LogIn);