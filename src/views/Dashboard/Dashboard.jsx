import React, {Component} from 'react';
import ChartistGraph from 'react-chartist';
import {Grid, Row, Col} from 'react-bootstrap';


import {Card} from 'components/Card/Card.jsx';
import {StatsCard} from 'components/StatsCard/StatsCard.jsx';
import {Tasks} from 'components/Tasks/Tasks.jsx';
import {
    dataPie,
    legendPie,
    dataSales,
    optionsSales,
    responsiveSales,
    legendSales,
    dataBar,
    optionsBar,
    responsiveBar,
    legendBar
} from 'variables/Variables.jsx';

class Dashboard extends Component {
    constructor (props) {
        super(props);
    }

    componentDidMount () {
    }

    render() {
        return (
            <div className="content header-custom-block">
                <Grid fluid>
                    <h2 className="custom-header-h2 custom-dashboard-header">
                        <span>ЗАКАЗЫ</span>
                        <div className="custom-select col-md-4">
                            <label className="col-md-5" htmlFor="sel1">Выберите филиал:</label>
                            <select className="form-control col-md-7" id="sel1">
                                {/*{this.props.props.data.arr && this.props.props.data.arr.map(item => {*/}
                                    {/*console.log("?????????????????  ", item)*/}
                                    {/*return <option key={item.sub_market_id}>{item.sub_market_name}</option>*/}
                                {/*})}*/}
                            </select>
                        </div>
                        <div className="clearfix"></div>
                    </h2>
                    <div className="orders-block">
                        <div className="col-md-7">
                            <button type="button" className="btn btn-default active">новые заказы</button>
                            <button type="button" className="btn btn-default">выполненные заказы</button>
                            <button type="button" className="btn btn-default">выполняется доставка</button>
                            <button type="button" className="btn btn-default">в обработке</button>
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
                                    <th>номер заказа</th>
                                    <th>время поступления</th>
                                    <th>время доставки</th>
                                    <th>сумма</th>
                                    <th>имя</th>
                                    <th>тел. заказчика</th>
                                    <th>статус</th>
                                    <th>подробности</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>John</td>
                                    <td>John</td>
                                    <td>John</td>
                                    <td>John</td>
                                    <td>John</td>
                                    <td>John</td>
                                    <td>
                                        <select className="form-control new-order">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                        </select>
                                    </td>
                                    <td><a href="#">Подробнее</a></td>
                                </tr>
                                <tr>
                                    <td>John</td>
                                    <td>John</td>
                                    <td>John</td>
                                    <td>John</td>
                                    <td>John</td>
                                    <td>John</td>
                                    <td>
                                        <select className="form-control processing">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                        </select>
                                    </td>
                                    <td><a href="#">Подробнее</a></td>
                                </tr>
                                <tr>
                                    <td>John</td>
                                    <td>John</td>
                                    <td>John</td>
                                    <td>John</td>
                                    <td>John</td>
                                    <td>John</td>
                                    <td>
                                        <select className="form-control delivery">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                        </select>
                                    </td>
                                    <td><a href="#">Подробнее</a></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div>
                        <div className="pagination-block">
                            <a className="active" href="#">1</a>
                            <a href="#">2</a>
                            <a href="#">3</a>
                        </div>
                    </div>
                </Grid>
            </div>
        );
    }
}

export default Dashboard;
