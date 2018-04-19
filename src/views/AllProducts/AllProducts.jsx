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
            response: null
        };
        this.getCertainInfos = this.getCertainInfos.bind(this);
    }

    getCertainInfos (index, arr, self) {
        let infoToShow = [];
        if (!index) {
            index = 0;
        }
        debugger
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
            debugger
            self.setState({response: response})
        }).catch(function(error){
            throw new Error(error);
        });
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
                            <input className="form-control" placeholder="Поиск по товаром" type="search"/>
                            <button className="btn btn-default">Найти</button>
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
                                <tr className="no-in-stock">
                                    <td className="prod-img" width="62px"><div></div></td>
                                    <td>Наименование</td>
                                    <td>Категория</td>
                                    <td>Запасы</td>
                                    <td className="select-td">
                                        <select className="form-control">
                                            <option>Нет в наличии</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                        </select>
                                    </td>
                                    <td><span className="edit"></span><span className="trash pe-7s-trash"></span></td>
                                </tr>
                                <tr>
                                    <td className="prod-img" width="62px"><div className="prod-img"></div></td>
                                    <td>Наименование</td>
                                    <td>Категория</td>
                                    <td>Запасы</td>
                                    <td className="select-td">
                                        <select className="form-control">
                                            <option>В наличии</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                        </select>
                                    </td>
                                    <td><span className="edit"></span><span className="trash pe-7s-trash"></span></td>
                                </tr>
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                    <div className="clearfix"></div>
                   <Pagination arr={this.props.props.data.arr} pages={this.getPaginationInfo()} getCertainInfos={this.getCertainInfos} self={this} />
                </Grid>
            </div>
        );
    }
}

export default AllProducts;