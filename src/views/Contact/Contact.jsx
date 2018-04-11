import React, {Component} from 'react';
import { Grid, Row, Col, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import axios from "axios";

import {Card} from 'components/Card/Card.jsx';
import {FormInputs} from 'components/FormInputs/FormInputs.jsx';
import {UserCard} from 'components/UserCard/UserCard.jsx';
import Button from 'elements/CustomButton/CustomButton.jsx';

import avatar from "assets/img/faces/face-3.jpg";

class Contact extends Component {
    constructor (props) {
        super(props);
        this.sendContactData = this.sendContactData.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.uploadFiles = this.uploadFiles.bind(this);
        this.state = {
            name: "",
            phone: "",
            email: "",
            description: "",
            topic: "1",
            files: null
        }
    }

    onChangeHandler (e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    sendContactData (e) {
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

    uploadFiles (e) {
        let files = e.target.files,
            maxSize = 20971520,
            sizeSum = 0;

        for (let key in files) {
            if (Number.isFinite(parseInt(key))) {
                sizeSum += files[key].size;
            }
        }

        if (sizeSum > maxSize) {
            alert("erorrrrrrrrrrrrrrrr")
        } else {
            this.setState({
                [e.target.name]: e.target.files
            })
        }
    }

    render () {
        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card
                                title="если у вас есть вопросы свяжитесь с нами через фирму ниже"
                                content={
                                    <form className="custom-contact" onSubmit={this.sendContactData}>
                                        <Col md={6}>
                                            <div className="form-group">
                                                <label className="col-md-3" htmlFor="name">Ваше имя:</label>
                                                <input type="text" className="form-control col-md-9" id="name" placeholder="name" onChange={this.onChangeHandler} name="name" value={this.state.name} required/>
                                            </div>
                                            <div className="form-group">
                                                <label className="col-md-3" htmlFor="phone">Ваш телефон?:</label>
                                                <input type="number" className="form-control col-md-9" id="phone" placeholder="phone" onChange={this.onChangeHandler} name="phone" value={this.state.phone} required/>
                                            </div>
                                            <div className="form-group">
                                                <label className="col-md-3" htmlFor="email">Ваш е-mail:</label>
                                                <input type="email" className="form-control  col-md-9" id="email" placeholder="email" onChange={this.onChangeHandler} name="email" value={this.state.email} required/>
                                            </div>
                                            <div className="form-group">
                                                <label className="col-md-3" htmlFor="topic">Тема обращения:</label>
                                                <select className="form-control col-md-9" id="topic" name="topic" selected={this.state.topic} onChange={this.onChangeHandler}>
                                                    <option>1</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4</option>
                                                </select>
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div className="form-group">
                                                <textarea className="custom-textarea form-control" rows="5" id="comment" name="description" onChange={this.onChangeHandler} value={this.state.description} placeholder="Опишите проблему" required>

                                                </textarea>
                                            </div>
                                        </Col>
                                        <div className="form-group col-md-12 custom-upload">
                                            <span className="custom-name">Присоедините файл</span>
                                            <label className="btn" htmlFor="my-file-selector">
                                                <input id="my-file-selector" type="file" name="files" multiple onChange={this.uploadFiles}/>
                                                загрузить
                                            </label>
                                            <span className="custom-description">максимум 10 файлов общим размером до 20 Мб</span>
                                        </div>
                                        <div className="clearfix"></div>
                                        <button type="submit" className="custom-violet-btn btn">Отправить</button>
                                        <div className="clearfix"></div>
                                    </form>
                                }
                            />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default Contact;
