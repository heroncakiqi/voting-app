import React, { Component } from 'react'
import { connect } from 'react-redux';

import { selectQuestion, deleteQuestion } from '../actions/questionActions';
import Chart from './Chart';

class QuestionItem extends Component {
  handleClick =  (e) => {
    const cardId = this.props.isActive ? null : this.props.item;
     this.props.selectQuestion(cardId);
  }
  handleDeleteClick = e => {
    const questionId = this.props.item._id;
    this.props.deleteQuestion(questionId);
  }
  componentWillUnmount() {
    this.props.selectQuestion(null);
  }
  
  render() {
    const { isActive } = this.props;
    const { text } = this.props.item;
    const { isDelete } = this.props;
    return (
      <div  className={`question-card ${isActive ? 'active' : ''}`}>
        <div style={{padding: '10px', width: '95%'}} onClick={this.handleClick}>
          {text.includes('?') ? text : `${text}?`} 
        </div>{isDelete && <button onClick={this.handleDeleteClick} className='delete-question'>❌</button>}
          {isActive ? <Chart /> : ''}
      </div>
    )
  }
}

const mapStateToPorps = (state, ownProps) => {
  return {
    isActive: state.activeQuestion ? state.activeQuestion._id === ownProps.item._id : false
  }
}

export default connect(mapStateToPorps,{selectQuestion,deleteQuestion})(QuestionItem);