import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';
import Order from './Order';
import Info from './Info';
import ChooseFilials from "../ChooseFilials/ChooseFilials";
import Pagination from "../pagination/Pagination";
import axios from "axios";
import querystring from "querystring";

class Orders extends Component {
    constructor (props) {
        super(props);
        this.openMoreDetails = this.openMoreDetails.bind(this);
        this.closeMoreDetails = this.closeMoreDetails.bind(this);
        this.state = {
            response: null,
            openOrderMoreDetails: {
                enabled: false,
                itemId: null
            },
            filteredResponse: [],
            selectedFielialId: this.props.props.data.arr[0].sub_market_id
        }
    }

    openMoreDetails (id) {
        return (e) => {
            e.preventDefault();
            this.setState({openOrderMoreDetails: {enabled: true, itemId: id}});
        };
    }

    closeMoreDetails () {
        this.setState({openOrderMoreDetails: {enabled: false, itemId: null}});
    }

    getInfoForCertainPage () {
        let certainPageInfo = [],
            pageNumber = parseInt(localStorage.getItem("ordersPageNumber"));
        if (!pageNumber) {
            pageNumber = 0;
        }
        for (let i = pageNumber * 15; i < (pageNumber + 1) * 15; ++i) {
            // if (this.state.filteredResponse.length || (this.refs && this.refs.filter && this.refs.filter.value)) {
            //     if (this.state.filteredResponse[i]) {
            //         certainPageInfo.push(this.state.filteredResponse[i]);
            //     }
            if(this.state.response[i]) {
                certainPageInfo.push(this.state.response[i]);
            }
        }
        return certainPageInfo;
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
        for (let i = 0; i < Math.ceil(this.state[`${this.state.filteredResponse.length ? "filteredResponse" : "response"}`].length / 15); ++i) {
            pages.push(i)
        }

        pages.length < 2 && localStorage.setItem('ordersPageNumber', 0);
        return pages;
    }

    componentDidMount () {
        let self = this;
        axios({
            method:'post',
            url: "http://u0419737.cp.regruhosting.ru/kega/orders_controller.php",
            data: querystring.stringify({
                request_code: 1,
                market_id: self.state.selectedFielialId
            }),
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            },
            responseType:'json'
        }).then(function(response) {
            self.setState({response: response.data})
        }).catch(function(error){
            throw new Error(error);
        });
    }

    componentWillUnmount () {
        localStorage.removeItem("ordersPageNumber");
    }

    render() {
        if (!this.state.response) {
            return (
                <div>Loading...</div>
            )
        } else if (this.state.openOrderMoreDetails.enabled) {
            let itemToShow = this.state.response.filter(item => item.id === this.state.openOrderMoreDetails.itemId);
            return (
                <Order item={itemToShow[0]} closeMoreDetails={this.closeMoreDetails} />
            )
        }
        let paginationInfo = this.getPaginationInfo();
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
                                    this.getInfoForCertainPage().map(item => {
                                        return <Info key={item.id} item={item} openMoreDetails={this.openMoreDetails}/>
                                    })
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {
                        paginationInfo.length > 1 && <Pagination pageName="ordersPageNumber" arr={this.props.props.data.arr} pages={paginationInfo} getCertainInfos={this.getCertainInfos} self={this} />
                    }
                    {/*<Pagination arr={this.props.props.data.arr} pages={this.getPaginationInfo()} getCertainInfos={this.getCertainInfos} self={this} />*/}
                </Grid>
            </div>
        );
    }
}

export default Orders;
