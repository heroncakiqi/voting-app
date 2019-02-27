import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';


import Header from './components/Header';
import Welcome from './components/Welcome';
import SignUp from './components/auth/SignUp';
import UsersQuestions from './components/UsersQuestions';
import LogOut from './components/auth/LogOut';
import LogIn from './components/auth/LogIn';
import store from './store';
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
        <div className="page">
          <Header />
          <Route path='/' exact component={Welcome} />
          <Route path='/signup' exact component={SignUp}/>
          <Route path='/user' exact component={UsersQuestions}/>
          <Route path='/logout' exact component={LogOut}/>
          <Route path='/login' exact component={LogIn}/>
        </div>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App  