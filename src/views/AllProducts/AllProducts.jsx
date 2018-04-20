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
        for (let i = index * 15; i <= (index + 1) * 15; ++i) {
            infoToShow.push(!arr ? this.state.data[i] : arr[i]);
        }
        infoToShow.length && arr && (self ? self.setState({infos: infoToShow}) : this.setState({infos: infoToShow}));
    }

    getPaginationInfo () {
        let pages = [];
        for (let i = 0; i < Math.ceil(this.state.response.length / 15); ++i) {
            pages.push(i)
        }

        return pages;
    }


    componentDidMount () {
        let self = this;
        let obj = {
            lcohol_percent: "4.7",
            capacity: "1",
            category_id: "1",
            category_name: "Разливное пиво",
            country: "Россия",
            cover_url: "http://u0419737.cp.regruhosting.ru/kega/files/item_covers/01.JPG",
            description: "Светлый нефильтрованный лагер, с гармоничным солодовым вкусом и мягкой хмелевой горечью. Классика немецких традиций.",
            existing_status: "0",
            icon_url: "http://u0419737.cp.regruhosting.ru/kega/files/items/item02.JPG",
            id: "12",
            manufacturer: "Vansdorf",
            market_id: "5",
            name: "Helles",
            price: "130"
        };
        let obj1 = {
            lcohol_percent: "4.7",
            capacity: "1",
            category_id: "1",
            category_name: "Разливное пиво",
            country: "Россия",
            cover_url: "http://u0419737.cp.regruhosting.ru/kega/files/item_covers/01.JPG",
            description: "Светлый нефильтрованный лагер, с гармоничным солодовым вкусом и мягкой хмелевой горечью. Классика немецких традиций.",
            existing_status: "0",
            icon_url: "http://u0419737.cp.regruhosting.ru/kega/files/items/item02.JPG",
            id: "12",
            manufacturer: "Vansdorf",
            market_id: "5",
            name: "Helles",
            price: "500000000"
        };
        let obj2 = {
            lcohol_percent: "4.7",
            capacity: "1",
            category_id: "1",
            category_name: "Разливное пиво",
            country: "Россия",
            cover_url: "http://u0419737.cp.regruhosting.ru/kega/files/item_covers/01.JPG",
            description: "Светлый нефильтрованный лагер, с гармоничным солодовым вкусом и мягкой хмелевой горечью. Классика немецких традиций.",
            existing_status: "0",
            icon_url: "http://u0419737.cp.regruhosting.ru/kega/files/items/item02.JPG",
            id: "12",
            manufacturer: "Vansdorf",
            market_id: "5",
            name: "Helles",
            price: "2222222222"
        };
        let arr = [];
        arr.push(obj2);
        for (let i = 0; i < 40; ++i) {
            arr.push(obj);
        }
        arr.push(obj1);
        this.setState({response: arr});
        // axios({
        //     method:'post',
        //     url: "http://u0419737.cp.regruhosting.ru/kega/item_controller.php",
        //     data: querystring.stringify({
        //         request_code: 3,
        //         sub_market_id: 5
        //     }),
        //     headers: {
        //         'Content-type': 'application/x-www-form-urlencoded'
        //     },
        //     responseType:'json'
        // }).then(function(response) {
        //     debugger
        //     self.setState({response: response})
        // }).catch(function(error){
        //     throw new Error(error);
        // });
    }

    getInfoForCertainPage () {
        let certainPageInfo = [],
            pageNumber = parseInt(localStorage.getItem("pageNumber"));
        debugger
        for (let i = pageNumber * 15; i < (pageNumber + 1) * 15; ++i) {
            this.state.response[i] && certainPageInfo.push(this.state.response[i]);
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
        console.log("????????????????  ", this.getInfoForCertainPage());
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
                                {
                                    this.getInfoForCertainPage().map((item, index) => {
                                        return (
                                            <tr className="no-in-stock">
                                                <td className="prod-img" width="62px"><img src={item.icon_url}></img></td>
                                                <td>{item.manufacturer} - {item.name}</td>
                                                <td>{item.category_name}</td>
                                                <td>{item.price}</td>
                                                <td className="select-td">
                                                    <select className="form-control">
                                                        <option selected={item.existing_status === "0"}>Нет в наличии</option>
                                                        <option selected={item.existing_status === "1"}>Есть в наличии</option>
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