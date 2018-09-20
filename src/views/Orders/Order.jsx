import React, {Component} from 'react';
import { Grid, Row } from 'react-bootstrap';
import querystring from "querystring";
import axios from "axios/index";

class Order extends Component {
    constructor(props) {
        super(props);
        this.orderCollected = this.orderCollected.bind(this);
    }

    orderCollected (e) {
        let self = this;
        axios({
            method:'post',
            url: "http://u0419737.cp.regruhosting.ru/kega/orders_controller.php",
            data: querystring.stringify({
                request_code: 3,
                order_id: self.props.item.id,
                status: 3
            }),
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            },
            responseType:'json'
        }).then(function(response) {
            if (response.data.change_status) {
                self.props.updateItem(self.props.item);
            }
        }).catch(function(error){
            throw new Error(error);
        });
    }

    render () {
        let items = JSON.parse(this.props.item.items);

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
                                    <p>Сумма заказа: <span>{this.props.item.total_price} РУБ.</span></p>
                                    <p>Доставка: <span>{this.props.item.delivery_price} РУБ.</span></p>
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
                                        <span><span className="image-block-span"><img src={item.itemsMenuModel.icon_url} alt="" /></span>{item.itemsMenuModel.manufacturer} - {item.itemsMenuModel.name}</span>
                                        <span>Бутылочное пиво</span>
                                        <span>{item.count}</span>
                                        <span>{item.itemsMenuModel.price} РУБ.</span>
                                    </div>
                                })
                            }
                        </div>
                        <div className="clearfix"></div>
                        {
                            !(parseInt(this.props.item.status) === 2 || parseInt(this.props.item.status) === 3) &&
                            <button className="btn custom-violet-btn" onClick={this.orderCollected}>Заказ собран</button>
                        }
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default Order;