import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import {logout} from '../actions/index';

class Header extends Component {
  handleLogout = () => {
    this.props.logout();
  }
  render() {
    const { isAuth } = this.props;
    return (
      <div className='header'>
        <div className='a'>
          <Link to='/'>Home 🏠</Link>
          <Link to='/user'>My Polls 📊</Link>
        </div>
          {!isAuth ?
            <div>
              <Link to='/login'>Log In 🔑</Link>
              <Link to='/signup'>Sign Up 📋</Link>
            </div>
            : 
            <a onClick={this.handleLogout}>Log out 👋</a>
          } 
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: !!state.auth.authenticated
  };
}

export default connect(mapStateToProps, {logout})(Header)