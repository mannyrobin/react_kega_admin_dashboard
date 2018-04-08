import React, { Component } from 'react';
import {
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
import NotificationSystem from 'react-notification-system';

import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import Sidebar from 'components/Sidebar/Sidebar';

import {style} from "variables/Variables.jsx";

import appRoutes from 'routes/routes.jsx';
import Login from "../../views/Typography/Login";

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            loggedIn: false
        };
        this.doLogin = this.doLogin.bind(this);
        this.doLogOut = this.doLogOut.bind(this);
        this.handleNotificationClick = this.handleNotificationClick.bind(this);
    }

    doLogin () {
        this.setState({loggedIn: true})
    }

    doLogOut () {
        this.setState({loggedIn: false})
    }

    handleNotificationClick(position){
        var color = Math.floor((Math.random() * 4) + 1);
        var level;
        switch (color) {
            case 1:
                level = 'success';
                break;
            case 2:
                level = 'warning';
                break;
            case 3:
                level = 'error';
                break;
            case 4:
                level = 'info';
                break;
            default:
                break;
        }
    }
    componentDidMount(){


    }
    componentDidUpdate(e){
        if(window.innerWidth < 993 && e.history.location.pathname !== e.location.pathname && document.documentElement.className.indexOf('nav-open') !== -1){
            document.documentElement.classList.toggle('nav-open');
        }
    }
    render() {
        if (!this.state.loggedIn) {
            return (
                <Login doLogin={this.doLogin}/>
            )
        }
        return (
                <div className="wrapper">
                    <NotificationSystem ref="notificationSystem" style={style}/>
                    <Sidebar {...this.props} doLogOut={this.doLogOut} />
                    <div id="main-panel" className="main-panel">
                        <Header {...this.props}/>
                            <Switch>
                                {
                                    appRoutes.map((prop,key) => {
                                        if(prop.name === "Notifications")
                                            return (
                                                <Route
                                                    path={prop.path}
                                                    key={key}
                                                    render={routeProps =>
                                                       <prop.component
                                                           {...routeProps}
                                                           handleClick={this.handleNotificationClick}
                                                       />}
                                                />
                                            );
                                        if(prop.redirect)
                                            return (
                                                <Redirect from={prop.path} to={prop.to} key={key}/>
                                            );
                                        return (
                                            <Route path={prop.path} component={prop.component} key={key} />
                                        );
                                    })
                                }
                            </Switch>
                    </div>
                </div>
        );
    }
}

export default App;
