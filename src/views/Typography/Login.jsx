import React, {Component} from 'react';
import axios from "axios";
import querystring from "querystring";
import Dashboard from "../Dashboard/Dashboard";

class Login extends Component {
    constructor (props) {
        super(props);
        this.submit = this.submit.bind(this);
        this.state = {
            response: null,
            loggedIn: false
        }
    }

    //vansdorf 12345

    submit (e) {
        let username = this.refs.username.value,
            password = this.refs.password.value,
            marketId = this.refs.select.selectedIndex + 1,
            self = this;
        e.preventDefault();
        axios({
            method:'post',
            url: "http://u0419737.cp.regruhosting.ru/kega/login.php",
            data: querystring.stringify({
                login: username,
                password: password,
                market_id: marketId
            }),
            responseType:'json'
        }).then(function(response) {
            console.log(">>>>>>>>>>>>>>  ", response);
            if (!response.data.error) {
                self.props.doLogin();
            } else {
                alert("wrong username or password");
            }
        }).catch(function(error){
            throw new Error(error);
        });
    }

    componentDidMount () {
        let self = this;
        axios({
            method:'post',
            url: "http://u0419737.cp.regruhosting.ru/kega/markets_controller.php",
            data: querystring.stringify({
                request_code: 1
            }),
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            },
            responseType:'json'
        }).then(function(response) {
            self.setState({response: response})
        }).catch(function(error){
            throw new Error(error);
        });
    }

    render() {
        if(!this.state.response) {
            return (
                <div>Loading...</div>
            )
        }
        return (
            <div className="content main-page">
                <div className="bg-block"></div>
                <div className="main-cont">
                    <div className="logo-block"></div>
                    <form onSubmit={this.submit}>
                        <div className="custom-select-spec">
                            <select ref="select">
                                {Object.keys(this.state.response.data).map(item => {
                                    let network = this.state.response.data[item];
                                    return <option key={network.id}>{network.name}</option>
                                })}
                            </select>
                        </div>
                        <p className="transparent-input">
                            <input type="text" ref="username" placeholder="Ваш логин" required/>
                        </p>
                        <p className="transparent-input">
                            <input type="password" ref="password" placeholder="Ваш пароль" required/>
                        </p>
                        <p>
                            <button type="submit" className="enter custom-violet-btn">Войти</button>
                        </p>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;
