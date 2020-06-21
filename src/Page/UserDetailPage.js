import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import { Link } from 'react-router-dom'
import './UserDetailPage.scss'

class UserDetailPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userDetail: {},
    }
  }
  componentDidMount() {
    const { match } = this.props
    const userName = match && match.params && match.params.username
    fetch(`https://api.github.com/users/${userName}`, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
      method: 'get',
    })
      .then((res) => res.json())
      .then((data) => this.setState({ userDetail: data }))
  }

  render() {
    const { userDetail } = this.state
    return (
      <div className="userDetailPage">
        <Link to={'/'} className="backBtn">Back to List</Link>
        <div className="userDetail">
          <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={3}>
            <Hidden only="xs"><Grid item xs={0} sm={1} /></Hidden>
            <Grid item xs={3} sm={2}>
              <img src={userDetail.avatar_url} alt={userDetail.login} className="userAvatar" />
            </Grid>
            <Grid item xs={9} sm={8}>
              <Paper className="UserInfoCard">
                <div className="userName">{userDetail.name}</div>
                <div className="userLogin">{userDetail.login}</div>
                <div className="userLocation">
                  <LocationOnIcon />
                  <span>{userDetail.location}</span>
                </div>
              </Paper>
              <Paper className="UserInfoCard">
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={4}>
                    <div className="userInfoLabel">Followers</div>
                    <div className="userInfoNum">{userDetail.followers}</div>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <div className="userInfoLabel">Following</div>
                    <div className="userInfoNum">{userDetail.following}</div>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <div className="userInfoLabel">Public Repositories</div>
                    <div className="userInfoNum">{userDetail.public_repos}</div>
                  </Grid>
                </Grid>
              </Paper>
              <Button variant="outlined" href={userDetail.html_url}>
                User's Github Page
              </Button>
            </Grid>
            <Hidden only="xs"><Grid item xs={0} sm={1} /></Hidden>
          </Grid>
        </div>
      </div>
    )
  }
}

export default UserDetailPage
