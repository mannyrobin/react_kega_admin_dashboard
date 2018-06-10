import React, {Component} from 'react';
import { Grid, Row } from 'react-bootstrap';
import axios from "axios";

class Order extends Component {
    render() {
        let items = JSON.parse(this.props.item.items);
        console.log("5555555555555555555555  ", items)

        return (
            <div className="content main-order-page">
                <Grid fluid>
                    <Row>
                        <div className="col-md-12 client-data">
                            <h2 className="custom-header-h2 custom-dashboard-header">
                                <span>ЗАКАЗ №422344400</span>
                                <span className="custom-right yellow-color cursor-pointer" onClick={this.props.closeMoreDetails}> Вернуться к списку заказов</span>
                                <div className="clearfix"></div>
                            </h2>
                            <div className="col-md-8 order-block">
                                <h3>Данные клиента</h3>
                                <div className="col-md-6">
                                    <p>Имя клиента: <span>{this.props.item.user_name}</span></p>
                                    <p>Телефон клиента: <span>{this.props.item.mobile_number}</span></p>
                                    <p>Время заказа: <span>{`${this.props.item.time === "-1" ? "Ближайшее" : "Через " + this.props.item.time + " час"}`}</span></p>
                                    <p>Оплата: <span>{`${this.props.item.status === "0" ? "Не оплачен" : "Оплачен "}`}</span></p>
                                </div>
                                <div className="col-md-6">
                                    <p>Время заказа: <span>{this.props.item.start_date}</span></p>
                                    <p>Время доставки: <span>{this.props.item.finish_date}</span></p>
                                    <p>Адрес доставки: <span>{this.props.item.address}</span></p>
                                </div>
                            </div>
                            <div className="col-md-4 add-new-cat">
                                <h3>Данные заказа</h3>
                                <div className="col-md-12">
                                    <p>Сумма заказа: <span>Дмитрий</span></p>
                                    <p>Доставка: <span>Дмитрий</span></p>
                                    <p>Оплата: <span>{`${this.props.item.status === "0" ? "Не оплачен" : "Оплачен "}`}</span></p>
                                    <p>Курьер: <span className="color-red">{this.props.item.courier_status}</span></p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12 short-block order-composition order-block">
                            <h3>Состав заказа</h3>
                            {
                                items.map(item => {
                                    return <div key={item.itemsMenuModel.id} className="product-row">
                                        <span>{item.itemsMenuModel.manufacturer} - {item.itemsMenuModel.name}</span>
                                        <span>Бутылочное пиво</span>
                                        <span>{item.count}</span>
                                        <span>{item.itemsMenuModel.price} РУБ.</span>
                                    </div>
                                })
                            }
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