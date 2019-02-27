import React, { Component } from 'react'

import QuestionItem from './QuestionItem';


class QuestionsList extends Component {


  render() {
    const { data } = this.props 
    return (
      <div className="list">       
          {data.map((item, index) => (
            <QuestionItem isDelete={this.props.isDelete} key={index} item={item}/>
          ))}  
        </div>
    )
  }
}

export default QuestionsList