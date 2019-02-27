import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


class Header extends Component {
  render() {
    const { isAuth } = this.props;
    return (
      <div className='header'>
        <div className='a'>
          <Link to='/'>Home</Link>
          <Link to='/user'>My Polls</Link>
        </div>
          {!isAuth ?
            <div>
              <Link to='/login'>Log In</Link>
              <Link to='/signup'>Sign Up</Link>
            </div>
            : 
            <Link to='logout'>Log out</Link>
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

export default connect(mapStateToProps)(Header)