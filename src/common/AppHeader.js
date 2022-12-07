import React, { Component } from 'react';
import {
    Link,
    withRouter,
    useHistory
} from 'react-router-dom';
import './AppHeader.css';
import pollIcon from '../poll.svg';
import historyIcon from '../history.svg';
import { Layout, Menu, Dropdown, Icon } from 'antd';

const Header = Layout.Header;


function AppHeader(props) {
    // constructor(props) {
    //     super(props);   
    //     ;   
    // }
    
    const handleMenuClick = ({ key }) => {
      if(key === "logout") {
        props.onLogout();
      }
    }

      const history = useHistory();
        let menuItems;
        
        if(props.currentUser && props.isAdminAuthenticated) {
          menuItems = [
            <Menu.Item key="/">
              {/* <Link to="/">
                <Icon type="home" className="nav-icon" />
              </Link> */}
            </Menu.Item>,
             <Menu.Item key="/admin">
             <Link to="/admin">
               <img src={pollIcon} alt="poll" className="poll-icon" />
             </Link>
           </Menu.Item>,
             <Menu.Item key="/history">
             <Link to="/history">
               <img src={historyIcon} alt="poll" className="poll-history" />
             </Link>
           </Menu.Item>,
           <Menu.Item key="/profile" className="profile-menu">
                 <ProfileDropdownMenu 
                   currentUser={props.currentUser} 
                   handleMenuClick={handleMenuClick}/>
             </Menu.Item>
          ]; 
        } else if(props.currentUser) {
          menuItems = [
            <Menu.Item key="/">
              <Link to="/">
                <Icon type="home" className="nav-icon" />
              </Link>
            </Menu.Item>,
          <Menu.Item key="/profile" className="profile-menu">
                <ProfileDropdownMenu 
                  currentUser={props.currentUser} 
                  handleMenuClick={handleMenuClick}/>
            </Menu.Item>
          ]; 
        } 
         else {
          menuItems = [
            <Menu.Item key="/login">
              <Link to="/login">Войти</Link>
            </Menu.Item>,
            // <Menu.Item key="/signup">
            //   <Link to="/signup">Зарегестрироваться</Link>
            // </Menu.Item>                  
          ];
        }

        return (
          props.isAdminAuthenticated && props.isAuthenticated ? ( 
            <Header className="app-header">
            <div className="container">
              <div className="app-title" >
                <Link to="/admin">Smart Qala</Link>
              </div>
              <Menu
                className="app-menu"
                mode="horizontal"
                selectedKeys={[props.location.pathname]}
                style={{ lineHeight: '64px' }} >
                  {menuItems}
              </Menu>
            </div>
          </Header>
          ) : (
            <Header className="app-header">
            <div className="container">
              <div className="app-title" >
                <Link to="/">Smart Qala</Link>
              </div>
              <Menu
                className="app-menu"
                mode="horizontal"
                selectedKeys={[props.location.pathname]}
                style={{ lineHeight: '64px' }} >
                  {menuItems}
              </Menu>
            </div>
          </Header>
          )
        );
}

function ProfileDropdownMenu(props) {
  const dropdownMenu = (
    <Menu onClick={props.handleMenuClick} /*className="profile-dropdown-menu"*/>
      {/* <Menu.Item key="user-info" className="dropdown-item" disabled>
        <div className="user-full-name-info">
          {props.currentUser.name}
        </div>
        <div className="username-info">
          @{props.currentUser.username}
        </div>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="profile" className="dropdown-item">
        <Link to={`/users/${props.currentUser.username}`}>Profile</Link>
      </Menu.Item> */}
      <Menu.Item key="logout" className="dropdown-item">
        Выйти
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown 
      overlay={dropdownMenu} 
      trigger={['click']}
      getPopupContainer = { () => document.getElementsByClassName('profile-menu')[0]}>
      <a className="ant-dropdown-link">
         <Icon type="user" className="nav-icon" style={{marginRight: 0}} /> <Icon type="down" />
      </a>
    </Dropdown>
  );
}


export default withRouter(AppHeader);