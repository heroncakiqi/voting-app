import React, { Component } from 'react'
import requireAuth from './requireAuth';
import { connect } from 'react-redux';


import QuestionsList from './QuestionsList';
import CreateQuestion from './CreateQuestion';
import { fetchUserData } from '../actions/questionActions';


class UsersQuestion extends Component {

  componentDidMount() {
    this.props.fetchUserData();
  }

  render() {
    const {data} = this.props
    return (
      <div className="list-container">
        <CreateQuestion />
        <QuestionsList isDelete={true} data={data} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    data: state.userQuestions
  }
}

export default connect(mapStateToProps, {fetchUserData})(requireAuth(UsersQuestion));