import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
import './UserListPage.scss'

class UserListPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userList: [],
    }
  }
  componentDidMount() {
    const lastId = window.localStorage.getItem('lastId')
    this.getData(lastId)
  }

  _handleNextPage = () => {
    const { userList } = this.state
    const lastId = userList[userList.length - 1].id
    window.localStorage.setItem('lastId', lastId)
    this.getData(lastId)
  }

  getData = (lastId) => {
    fetch(`https://api.github.com/users?since=${lastId}`, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
      method: 'get',
    })
      .then((res) => res.json())
      .then((data) => this.setState({ userList: data }))
  }

  render() {
    const { userList } = this.state
    return (
      <div className="userListPage">
        <Button variant="outlined" onClick={this._handleNextPage} component="span">
          Next Page
        </Button>
        <div className="userList">
          {userList.map((user) => (
            <Link key={user.id} className="userSingleLine" to={'/user/' + user.login}>
              <img src={user.avatar_url} alt={user.login} className="userAvatar" />
              <div className="userName">{user.login}</div>
            </Link>
          ))}
        </div>
        <Button variant="outlined" onClick={this._handleNextPage} component="span">
          Next Page
        </Button>
      </div>
    )
  }
}

export default UserListPage
