import React, {Component} from 'react';
import Order from './Order';
import Info from './Info';
import { Grid } from 'react-bootstrap';
import ChooseFilials from "../ChooseFilials/ChooseFilials";

class Orders extends Component {
    constructor (props) {
        super(props);
        this.moreDetails = this.moreDetails.bind(this);
        this.state = {
            openOrderMoreDetails: false,
            info: [],
            pages: []
        }
    }

    moreDetails () {
        this.setState({openOrderMoreDetails: true});
    }

    componentDidMount () {
        let pages = [];
        for (let i = 0; i < parseInt(this.props.props.data.arr.length / 15); ++i) {
            pages.push(1)
        }
        this.setState({pages: pages})
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
                    <ChooseFilials props={this.props.props} />
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

export default Orders;
