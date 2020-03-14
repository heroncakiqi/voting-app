import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchData } from '../actions/questionActions';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'

import QuestionList from '../components/QuestionsList';
import CreateQuestion from '../components/CreateQuestion';

class HomePage extends Component {
  componentDidMount() {
    this.props.fetchData();
  }
  render() {
    const { data, loading } = this.props
    return (
      <div className="list-container">
        <CreateQuestion />
        {loading ? <div id="loader"><Loader type="Plane"/></div> : 
          <QuestionList data={data} />
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

export default connect(mapStateToProps,{fetchData})(HomePage);