import React, {Component} from 'react';
import Order from './Order';
import Info from './Info';
import { Grid } from 'react-bootstrap';
import ChooseFilials from "../ChooseFilials/ChooseFilials";
import {NavLink} from "react-router-dom";

class Orders extends Component {
    constructor (props) {
        super(props);
        this.moreDetails = this.moreDetails.bind(this);
        this.state = {
            openOrderMoreDetails: false,
            info: [],
            pages: [1,2]
        }
    }

    moreDetails () {
        this.setState({openOrderMoreDetails: true});
    }

    componentDidMount () {
        // let pages = [];
        // for (let i = 0; i < parseInt(this.props.props.data.arr.length / 15); ++i) {
        //     pages.push(i)
        // }
        // this.setState({pages: pages})
    }

    render() {
        if (this.state.openOrderMoreDetails) {
            return (
                <Order />
            )
        }
        return (
            <div className="content header-custom-block">
                <Grid fluid>
                    <ChooseFilials title="Заказы" props={this.props.props} />
                    <div className="orders-block">
                        <div className="col-md-7">
                            <button type="button" className="btn btn-default active">Новые заказы</button>
                            <button type="button" className="btn btn-default">Выполненные заказы</button>
                            <button type="button" className="btn btn-default">Выполняется доставка</button>
                            <button type="button" className="btn btn-default">В обработке</button>
                        </div>
                        <div className="choose-date col-md-5">
                            <label className="col-md-4" htmlFor="usr">
                                Выберите дату:
                            </label>
                            <div className="col-md-4">
                                <input type="text" className="form-control" id="usr"/>
                            </div>
                            <div className="col-md-4">
                                <input type="text" className="form-control" id="usr"/>
                            </div>
                        </div>
                        <div className="clearfix"></div>
                    </div>

                    <div>
                        <div className="custom-table">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th>Номер заказа</th>
                                    <th>Время поступления</th>
                                    <th>Время доставки</th>
                                    <th>Сумма</th>
                                    <th>Имя</th>
                                    <th>Тел. заказчика</th>
                                    <th>Статус</th>
                                    <th>Подробности</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    this.state.info.map(item => {
                                        <Info item={item} moreDetails={this.moreDetails}/>
                                    })
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div>
                        <div className="pagination-block">
                            {
                                this.state.pages.map(item => {
                                    return <a className="active" href="#" >{item}</a>;
                                })
                            }
                        </div>
                    </div>
                </Grid>
            </div>
        );
    }
}

export default Orders;
