import React, {Component} from 'react';
import {Grid, Row, Col, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import axios from "axios";

import {Card} from 'components/Card/Card.jsx';
import {FormInputs} from 'components/FormInputs/FormInputs.jsx';
import {UserCard} from 'components/UserCard/UserCard.jsx';
import Button from 'elements/CustomButton/CustomButton.jsx';

import avatar from "assets/img/faces/face-3.jpg";
import ChooseFilials from "../ChooseFilials/ChooseFilials";

class Contact extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        <div className="col-md-12 add-stock">
                            <ChooseFilials props={this.props.props} />
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

export default Contact;
