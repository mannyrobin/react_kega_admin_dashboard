import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';
import Order from './Order';
import Info from './Info';
import ChooseFilials from "../ChooseFilials/ChooseFilials";
import Pagination from "../pagination/Pagination";

class Orders extends Component {
    constructor (props) {
        super(props);
        this.moreDetails = this.moreDetails.bind(this);
        this.state = {
            openOrderMoreDetails: false,
            infos: []
        }
    }

    moreDetails () {
        this.setState({openOrderMoreDetails: true});
    }

    getCertainInfos (index, arr, self) {
        let infoToShow = [];
        if (!index) {
            index = 0;
        }
        for (let i = index * 15; i <= (index + 1) * 15; ++i) {
            infoToShow.push(!arr ? this.props.props.data.arr[i] : arr[i]);
        }
        infoToShow.length && arr && (self ? self.setState({infos: infoToShow}) : this.setState({infos: infoToShow}));
    }

    getPaginationInfo () {
        let pages = [];
        for (let i = 0; i <= Math.ceil(45 / 15); ++i) {
            pages.push(i)
        }

        return pages;
    }

    componentDidMount () {
        this.getCertainInfos();
    }

    componentWillUnmount () {
        localStorage.removeItem("pageNumber");
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
                                    this.state.infos.map(item => {
                                        return <Info item={item} moreDetails={this.moreDetails}/>
                                    })
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <Pagination arr={this.props.props.data.arr} pages={this.getPaginationInfo()} getCertainInfos={this.getCertainInfos} self={this} />
                </Grid>
            </div>
        );
    }
}

export default Orders;
