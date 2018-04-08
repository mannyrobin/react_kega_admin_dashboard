import React, {Component} from 'react';
import axios from "axios";
import {Grid, Row, Col} from 'react-bootstrap';

import Card from 'components/Card/Card.jsx'

class Login extends Component {
    constructor (props) {
        super(props);
    }

    submit (e) {
        e.preventDefault();
        axios({
            method:'post',
            url: "http://httpbin.org/post",
            // url:'https://jsonplaceholder.typicode.com/users',
            data: {
                name: this.state.name,
                phone: this.state.phone,
                email: this.state.email,
                description: this.state.description,
                topic: this.state.topic,
                files: this.state.files
            },

            responseType:'json'
        }).then(function(response) {
            console.log(">>>>>>>>>>>>>>  ", response);
        })
            .catch(function(error){
                throw new Error(error);
            });
    }

    componentDidMount () {
        console.log(">>>>>>>>>>>>>>  11111");
        axios({
            method:'post',
            url: "http://u0419737.cp.regruhosting.ru/kega/markets_controller.php",
            data: {
                request_code: 1
            },
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            },
            responseType:'json'
        }).then(function(response) {
            console.log(">>>>>>>>>>>>>>  ", response);
        }).catch(function(error){
            throw new Error(error);
        });
    }

    render() {
        return (
            <div className="content main-page">
                <div className="bg-block"></div>
                <div className="main-cont">
                    <div className="logo-block"></div>
                    <form onSubmit={this.submit}>
                        <div className="custom-select">
                            <select>
                                <option>Выберите сеть</option>
                                <option>Выберите сеть</option>
                                <option>Выберите сеть</option>
                            </select>
                        </div>
                        <p className="transparent-input">
                            <input type="text" name="name" placeholder="Ваш логин"/>
                        </p>
                        <p className="transparent-input">
                            <input type="password" name="password" placeholder="Ваш пароль"/>
                        </p>
                        <p>
                            <button className="enter custom-violet-btn">Войти</button>
                        </p>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;
