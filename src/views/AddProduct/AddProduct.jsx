import React, {Component} from 'react';
import {Grid, Row, Col, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import axios from "axios";

import {Card} from 'components/Card/Card.jsx';
import {FormInputs} from 'components/FormInputs/FormInputs.jsx';
import {UserCard} from 'components/UserCard/UserCard.jsx';

import avatar from "assets/img/faces/face-3.jpg";
import ChooseFilials from "../ChooseFilials/ChooseFilials";

class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.showImg = this.showImg.bind(this);
        this.removeFilial = this.removeFilial.bind(this);
        this.addFilial = this.addFilial.bind(this);
        this.state = {
            filials: [1, 2, 3]
        }
    }

    showImg(e) {
        let _URL = window.URL || window.webkitURL,
            currentImg = e.target.name,
            files = e.target.files;
        if (files && files[0]) {


            let img = new Image();
            img.onload = function () {
                let reader = new FileReader(),
                    imgWidth = this.width,
                    imgHeight = this.height,
                    maxImgWidth = currentImg === "littleImg" ? 355 : (currentImg === "largeImg") ? 640 : null,
                    maxImgheight = currentImg === "littleImg" ? 355 : (currentImg === "largeImg") ? 640 : null

                reader.onload = function (event) {
                    if (imgWidth < maxImgWidth || imgHeight < maxImgheight) {
                        alert("dimensions error");
                        return
                    }
                    document.getElementById(currentImg).src = event.target.result;
                };
                reader.readAsDataURL(files[0]);
            };
            img.onerror = function () {
                alert("not a valid file: " + files[0].type);
            };
            img.src = _URL.createObjectURL(files[0]);
        }
    }

    addFilial() {
        let newFilials = this.state.filials;
        newFilials.push(newFilials.length + 1);
        this.setState({filials: newFilials})
    }

    removeFilial(item) {
        let index = this.state.filials.indexOf(item);
        this.setState((state) => {
            filials: state.filials.splice(index, 1)
        });
    }

    render() {
        console.log(":::::::::::::::::::::::::  ", this.props)
        return (
            <div className="content">
                <Grid fluid>
                    <ChooseFilials props={this.props.props} />
                    <Row>
                        <Col md={12}>
                            <Card
                                title="Описание товара"
                                content={
                                    <form className="custom-contact">
                                        <div className="add-product-block custom-block">
                                            <h4>Данные организации</h4>
                                            <div className="add-product-sub-block1">
                                                <Col md={7}>
                                                    <div className="form-group">
                                                        <label htmlFor="usr">Наименование компании:</label>
                                                        <input type="text" className="form-control" id="usr"/>
                                                    </div>
                                                </Col>
                                                <Col md={5}>
                                                    <div className="form-group">
                                                        <label htmlFor="sel1">Юридическая фирма:</label>
                                                        <select className="form-control" id="sel1">
                                                            <option>1</option>
                                                            <option>2</option>
                                                            <option>3</option>
                                                            <option>4</option>
                                                        </select>
                                                    </div>
                                                </Col>
                                                <div className="clearfix"></div>
                                            </div>
                                            <div className="add-product-sub-block2">
                                                <div className="form-group">
                                                    <label htmlFor="count-or-weight">Введите кол-во</label>
                                                    <input className="form-control" type="text" name="count-or-weight"
                                                           placeholder="Вес или объем" id="count-or-weight"/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="unit-measurements">Единица измерения</label>
                                                    <select className="form-control" name="unit-measurements"
                                                            id="unit-measurements" placeholder="Единица измерения">
                                                        <option>1</option>
                                                        <option>2</option>
                                                        <option>3</option>
                                                        <option>4</option>
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="price">Цена, руб</label>
                                                    <input className="form-control" type="text" name="price"
                                                           id="price"/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="alcohol">Алкоголь, %</label>
                                                    <input className="form-control" type="text" name="alcohol"
                                                           id="alcohol"/>
                                                </div>
                                                <div className="clearfix"></div>
                                            </div>
                                            <div className="add-product-sub-block1">
                                                <div className="col-md-custom">
                                                    <div className="form-group">
                                                        <label htmlFor="usr">Наименование компании:</label>
                                                        <input type="text" className="form-control" id="usr"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="clearfix"></div>
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
                                                        <input id="my-file-selector1" name="littleImg" type="file"
                                                               accept=".jpg" onChange={this.showImg}/>
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
                                                        <input id="my-file-selector2" name="largeImg" type="file"
                                                               accept=".jpg" onChange={this.showImg}/>
                                                        Загрузить
                                                    </label>
                                                    <p className="img-size">Минимум 640х355 пикс. в формате jpg</p>
                                                </div>
                                            </Col>
                                            <div className="clearfix"></div>
                                        </div>
                                        <hr className="custom-hr"/>
                                        <button type="submit" onClick={this.sendContactData}
                                                className="custom-violet-btn btn">Сохранить
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

export default AddProduct;