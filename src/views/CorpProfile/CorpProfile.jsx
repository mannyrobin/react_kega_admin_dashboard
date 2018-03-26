import React, {Component} from 'react';
import {Grid, Row, Col, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import axios from "axios";

import {Card} from 'components/Card/Card.jsx';
import {FormInputs} from 'components/FormInputs/FormInputs.jsx';
import {UserCard} from 'components/UserCard/UserCard.jsx';
import Button from 'elements/CustomButton/CustomButton.jsx';

import avatar from "assets/img/faces/face-3.jpg";

class CorpProfile extends Component {
    render() {
        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card
                                title="Профиль компании"
                                content={
                                    <form className="custom-contact" onSubmit={() => {
                                        return false
                                    }}>
                                        <div className="custom-block">
                                            <h4>Данные организации</h4>
                                            <Col md={6}>
                                                <div className="form-group">
                                                    <label className="col-md-4" htmlFor="usr">Name:</label>
                                                    <input type="text" className="form-control col-md-8" id="usr"/>
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
                                                <div className="form-group">
                                                    <label className="col-md-4" htmlFor="usr">Name:</label>
                                                    <input type="text" className="form-control col-md-8" id="usr"/>
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-md-4" htmlFor="usr">Name:</label>
                                                    <input type="text" className="form-control  col-md-8" id="usr"/>
                                                </div>
                                            </Col>
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
                                                <a className="add-input">+ добавить еще</a>
                                            </Col>
                                            <div className="clearfix"></div>
                                            <button type="submit" onClick={this.sendContactData}
                                                    className="custom-violet-btn btn">SAVE
                                            </button>
                                        </div>
                                        <hr className="custom-hr"/>
                                        <div className="visual custom-block">
                                            <h4>визуальный образ</h4>
                                            <Col md={6}>
                                                <div className="img-block">
                                                </div>
                                                <div>
                                                    <p className="upload-img">Загрузите логотип</p>
                                                    <label className="btn" htmlFor="my-file-selector">
                                                        <input id="my-file-selector" type="file" />
                                                        Загрузить
                                                    </label>
                                                    <p className="img-size">Минимум 350х350 пикс. в формате jpg
                                                        с использованием однотонного фона</p>
                                                </div>
                                            </Col>
                                            <Col md={6}>
                                                <div className="img-block img-large">
                                                </div>
                                                <div>
                                                    <p className="upload-img">Загрузите логотип</p>
                                                    <label className="btn" htmlFor="my-file-selector">
                                                        <input id="my-file-selector" type="file" />
                                                        Загрузить
                                                    </label>
                                                    <p className="img-size">Минимум 350х350 пикс. в формате jpg
                                                        с использованием однотонного фона</p>
                                                </div>
                                            </Col>
                                            <div className="clearfix"></div>
                                        </div>
                                        <hr className="custom-hr"/>
                                        <div className="custom-block filials">
                                            <h4>Филиалы
                                                <a className="remove-block"><i className="pe-7s-trash"></i></a>
                                            </h4>
                                            <Col md={6}>
                                                <div className="form-group">
                                                    <label className="col-md-4" htmlFor="usr">Name:</label>
                                                    <input type="text" className="form-control col-md-8" id="usr"/>
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
                                                <div className="form-group">
                                                    <label className="col-md-4" htmlFor="usr">Name:</label>
                                                    <input type="text" className="form-control col-md-8" id="usr"/>
                                                </div>
                                                <a className="check-in-map">проверить на карте</a>
                                            </Col>
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
                                            </Col>
                                            <div className="clearfix"></div>
                                        </div>
                                        <hr className="custom-hr"/>
                                        <div className="custom-block filials">
                                            <h4>
                                                <a className="remove-block"><i className="pe-7s-trash"></i></a>
                                            </h4>
                                            <Col md={6}>
                                                <div className="form-group">
                                                    <label className="col-md-4" htmlFor="usr">Name:</label>
                                                    <input type="text" className="form-control col-md-8" id="usr"/>
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
                                                <div className="form-group">
                                                    <label className="col-md-4" htmlFor="usr">Name:</label>
                                                    <input type="text" className="form-control col-md-8" id="usr"/>
                                                </div>
                                                <a className="check-in-map">проверить на карте</a>
                                            </Col>
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
                                            </Col>
                                            <div className="clearfix"></div>
                                            <a className="add-filial">+ Добавить еще один</a>
                                        </div>
                                        <hr className="custom-hr"/>
                                        <button type="submit" onClick={this.sendContactData}
                                                className="custom-violet-btn btn">SAVE
                                        </button>
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

export default CorpProfile;
