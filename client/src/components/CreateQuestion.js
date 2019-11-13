import React, { Component } from 'react'
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { reduxForm, Field } from 'redux-form'; 
import { compose } from 'redux';


import { addQuestion, clearMessages } from '../actions/questionActions';

Modal.setAppElement('#root')


const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    padding               : '30px',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    border                : 'black 1px solid',
    borderRadius          : '255px 15px 225px 15px/15px 225px 15px 255px'
  }
};

class CreateQuestion extends Component {


  state = {
    modalIsOpen: false
  }

  openModal = () => {
    this.setState({modalIsOpen: true});
  }


  closeModal = () => {
    this.setState({modalIsOpen: false});
    this.props.clearMessages();
  }

  handleSubmit = (formProps) => {
    this.props.addQuestion(formProps, () => this.setState({modalIsOpen: false}));
  }

  render() {
    const { isAuth, errors, loading } = this.props;
    return (
      <div>
        {!isAuth ? <h3>Log in or Sign Up to create a poll!</h3> : 
          <div>
            <h3><span onClick={this.openModal} className='create'>Create a poll! 📝</span></h3>
            <Modal
              isOpen={this.state.modalIsOpen}
              onAfterOpen={this.afterOpenModal}
              onRequestClose={this.closeModal}
              style={customStyles}
              contentLabel="Example Modal"
            >
              <h2>Create New Poll 📝</h2>
              <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
                <label>
                  Poll:
                </label>
                <Field
                  name='text'
                  type='text'
                  component='input'
                  required
                  disabled={loading}
                />
                <br/>
                <label>
                  Options:
                </label>
                <Field
                  name='options'
                  type='text'
                  component='input'
                  required
                  disabled={loading}
                />
                <span className="option-info">min 2 options, seperate option by line "-"</span>
                {errors ? <span>{errors}</span> : ''}
                <br/>
                <button disabled={loading} >submit</button>
              </form>
              <button className='close' disabled={loading} onClick={this.closeModal}>&#10006;</button>
            </Modal>
          </div>
        }
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    isAuth: !!state.auth.authenticated,
    errors: state.messages.createError,
    loading: state.loading.addingQuestionLoading,
  }
}

export default compose(
  connect(mapStateToProps,{addQuestion, clearMessages}), 
  reduxForm({form: 'newQuestion'})
)(CreateQuestion);