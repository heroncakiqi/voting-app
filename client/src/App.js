import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import HomePage from './pages/HomePage'
import UsersPage from './pages/UsersPage'

import Header from './components/Header';
import LogIn from './pages/LogIn';
import store from './store';
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="page">
            <Header />
            <Route path='/' exact component={HomePage} />
            <Route path='/signup' exact component={LogIn}/>
            <Route path='/user' exact component={UsersPage}/>
            <Route path='/login' exact component={LogIn}/>
          </div>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App  