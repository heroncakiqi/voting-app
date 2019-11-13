import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import { compose } from 'redux';

class SignUp extends Component {
  componentWillUnmount() {
    if(this.props.errorMessage){
      this.props.removeError();
    }
  }
  handleSubmit = (formProps) => {
    this.props.signup(formProps, () => {
      this.props.history.push('/');
    });
  }
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
        <fieldset>
          <label>Email:</label>
          <Field
            name='email'
            type='text'
            component='input'
            disabled={this.props.disabled}
          />
          <span> {this.props.errorMessage && this.props.errorMessage.email}</span>
          <label>Password:</label>
          <Field
            name='password'
            type='password'
            component='input'
            disabled={this.props.disabled}
          />
          <span> {this.props.errorMessage && this.props.errorMessage.password}</span>
          <button disabled={this.props.disabled}>Sign Up!</button>
        </fieldset>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    errorMessage: state.auth.errorMessage,
    loading: state.loading.formLoading
  }
}

export default compose(connect(mapStateToProps, actions), reduxForm({ form: 'signup '}))(SignUp);