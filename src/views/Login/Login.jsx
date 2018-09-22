import React, {Component} from 'react';
import axios from "axios";
import querystring from "querystring";

class Login extends Component {
    constructor (props) {
        super(props);
        this.submit = this.submit.bind(this);
        this.state = {
            response: null
        }
    }

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
            if (response.data && !response.data.error) {
                localStorage.setItem('market_id', marketId);
                localStorage.setItem('sub_market_id', response.data.arr[0].sub_market_id);
                self.props.doLogin(response);
            } else {
                alert("wrong username or password");
            }
        })
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
        let network = null;
        return (
            <div className="content main-page">
                <div className="bg-block"></div>
                <div className="main-cont">
                    <div className="logo-block"></div>
                    <form onSubmit={this.submit}>
                        <div className="custom-select-spec">
                            <select ref="select">
                                {Object.keys(this.state.response.data).map(item => {
                                    network = this.state.response.data[item];
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
