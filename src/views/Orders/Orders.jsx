import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';
import Order from './Order';
import Info from './Info';
import ChooseFilials from "../ChooseFilials/ChooseFilials";
import Pagination from "../pagination/Pagination";
import axios from "axios";
import querystring from "querystring";
import Moment from 'moment';
import { extendMoment } from 'moment-range';

class Orders extends Component {
    constructor (props) {
        super(props);
        this.openMoreDetails = this.openMoreDetails.bind(this);
        this.closeMoreDetails = this.closeMoreDetails.bind(this);
        this.changeFililal = this.changeFililal.bind(this);
        this.removeChangedItem = this.removeChangedItem.bind(this);
        this.updateItem = this.updateItem.bind(this);
        this.onchangeDatePicker = this.onchangeDatePicker.bind(this);
        this.state = {
            toDate: Moment().format('YYYY-MM-DD'),
            fromDate: Moment().subtract(1, 'months').format('YYYY-MM-DD'),
            response: null,
            openOrderMoreDetails: {
                enabled: localStorage.getItem("notificationEnabled"),
                itemId: localStorage.getItem("notificationItemId"),
                loadedItem: false
            },
            filteredResponse: [],
            filteredResponseByDate: [],
            alreadyFilteredByBranch: false,
            IsFilteredByDate: false,
            selectedFielialId: this.props.props.data.arr[0].sub_market_id,
            buttons: ["Все заказы", "Новые заказы", "Выполнен", "Доставка", "В обработке"],
            activeButton: "Все заказы"
        }
    }

    removeChangedItem (id) {
        let filteredItems = this.state.response.filter(item => item.id !== id);
        this.setState({response: filteredItems});
    }

    updateItem (itemToUpdate) {
        let newData = this.state.response.map(item => {
            if (item.id === itemToUpdate.id) {
                item.status = "3";
            }
            return item;
        });
        this.setState({response: newData, openOrderMoreDetails: {enabled: false, itemId: null}});
    }

    getCertainOrders (name) {
        return () => {
            if (this.state.buttons.indexOf(name) === 0) {
                localStorage.setItem("allOrders", true);
                this.getAllOrders();
            } else {
                localStorage.removeItem("allOrders");
                let self = this;
                axios({
                    method:'post',
                    url: "http://u0419737.cp.regruhosting.ru/kega/orders_controller.php",
                    data: querystring.stringify({
                        request_code: 2,
                        status: self.state.buttons.indexOf(name),
                        sub_market_id: localStorage.getItem('sub_market_id')
                    }),
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded'
                    },
                    responseType:'json'
                }).then(function(response) {
                    self.setState({response: response.data, activeButton: name, filteredResponseByDate: [], filteredByDate: false, toDate: Moment().format('YYYY-MM-DD'), fromDate: Moment().subtract(1, 'months').format('YYYY-MM-DD')});
                }).catch(function(error){
                    throw new Error(error);
                });
            }
        }
    }

    openMoreDetails (id) {
        return (e) => {
            e.preventDefault();
            this.setState({openOrderMoreDetails: {enabled: true, itemId: id}});
        };
    }

    closeMoreDetails () {
        localStorage.removeItem("notificationItemId");
        localStorage.removeItem("notificationEnabled");
        this.setState({openOrderMoreDetails: {enabled: false, itemId: null, loadedItem: null}});
    }

    changeFililal (e) {
        let value = e.target.value,
            self = this;
        localStorage.setItem('sub_market_id', value);
        axios({
            method:'post',
            url: "http://u0419737.cp.regruhosting.ru/kega/orders_controller.php",
            data: querystring.stringify({
                request_code: 1,
                sub_market_id: localStorage.getItem('sub_market_id')
            }),
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            },
            responseType:'json'
        }).then(function(response) {
            self.setState({response: response.data, activeButton: "Все заказы"});
        }).catch(function(error){
            throw new Error(error);
        });
    }

    getInfoForCertainPage () {
        let certainPageInfo = [],
            pageNumber = parseInt(localStorage.getItem("ordersPageNumber"));
        if (!pageNumber) {
            pageNumber = 0;
        }
        for (let i = pageNumber * 15; i < (pageNumber + 1) * 15; ++i) {
            if (this.state.filteredByDate) {
                if (this.state.filteredResponseByDate[i]) {
                    certainPageInfo.push(this.state.filteredResponseByDate[i]);
                }
            } else if(this.state.response[i]) {
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
        localStorage.setItem("allOrders", true);
        let itemId = localStorage.getItem("notificationItemId");
        if (itemId) {
            this.getNotificationItem(itemId);
        }
        this.getAllOrders();
    }

    getNotificationItem (itemId) {
        let self = this;
        axios({
            method:'post',
            url: "http://u0419737.cp.regruhosting.ru/kega/orders_controller.php",
            data: querystring.stringify({
                request_code: 5,
                order_id: itemId
            }),
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            },
            responseType:'json'
        }).then(function(response) {
            let { openOrderMoreDetails } = self.state;
            openOrderMoreDetails.loadedItem = response.data;
            self.setState({openOrderMoreDetails});
        }).catch(function(error){
            throw new Error(error);
        });
    }

    getAllOrders () {
        let self = this;
        axios({
            method:'post',
            url: "http://u0419737.cp.regruhosting.ru/kega/orders_controller.php",
            data: querystring.stringify({
                request_code: 1,
                sub_market_id: localStorage.getItem('sub_market_id')
            }),
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            },
            responseType:'json'
        }).then(function(response) {
            self.setState({response: response.data, activeButton: "Все заказы"});
        }).catch(function(error){
            throw new Error(error);
        });
    }

    componentWillUnmount () {
        localStorage.removeItem("ordersPageNumber");
        localStorage.removeItem("allOrders");
    }

    onchangeDatePicker (date) {
        return (e) => {
            const moment = extendMoment(Moment);
            let { toDate, fromDate } = this.state;
            if (date === "to") {
                toDate = e.target.value;
            } else {
                fromDate = e.target.value;
            }
            let range = moment.range(fromDate, toDate);
            if (range.diff("days") < 0) {
                return;
            }

            let filteredResponseByDate = this.state.response.filter(item => {
                return range.contains(moment(item.start_date))
            });

            this.setState({filteredByDate: true, filteredResponseByDate, toDate, fromDate});
        };
    }

    render () {
        let { response, openOrderMoreDetails } = this.state;
        if (!response) {
            return (
                <div>Loading...</div>
            )
        } else if (openOrderMoreDetails.enabled) {
            let itemToShow = null,
                itemId = localStorage.getItem("notificationItemId");
            if (itemId) {
                if (!openOrderMoreDetails.loadedItem) {
                    return (
                        <div>
                            Loading...
                        </div>
                    )
                } else {
                    itemToShow = openOrderMoreDetails.loadedItem;
                    localStorage.removeItem("notificationEnabled");
                    localStorage.removeItem("notificationItemId");
                    return (
                        <Order item={itemToShow} updateItem={this.updateItem} closeMoreDetails={this.closeMoreDetails} />
                    )
                }
            } else {
                itemToShow = response.filter(item => item.id === openOrderMoreDetails.itemId);
            }
            return (
                <Order item={itemToShow[0]} updateItem={this.updateItem} closeMoreDetails={this.closeMoreDetails} />
            )
        }
        let paginationInfo = this.getPaginationInfo();
        return (
            <div className="content header-custom-block">
                <Grid fluid>
                    <ChooseFilials getByBranch={this.changeFililal} title="Заказы" filials={this.props.props.data.arr} />
                    <div className="orders-block">
                        <div className="col-md-7">
                            {
                                this.state.buttons.map((item, index) => {
                                    return (
                                        <button key={index} type="button" onClick={this.getCertainOrders(item)} className={`${this.state.activeButton === item ? "active" : ""} btn btn-default`}>{item}</button>
                                    )
                                })
                            }
                        </div>
                        <div className="choose-date col-md-5">
                            <label className="col-md-4 choose-date-text" htmlFor="usr">
                                Выберите дату:
                            </label>
                            <div className="col-md-4">
                                <input type="date" onChange={this.onchangeDatePicker("from")} value={this.state.fromDate} className="form-control" id="usr"/>
                            </div>
                            <div className="col-md-4">
                                <input type="date" onChange={this.onchangeDatePicker("to")} value={this.state.toDate} className="form-control" id="usr"/>
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
                                        return <Info removeChangedItem={this.removeChangedItem} statusNames={this.state.buttons} key={item.id} item={item} openMoreDetails={this.openMoreDetails}/>
                                    })
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {
                        paginationInfo.length > 1 && <Pagination pageName="ordersPageNumber" arr={this.props.props.data.arr} pages={paginationInfo} getCertainInfos={this.getCertainInfos} self={this} />
                    }
                </Grid>
            </div>
        );
    }
}

export default Orders;
