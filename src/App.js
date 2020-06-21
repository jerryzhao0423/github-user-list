import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Header from './Components/Header'
import UserDetailPage from './Page/UserDetailPage'
import UserListPage from './Page/UserListPage'
import './App.scss'

class App extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="app">
        <Header />
        <Switch>
          <Route path="/" exact render={(props) => <UserListPage {...props} />} />
          <Route path="/user/:username" exact render={(props) => <UserDetailPage {...props} />} />
          <Route path="*" render={() => <div>Not Found</div>} />
        </Switch>
      </div>
    )
  }
}

export default App
