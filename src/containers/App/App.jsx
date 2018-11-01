import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Header from 'components/Header/Header';
import Sidebar from 'components/Sidebar/Sidebar';
import appRoutes from 'routes/routes.jsx';
import Login from "../../views/Login/Login";
import axios from "axios/index";
import querystring from "querystring";
import Moment from "moment/moment";

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            loggedInUser: localStorage.getItem("loggedInUser") && JSON.parse(localStorage.getItem("loggedInUser")) || null,
            notCount: null,
            orderCount: null
        };
        this.doLogin = this.doLogin.bind(this);
        this.doLogOut = this.doLogOut.bind(this);
        this.getCounts = this.getCounts.bind(this);
        this.updateUser = this.updateUser.bind(this);
    }

    getCounts () {
        let self = this;
        axios({
            method:'post',
            url: "http://u0419737.cp.regruhosting.ru/kega/notification_controller.php",
            data: querystring.stringify({
                request_code: 3,
                market_id: localStorage.getItem('market_id')
            }),
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            },
            responseType:'json'
        }).then(function(response) {
            if (response.data) {
                self.setState({notCount: response.data.notification_count, orderCount: response.data.new_orders_count});
            }
        }).catch(function(error){
            throw new Error(error);
        });
    }

    componentWillReceiveProps () {
        this.getCounts();
    }

    componentDidMount () {
        this.getCounts();
    }

    doLogin (response) {
        localStorage.setItem("loggedInUser", JSON.stringify(response));
        this.getCounts();
        this.setState({loggedInUser: response});
    }

    doLogOut () {
        localStorage.removeItem("loggedInUser");
        this.setState({loggedInUser: null})
    }

    updateUser (loggedInUser) {
        this.setState({loggedInUser});
    }

    render() {
        if (!this.state.loggedInUser) {
            return (
                <Login doLogin={this.doLogin}/>
            )
        } else if (!(this.state.notCount || this.state.orderCount)) {
            return (
                <div>
                    Loading...
                </div>
            )
        }
        return (
            <div className="wrapper">
                <Sidebar {...this.props} doLogOut={this.doLogOut} orderCount={this.state.orderCount} />
                <div id="main-panel" className="main-panel">
                    <Header {...this.props} user={this.state.loggedInUser} notCount={this.state.notCount}/>
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
                                    <Route path={prop.path} component={() => {
                                        return <prop.component updateUser={this.updateUser} props={this.state.loggedInUser} />
                                    }
                                    } key={key} />
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