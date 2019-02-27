import React, { Component } from 'react';
import { connect } from 'react-redux';


import { fetchData } from '../actions/questionActions';
import QuestionList from './QuestionsList';
import CreateQuestion from './CreateQuestion';


class Welcome extends Component {

  componentDidMount(){
    this.props.fetchData();
  }
  
  render() {
    const { data } = this.props;
    return (
      <div className="list-container">
        <CreateQuestion />
        <QuestionList data={data} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    data: state.questionsList,
    error: state.messages.loadingError
  }
}

export default connect(mapStateToProps,{fetchData})(Welcome);