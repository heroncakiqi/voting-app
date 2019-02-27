import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';

class LogOut extends Component {
  componentWillMount() {
    this.props.logout();
  }
  render() {
    return (
      <div>
        byeee byeee!
      </div>
    )
  }
}

export default connect(null, actions)(LogOut);