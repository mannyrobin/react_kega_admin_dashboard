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
        this.removeChangedItem = this.removeChangedItem.bind(this);
        this.updateItem = this.updateItem.bind(this);
        this.onchangeDatePicker = this.onchangeDatePicker.bind(this);
        this.state = {
            toDate: Moment().format('YYYY-MM-DD'),
            fromDate: Moment().subtract(1, 'months').format('YYYY-MM-DD'),
            response: null,
            openOrderMoreDetails: {
                enabled: false,
                itemId: null
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
                        market_id: self.state.selectedFielialId
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
        this.setState({openOrderMoreDetails: {enabled: false, itemId: null}});
    }

    // filterProducts () {
    //     let flteredData = [];
    //     if (this.refs.filter.value) {
    //         flteredData = this.state.filteredResponse.filter(item => (
    //             item.name.toLowerCase().includes(this.refs.filter.value.toLowerCase()) || item.manufacturer.toLowerCase().includes(this.refs.filter.value.toLowerCase())
    //         ));
    //     }
    //     this.setState({filteredResponseByDate: flteredData, IsFilteredByDate: true});
    // }

    filterOrdersByBranch (e) {
        let value = null;
        if (!e) {
            value = this.props.props.data.arr[0].sub_market_name;
        } else {
            value = e.target.value;
        }
        let branchId = null;
        this.props.props.data.arr.filter(item => {
            if (item.sub_market_name === value && !branchId) {
                branchId = item.sub_market_id;
            }
        });
        let flteredData = this.state[`${(this.state.filteredResponse.length && this.state.IsFilteredByDate) ? "filteredResponse" : "response"}`].filter(item => item.category_id === branchId);
        if (this.refs.filter) {
            this.refs.filter.value = null;
        }
        this.setState({filteredResponse: flteredData, alreadyFilteredByBranch: true, filteredResponseByDate: []});
    }

    // getInfoForCertainPage () {
    //     let certainPageInfo = [],
    //         pageNumber = parseInt(localStorage.getItem("ordersPageNumber"));
    //     if (!pageNumber) {
    //         pageNumber = 0;
    //     }
    //     if (!this.state.alreadyFilteredByBranch) {
    //         this.filterProductsByBranch();
    //     }
    //     for (let i = pageNumber * 15; i < (pageNumber + 1) * 15; ++i) {
    //         if (this.state.filteredResponseByDate.length || (this.refs && this.refs.filter && this.refs.filter.value)) {
    //             if (this.state.filteredResponseByDate[i]) {
    //                 certainPageInfo.push(this.state.filteredResponseByDate[i]);
    //             }
    //         } else if(this.state.filteredResponse[i]) {
    //             certainPageInfo.push(this.state.filteredResponse[i]);
    //         }
    //     }
    //     return certainPageInfo;
    // }

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

    // getPaginationInfo () {
    //     let pages = [];
    //     for (let i = 0; i < Math.ceil(this.state[`${this.state.filteredResponseByDate.length ? "filteredResponseByDate" : "filteredResponse"}`].length / 15); ++i) {
    //         pages.push(i)
    //     }
    //
    //     pages.length < 2 && localStorage.setItem('ordersPageNumber', 0);
    //     return pages;
    // }

    componentDidMount () {
        localStorage.setItem("allOrders", true);
        this.getAllOrders(1);
    }

    getAllOrders () {
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
        if (!this.state.response) {
            return (
                <div>Loading...</div>
            )
        } else if (this.state.openOrderMoreDetails.enabled) {
            let itemToShow = this.state.response.filter(item => item.id === this.state.openOrderMoreDetails.itemId);
            return (
                <Order item={itemToShow[0]} updateItem={this.updateItem} closeMoreDetails={this.closeMoreDetails} />
            )
        }
        let paginationInfo = this.getPaginationInfo();
        return (
            <div className="content header-custom-block">
                <Grid fluid>
                    <ChooseFilials /*filterOrdersByBranch={this.filterOrdersByBranch}*/ title="Заказы" filials={this.props.props.data.arr} />
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
