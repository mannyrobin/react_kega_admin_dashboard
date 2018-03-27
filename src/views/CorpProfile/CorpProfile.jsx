import React, {Component} from 'react';
import {Grid, Row, Col, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import axios from "axios";

import {Card} from 'components/Card/Card.jsx';
import {FormInputs} from 'components/FormInputs/FormInputs.jsx';
import {UserCard} from 'components/UserCard/UserCard.jsx';
import Button from 'elements/CustomButton/CustomButton.jsx';

import avatar from "assets/img/faces/face-3.jpg";

class CorpProfile extends Component {
    constructor (props) {
        super(props);
        this.showImg = this.showImg.bind(this);
    }

    showImg(e) {
        let _URL = window.URL || window.webkitURL,
            currentImg = e.target.name,
            files = e.target.files;
        if (files && files[0]) {


            let img = new Image();
            img.onload = function() {
                let reader = new FileReader(),
                    imgWidth = this.width,
                    imgHeight = this.height,
                    maxImgWidth = currentImg === "littleImg" ? 355 : (currentImg === "largeImg") ? 640 : null,
                    maxImgheight = currentImg === "littleImg" ? 355 : (currentImg === "largeImg") ? 640 : null

                reader.onload = function(event) {
                    if (imgWidth < maxImgWidth || imgHeight < maxImgheight) {
                        alert("dimensions error");
                        return
                    }
                    document.getElementById(currentImg).src = event.target.result;
                };
                reader.readAsDataURL(files[0]);
            };
            img.onerror = function() {
                alert( "not a valid file: " + files[0].type);
            };
            img.src = _URL.createObjectURL(files[0]);
        }
    }

    render() {
        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card
                                title="Профиль компании"
                                content={
                                    <form className="custom-contact" >
                                        <div className="custom-block">
                                            <h4>Данные организации</h4>
                                            <Col md={6}>
                                                <div className="form-group">
                                                    <label className="col-md-4" htmlFor="usr">Наименование компании:</label>
                                                    <input type="text" className="form-control col-md-8" id="usr"/>
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-md-4" htmlFor="sel1">Юридическая фирма:</label>
                                                    <select className="form-control col-md-8" id="sel1">
                                                        <option>1</option>
                                                        <option>2</option>
                                                        <option>3</option>
                                                        <option>4</option>
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-md-4" htmlFor="usr">Юр. наименование организации:</label>
                                                    <input type="text" className="form-control col-md-8" id="usr"/>
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-md-4" htmlFor="usr">Юр. адрес:</label>
                                                    <input type="text" className="form-control  col-md-8" id="usr"/>
                                                </div>
                                            </Col>
                                            <Col md={6}>
                                                <div className="form-group">
                                                    <label className="col-md-4" htmlFor="usr">ИНН:</label>
                                                    <input type="text" className="form-control col-md-8" id="usr"/>
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-md-4" htmlFor="usr">КПП:</label>
                                                    <input type="text" className="form-control col-md-8" id="usr"/>
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-md-4" htmlFor="usr">ОГРН:</label>
                                                    <input type="text" className="form-control  col-md-8" id="usr"/>
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-md-4" htmlFor="sel1">Сфера деятельности:</label>
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
                                                    <img id="littleImg"/>
                                                </div>
                                                <div>
                                                    <p className="upload-img">Загрузите логотип</p>
                                                    <label className="btn" htmlFor="my-file-selector1">
                                                        <input id="my-file-selector1" name="littleImg" type="file" accept=".jpg" onChange={this.showImg}/>
                                                        Загрузить
                                                    </label>
                                                    <p className="img-size">Минимум 350х350 пикс. в формате jpg
                                                        с использованием однотонного фона</p>
                                                </div>
                                            </Col>
                                            <Col md={6}>
                                                <div className="img-block img-large">
                                                    <img id="largeImg"/>
                                                </div>
                                                <div>
                                                    <p className="upload-img">Загрузите логотип</p>
                                                    <label className="btn" htmlFor="my-file-selector2">
                                                        <input id="my-file-selector2" name="largeImg" type="file" accept=".jpg" onChange={this.showImg}/>
                                                        Загрузить
                                                    </label>
                                                    <p className="img-size">Минимум 640х355 пикс. в формате jpg</p>
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
