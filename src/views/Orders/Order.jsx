import React, {Component} from 'react';
import {Grid, Row, Col, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import axios from "axios";

import {Card} from 'components/Card/Card.jsx';
import {FormInputs} from 'components/FormInputs/FormInputs.jsx';
import {UserCard} from 'components/UserCard/UserCard.jsx';
import Button from 'elements/CustomButton/CustomButton.jsx';

import avatar from "assets/img/faces/face-3.jpg";

class Order extends Component {
    constructor(props) {
        super(props);
    }

    sendContactData() {
        axios({
            method: 'get',
            url: 'https://jsonplaceholder.typicode.com/users',
            responseType: 'json'
        }).then(function (response) {
        })
        .catch(function (error) {
        })
    }

    render() {
        return (
            <div className="content main-order-page">
                <Grid fluid>
                    <Row>
                        <div className="col-md-12 client-data">
                            <h2 className="custom-header-h2 custom-dashboard-header">
                                <span>ЗАКАЗ №422344400</span>
                                <span className="custom-right yellow-color">Вернуться к списку заказов</span>
                                <div className="clearfix"></div>
                            </h2>
                            <div className="col-md-8">
                                <h3>Данные клиента</h3>
                                <div className="col-md-6">
                                    <p>Имя клиента: <span>Дмитрий</span></p>
                                    <p>Имя клиента: <span>Дмитрий</span></p>
                                    <p>Имя клиента: <span>Дмитрий</span></p>
                                </div>
                                <div className="col-md-6">
                                    <p>Имя клиента: <span>Дмитрий</span></p>
                                    <p>Имя клиента: <span>Дмитрий</span></p>
                                    <p>Имя клиента: <span>Дмитрий</span></p>
                                </div>
                            </div>
                            <div className="col-md-4 add-new-cat">
                                <h3>Данные заказа</h3>
                                <div className="col-md-12">
                                    <p>Имя клиента: <span>Дмитрий</span></p>
                                    <p>Имя клиента: <span>Дмитрий</span></p>
                                    <p>Имя клиента: <span className="color-red">Дмитрий</span></p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12 ">
                            <h3>Состав заказа</h3>
                            <div className="product-row">
                                <span>Bekhaven - Black Stout</span>
                                <span>Бутылочное пиво</span>
                                <span>1</span>
                                <span>250 РУБ.</span>
                            </div>
                        </div>
                        <div className="clearfix"></div>
                        <button className="custom-violet-btn">Заказ собран</button>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default Order;