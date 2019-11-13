import React, { Component } from 'react';
import { connect } from 'react-redux';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'

import { fetchData } from '../actions/questionActions';
import QuestionList from './QuestionsList';
import CreateQuestion from './CreateQuestion';


class Welcome extends Component {

  componentDidMount(){
    const authToken = this.props.match.path === '/user' ? this.props.auth.authenticated : '';
    this.props.fetchData(authToken);
  }
  
  render() {
    const { data, loading } = this.props;
    const isDelete = this.props.match.path === '/user';
    return (
      <div className="list-container">
        <CreateQuestion />
        {loading ? <div id="loader"><Loader type="Plane"/></div> : 
          <QuestionList isDelete={isDelete} data={data} />
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    data: state.questionsList,
    error: state.messages.loadingError,
    loading: state.loading.questionsLoading
  }
}

export default connect(mapStateToProps,{fetchData})(Welcome);