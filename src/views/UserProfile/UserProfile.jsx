import React, {Component} from 'react';
import { Grid, Row, Col, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import axios from "axios";

import {Card} from 'components/Card/Card.jsx';
import {FormInputs} from 'components/FormInputs/FormInputs.jsx';
import {UserCard} from 'components/UserCard/UserCard.jsx';
import Button from 'elements/CustomButton/CustomButton.jsx';

import avatar from "assets/img/faces/face-3.jpg";

class UserProfile extends Component {
    constructor (props) {
        super(props);
    }

    sendContactData () {
        console.log("111111111111111111")
        axios({
            method:'get',
            url:'https://jsonplaceholder.typicode.com/users',
            responseType:'json'
        }).then(function(response) {
            console.log(">>>>>>>>>>>>>>  ", response);
          })
        .catch(function(error){
            console.log("++++++++++++++  ", error)
        })
    }

    render() {
        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card
                                title="если у вас есть вопросы свяжитесь с нами через фирму ниже"
                                content={
                                    <form className="custom-contact" onSubmit={()=>{return false}}>
                                        <Col md={6}>
                                            <div className="form-group">
                                                <label className="col-md-4" htmlFor="usr">Name:</label>
                                                <input type="text" className="form-control col-md-8" id="usr"/>
                                            </div>
                                            <div className="form-group">
                                                <label className="col-md-4" htmlFor="usr">Name:</label>
                                                <input type="text" className="form-control col-md-8" id="usr"/>
                                            </div>
                                            <div className="form-group">
                                                <label className="col-md-4" htmlFor="usr">Name:</label>
                                                <input type="text" className="form-control  col-md-8" id="usr"/>
                                            </div>
                                            <div className="form-group">
                                                <label className="col-md-4" htmlFor="sel1">Select list:</label>
                                                <select className="form-control col-md-8" id="sel1">
                                                    <option>1</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4</option>
                                                </select>
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div className="form-group">
                                                <textarea className="form-control" rows="5" id="comment">

                                                </textarea>
                                            </div>
                                        </Col>
                                        <div className="form-group col-md-12 custom-upload">
                                            <span className="custom-name">text</span>
                                            <label className="btn" htmlFor="my-file-selector">
                                                <input id="my-file-selector" type="file" />
                                                Button Text Here
                                            </label>
                                            <span className="custom-description">texttexttext</span>
                                        </div>
                                        <button type="submit" onClick={this.sendContactData} className="custom-violet-btn btn">Button</button>
                                        <div className="clearfix"></div>
                                    </form>
                                }
                            />
                        </Col>
                    </Row>
                </Grid>>
            </div>
        );
    }
}

export default UserProfile;
