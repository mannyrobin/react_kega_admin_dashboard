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
            loggedIn: false,
            props: null
        };
        this.doLogin = this.doLogin.bind(this);
        this.doLogOut = this.doLogOut.bind(this);
    }

    doLogin (response) {
        this.setState({loggedIn: true, props: response});
    }

    doLogOut () {
        this.setState({loggedIn: false})
    }

    render() {
        // if (!this.state.loggedIn) {
        //     return (
        //         <Login doLogin={this.doLogin}/>
        //     )
        // }
        return (
            <div className="wrapper">
                <NotificationSystem ref="notificationSystem" style={style}/>
                <Sidebar {...this.props} doLogOut={this.doLogOut} />
                <div id="main-panel" className="main-panel">
                    <Header {...this.props} props={this.state.props}/>
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
                                    <Route path={prop.path} component={prop.component} key={key}  />
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