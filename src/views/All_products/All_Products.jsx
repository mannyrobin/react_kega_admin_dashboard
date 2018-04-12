import React, {Component} from 'react';
import {Grid, Row, Col, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import axios from "axios";

import {Card} from 'components/Card/Card.jsx';
import {FormInputs} from 'components/FormInputs/FormInputs.jsx';
import {UserCard} from 'components/UserCard/UserCard.jsx';
import Button from 'elements/CustomButton/CustomButton.jsx';

import avatar from "assets/img/faces/face-3.jpg";

class All_Products extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        <div className="col-md-12 add-stock">
                            <h2 className="custom-header-h2 custom-dashboard-header">
                                <span>КАТЕГОРИИ</span>
                                <div className="custom-select col-md-4">
                                    <label className="col-md-5" htmlFor="sel1">Выберите филиал:</label>
                                    <select className="form-control col-md-7" id="sel1">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                    </select>
                                </div>
                                <div className="clearfix"></div>
                            </h2>
                            <div className="col-md-5">
                                <h3>Категории</h3>
                                <div className="name-and-edit-prod">
                                    <span className="prod-edit-name">Бутылочное пиво</span>
                                    <span className="prod-edit-write">11 записей</span>
                                    <span className="prod-edit-icons">
                                        <span className="edit"></span>
                                        <span className="trash pe-7s-trash"></span>
                                    </span>
                                </div>
                                <div className="name-and-edit-prod">
                                    <span className="prod-edit-name">Бутылочное пиво</span>
                                    <span className="prod-edit-write">11 записей</span>
                                    <span className="prod-edit-icons">
                                        <span className="edit"></span>
                                        <span className="trash pe-7s-trash"></span>
                                    </span>
                                </div>
                                <div className="name-and-edit-prod">
                                    <span className="prod-edit-name">Бутылочное пиво</span>
                                    <span className="prod-edit-write">11 записей</span>
                                    <span className="prod-edit-icons">
                                        <span className="edit"></span>
                                        <span className="trash pe-7s-trash"></span>
                                    </span>
                                </div>
                            </div>
                            <div className="col-md-7 add-new-cat">
                                <h3>Добавить новую категорию</h3>
                                <div className="stock-search">
                                    <label>Наименование категории</label>
                                    <div className="input-search">
                                    <input className="form-control" type="search" placeholder="Введите наименование" />
                                    <button>Добавить</button>
                                    </div>
                                    <div className="clearfix"></div>
                                </div>
                                <p>Название определяет, как категория будет отображаться в приложении</p>
                            </div>
                        </div>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default All_Products;
