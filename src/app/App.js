import React, { Component } from 'react';
import './App.css';
import {
  Route,
  withRouter,
  Switch
} from 'react-router-dom';

import { getCurrentUser } from '../util/APIUtils';
import { ACCESS_TOKEN } from '../constants';

import PollList from '../poll/PollList';
import NewPoll from '../poll/NewPoll';
import Login from '../user/login/Login';
import Signup from '../user/signup/Signup';
import Profile from '../user/profile/Profile';
import AppHeader from '../common/AppHeader';
import NotFound from '../common/NotFound';
import LoadingIndicator from '../common/LoadingIndicator';
import PrivateRoute from '../common/PrivateRoute';
import AdminComponent from '../components/AdminComponent';

import { Layout, notification } from 'antd';
import TableComponent2 from '../components/TableComponent2';
import HistoricalDataComponent from '../components/HistoricalDataComponent';
const { Content } = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      isAuthenticated: false,
      isAdminAuthenticated: false,
      isLoading: false,
      authority: ''
    }
    this.handleLogout = this.handleLogout.bind(this);
    this.loadCurrentUser = this.loadCurrentUser.bind(this);
    this.handleLogin = this.handleLogin.bind(this);

    notification.config({
      placement: 'topRight',
      top: 70,
      duration: 3,
    });    
  }

  loadCurrentUser() {
    this.setState({
      isLoading: true
    });
    getCurrentUser()
    .then(response => {
      this.setState({
        currentUser: response,
        isAuthenticated: true,
        isLoading: false
      });

      console.log(response.authorities[0].authority, "app check");
      if(response.authorities[0].authority === "ROLE_ADMIN") {
        console.log(response, "app");
        this.setState({
          isAdminAuthenticated: true,
          authority: 'ADMIN'
        });
      }
      console.log(this.state.authority)
    }).catch(error => {
      this.setState({
        isLoading: false
      });  
    });
  }

  componentDidMount() {
    this.loadCurrentUser();
  }

  handleLogout(redirectTo="/login", notificationType="success", description="You're successfully logged out.") {
    localStorage.removeItem(ACCESS_TOKEN);

    console.log(this.state.authority)
    
    this.setState({
      currentUser: null,
      isAuthenticated: false,
      isAdminAuthenticated: false,
      authority: ''
    });
    this.props.history.push(redirectTo);
    
    notification[notificationType]({
      message: 'Smart Qala',
      description: description,
    });
  }

  handleLogin() {
    notification.success({
      message: 'Smart Qala',
      description: "You're successfully logged in.",
    });
    this.loadCurrentUser();
    console.log(this.state.authority)
    // if(this.state.authority == "ADMIN") {
    //   this.props.history.push("/admin");
    // } else {
    //   this.props.history.push("/");
    // }
    getCurrentUser()
    .then(response => {
    
      if(response.authorities[0].authority === "ROLE_ADMIN") {
        this.props.history.push("/admin");
      } else {
        this.props.history.push("/");
      }
    })
  }

  render() {
    if(this.state.isLoading) {
      return <LoadingIndicator />
    }
    return (
        <Layout className="app-container">
          <AppHeader isAuthenticated={this.state.isAuthenticated} 
            isAdminAuthenticated={this.state.isAdminAuthenticated}
            currentUser={this.state.currentUser} 
            onLogout={this.handleLogout} />

          <Content className="app-content">
            <div className="container">
              <Switch>      
                <Route exact path="/" 
                  // render={(props) => <PollList isAuthenticated={this.state.isAuthenticated} 
                  //     currentUser={this.state.currentUser} handleLogout={this.handleLogout} {...props} />}>
                  render={(props) => <TableComponent2 isAuthenticated={this.state.isAuthenticated}/>}>
                </Route>
                <Route path="/login" 
                  render={(props) => <Login onLogin={this.handleLogin} {...props} />}></Route>
                <Route path="/signup" component={Signup}></Route>
                <Route path="/users/:username" 
                  render={(props) => <Profile isAuthenticated={this.state.isAuthenticated} currentUser={this.state.currentUser} {...props}  />}>
                </Route>
                <PrivateRoute 
                authenticated={this.state.isAuthenticated} 
                adminAuthenticated = {this.state.isAdminAuthenticated} 
                path="/admin" 
                component={AdminComponent} 
                handleLogout={this.handleLogout}>
                </PrivateRoute>
                <Route path="/history" component={HistoricalDataComponent}></Route>
                <Route component={NotFound}></Route>
              </Switch>
            </div>
          </Content>
        </Layout>
    );
  }
}

export default withRouter(App);
