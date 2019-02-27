import React, { Component } from 'react'
import { Doughnut } from 'react-chartjs-2';
import { connect } from 'react-redux';
import getRandomColor from '../utils/getRandomColor';
import { vote, createOption, clearMessages } from '../actions/questionActions';

class Chart extends Component {
  state = {
    colors: getRandomColor(this.props.poll.options.map(item => item.count).length),
    option: '',
    create: ''
  }
  
  handleChange = e => {
    this.setState({option: e.target.value})
  }

  handleSubmit = () => {
    if(this.state.option !== '' || this.state.option !== 'create'){
      const questionId = this.props.poll._id;
      const optionId = this.state.option;
      this.props.vote(questionId, optionId);
    }
    if(this.state.option === 'create' && this.state.option !== ''){
      this.props.createOption(this.state.create,this.props.poll._id);
    }
  }

  componentWillUnmount() {
    this.props.clearMessages();
  }

  handleChange2 = (e) => {
    this.setState({create: e.target.value});
  }

  render() {
    const { poll } = this.props;
    const labels = poll.options.map(item => item.text);
    const data = poll.options.map(item => item.count);
    return (
      <div className="chart">
        <div style={{display: 'flex'}}>
          <div className='select'>
              <select value={this.state.option} name='select' onChange={this.handleChange}>
                <option value="option">select an option</option>
                {poll.options.map((item,index) => {
                  return <option key={index} value={item._id}>{item.text}</option>
                })}
                <option value="create">create own option</option>
              </select> 
              {this.state.option === 'create' ? 
                <input onChange={this.handleChange2} type="text" name="" id=""/>: 
              ''}
              <button onClick={this.handleSubmit}>vote!</button>

          </div>
          <div className="dou">
            <Doughnut 
              data={{
                labels,
                datasets: [{
                  data,
                  backgroundColor: this.state.colors
                }]
              }}
              width={160}
              height={160}
              options={{
                maintainAspectRatio: false
            }}
            />
          </div>
        </div>
        <span className='voting-error'>{this.props.error && `${this.props.error}!`}</span>
        <span className='voting-success'>{this.props.success && `${this.props.success}`} {}</span>
      </div>
    )
  }
}



const mapStateToProps = state => {
  return {
    poll: state.activeQuestion,
    error: state.messages.votingError,
    success: state.messages.votingSuccess
  }
}

export default connect(mapStateToProps,{vote,createOption,clearMessages})(Chart)