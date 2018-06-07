import React, {Component} from 'react';
import { Grid, Row } from 'react-bootstrap';
import axios from "axios";

class Order extends Component {
    render() {
        console.log("}}}}}}}}}}}}}}}}}}}}}}}}  ", this.props)
        return (
            <div className="content main-order-page">
                <Grid fluid>
                    <Row>
                        <div className="col-md-12 client-data">
                            <h2 className="custom-header-h2 custom-dashboard-header">
                                <span>ЗАКАЗ №422344400</span>
                                <span className="custom-right yellow-color" onClick={this.props.closeMoreDetails}> Вернуться к списку заказов</span>
                                <div className="clearfix"></div>
                            </h2>
                            <div className="col-md-8">
                                <h3>Данные клиента</h3>
                                <div className="col-md-6">
                                    <p>Имя клиента: <span>Дмитрий</span></p>
                                    <p>Телефон клиента: <span>Дмитрий</span></p>
                                    <p>Время заказа: <span>Дмитрий</span></p>
                                    <p>Оплата: <span>Дмитрий</span></p>
                                </div>
                                <div className="col-md-6">
                                    <p>Время заказа: <span>Дмитрий</span></p>
                                    <p>Время доставки: <span>Дмитрий</span></p>
                                    <p>Адрес доставки: <span>Дмитрий</span></p>
                                </div>
                            </div>
                            <div className="col-md-4 add-new-cat">
                                <h3>Данные заказа</h3>
                                <div className="col-md-12">
                                    <p>Сумма заказа: <span>Дмитрий</span></p>
                                    <p>Доставка: <span>Дмитрий</span></p>
                                    <p>Оплата: <span>Дмитрий</span></p>
                                    <p>Курьер: <span className="color-red">Дмитрий</span></p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12 short-block order-composition">
                            <h3>Состав заказа</h3>
                            <div className="product-row">
                                <span>Bekhaven - Black Stout</span>
                                <span>Бутылочное пиво</span>
                                <span>1</span>
                                <span>250 РУБ.</span>
                            </div>
                            <div className="product-row">
                                <span>Bekhaven - Black Stout</span>
                                <span>Бутылочное пиво</span>
                                <span>1</span>
                                <span>250 РУБ.</span>
                            </div>
                            <div className="product-row">
                                <span>Bekhaven - Black Stout</span>
                                <span>Бутылочное пиво</span>
                                <span>1</span>
                                <span>250 РУБ.</span>
                            </div>
                            <div className="product-row">
                                <span>Bekhaven - Black Stout</span>
                                <span>Бутылочное пиво</span>
                                <span>1</span>
                                <span>250 РУБ.</span>
                            </div>
                            <div className="product-row">
                                <span>Bekhaven - Black Stout</span>
                                <span>Бутылочное пиво</span>
                                <span>1</span>
                                <span>250 РУБ.</span>
                            </div>
                        </div>
                        <div className="clearfix"></div>
                        <button className="btn custom-violet-btn">Заказ собран</button>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default Order;