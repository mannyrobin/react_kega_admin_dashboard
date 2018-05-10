import React, {Component} from 'react';
import {Grid, Row, Col, Table} from 'react-bootstrap';
import ChooseFilials from "../ChooseFilials/ChooseFilials";
import Pagination from "../pagination/Pagination";
import querystring from "querystring";
import axios from "axios/index";

class AllProducts extends Component {
    constructor (props) {
        super(props);
        this.state = {
            response: null,
            filteredResponse: []
        };
        this.getCertainInfos = this.getCertainInfos.bind(this);
        this.filterProducts = this.filterProducts.bind(this);
    }

    getCertainInfos (index, arr, self) {
        let infoToShow = [];
        if (!index) {
            index = 0;
        }
        for (let i = index * 15; i <= (index + 1) * 15; ++i) {
            infoToShow.push(!arr ? this.state.data[i] : arr[i]);
        }
        infoToShow.length && arr && (self ? self.setState({infos: infoToShow}) : this.setState({infos: infoToShow}));
    }

    getPaginationInfo () {
        let pages = [];
        for (let i = 0; i < Math.ceil(this.state.response.data.length / 15); ++i) {
            pages.push(i)
        }

        return pages;
    }

    filterProducts () {
        let flteredData = [];
        if (this.refs.filter.value) {
            flteredData = this.state.response.data.filter(item => item.name.toLowerCase().includes(this.refs.filter.value));
        }
        this.setState({filteredResponse: flteredData});
    }

    changeItemStatus (item) {
        return () => {
            let changedResponse = this.state.response;
            changedResponse.data[changedResponse.data.indexOf(item)].existing_status = (item.existing_status === "0" ? "1" : "0");
            this.setState({response: changedResponse});

        }
    }

    componentDidMount () {
        let self = this;
        axios({
            method:'post',
            url: "http://u0419737.cp.regruhosting.ru/kega/item_controller.php",
            data: querystring.stringify({
                request_code: 3,
                sub_market_id: 5
            }),
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            },
            responseType:'json'
        }).then(function(response) {
            self.setState({response: response})
        }).catch(function(error){
            throw new Error(error);
        });
    }

    getInfoForCertainPage () {
        let certainPageInfo = [],
            pageNumber = parseInt(localStorage.getItem("pageNumber"));
        if (!pageNumber) {
            pageNumber = 0;
        }
        for (let i = pageNumber * 15; i < (pageNumber + 1) * 15; ++i) {
            if (this.state.filteredResponse.length || (this.refs && this.refs.filter && this.refs.filter.value)) {
                if (this.state.filteredResponse[i]) {
                    certainPageInfo.push(this.state.filteredResponse[i]);
                }
            } else if(this.state.response.data[i]) {
                certainPageInfo.push(this.state.response.data[i]);
            }
        }
        return certainPageInfo;
    }

    componentWillUnmount () {
        localStorage.removeItem("pageNumber");
    }

    render() {
        if (!this.state.response) {
            return (
                <div>Loading...</div>
            )
        }
        let paginationInfo = this.getPaginationInfo();
        return (
            <div className="content">
                <Grid fluid>
                    <ChooseFilials title="Все товары " props={this.props.props} />
                    <div className="products-filter">
                        <div className="choose-date prod-filters-select col-md-6">
                            <label className="col-md-4" htmlFor="usr">
                                фильтр товаров:
                            </label>
                            <div className="col-md-4">
                                <select className="form-control processing">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                </select>
                            </div>
                            <div className="col-md-4">
                                <select className="form-control processing">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                </select>
                            </div>
                        </div>
                        <div className="search-block col-md-6">
                            <input className="form-control" placeholder="Поиск по товаром" type="search" ref="filter"/>
                            <button className="btn btn-default" onClick={this.filterProducts}>Найти</button>
                        </div>
                        <div className="clearfix"></div>
                    </div>
                    <Col md={12}>
                        <div className="custom-table product-table">
                            <Table striped hover>
                                <thead>
                                <tr>
                                    <th width="62px">Фото</th>
                                    <th>Наименование товара</th>
                                    <th>Категория</th>
                                    <th>Цена, руб.</th>
                                    <th>Запасы</th>
                                    <th>Действия</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    this.getInfoForCertainPage().map((item, index) => {
                                        return (
                                            <tr className="no-in-stock" key={index}>
                                                <td className="prod-img" width="62px"><img src={item.icon_url}></img></td>
                                                <td>{item.manufacturer} - {item.name}</td>
                                                <td>{item.category_name}</td>
                                                <td>{item.price}</td>
                                                <td className="select-td">
                                                    <select className="form-control" value={item.existing_status} onChange={this.changeItemStatus(item)}>
                                                        <option value="0">Нет в наличии</option>
                                                        <option value="1">Есть в наличии</option>
                                                    </select>
                                                </td>
                                                <td><span className="edit"></span><span className="trash pe-7s-trash"></span></td>
                                            </tr>
                                        )
                                    })
                                }
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                    <div className="clearfix"></div>
                    {
                        paginationInfo.length > 1 && <Pagination arr={this.props.props.data.arr} pages={paginationInfo} getCertainInfos={this.getCertainInfos} self={this} />
                    }
                </Grid>
            </div>
        );
    }
}

export default AllProducts;