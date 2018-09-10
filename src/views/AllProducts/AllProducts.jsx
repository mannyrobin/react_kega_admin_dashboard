import React, {Component} from 'react';
import {Grid, Col, Table} from 'react-bootstrap';
import ChooseFilials from "../ChooseFilials/ChooseFilials";
import Pagination from "../pagination/Pagination";
import querystring from "querystring";
import axios from "axios";

class AllProducts extends Component {
    constructor (props) {
        super(props);
        this.state = {
            response: null,
            filteredData: [],
            alreadyFiltered: false,
            callFromRender: false,
            itemToDelete: null,
            existingFilterValue: "",
            categoryFilterValue: "",
            nameFilterValue: ""
        };
        this.getCertainInfos = this.getCertainInfos.bind(this);
        this.filterProducts = this.filterProducts.bind(this);
        this.openDeletePopup = this.openDeletePopup.bind(this);
        this.closeDeletePopup = this.closeDeletePopup.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
        this.filterProductsByBranch = this.filterProductsByBranch.bind(this);
    }

    openEditPage (id) {
        return () => {
            this.state.response.filter(item => {
                if (item.id === id) {
                    localStorage.setItem("itemToEdit", JSON.stringify(item));
                }
            });
            window.location.href = window.location.origin + "/#/add_product";
        };
    }

    openDeletePopup (id) {
        return () => {
            let popup = document.getElementById("delete-popup");
            popup.className = popup.className + " open-popup";
            this.setState({itemToDelete: id});
        }
    }

    closeDeletePopup () {
        let popup = document.getElementById("delete-popup");
        popup.className = popup.className.replace(" open-popup", "");
        this.setState({itemToDelete: null});
    }

    deleteProduct () {
        let self = this,
            id = this.state.itemToDelete;
        axios({
            method:'post',
            url: "http://u0419737.cp.regruhosting.ru/kega/item_controller.php",
            data: querystring.stringify({
                item_id: id,
                delete: 1
            }),
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            },
            responseType:'json'
        }).then(function(response) {
            let products = self.state.response.filter(product => product.id !== id);
            if (response.data.change_status) {
                self.closeDeletePopup();
                self.setState({response: products})
            }
        }).catch(function(error){
            throw new Error(error);
        });
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
        for (let i = 0; i < Math.ceil(this.state[`${this.state.filteredData.length ? "filteredData" : "response"}`].length / 15); ++i) {
            pages.push(i)
        }

        pages.length < 2 && localStorage.setItem('productsPageNumber', 0);
        return pages;
    }

    filterProductsByBranch (e) {
        console.log("????????????  ", this.props.props.data.arr)
        let value = null,
            branchId = null,
            self = this;
        if (!e) {
            value = this.props.props.data.arr[0].sub_market_name;
        } else {
            value = e.target.value;
        }
        self.props.props.data.arr.filter(item => {
            if (item.sub_market_name === value && !branchId) {
                branchId = item.sub_market_id;
            }
        });
        axios({
            method:'post',
            url: "http://u0419737.cp.regruhosting.ru/kega/item_controller.php",
            data: querystring.stringify({
                request_code: 3,
                sub_market_id: branchId
            }),
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            },
            responseType:'json'
        }).then(function(response) {
            self.setState({response: response.data, filteredData: [], existingFilterValue: "", categoryFilterValue: "", nameFilterValue: "", alreadyFiltered: false});
        }).catch(function(error){
            throw new Error(error);
        });
    }

    getExistingStatusCode (existingStatus) {
        switch (existingStatus) {
            case "Нет в наличии":
                return "0";
            case "Есть в наличии":
                return "1";
            default:
                return "2";
        }
    }

    filterProducts (filterType) {
        return (e) => {
            let { existingFilterValue, categoryFilterValue, nameFilterValue, response } = this.state;
            let filterByExistingStatus = this.getExistingStatusCode(existingFilterValue),
                filterByCategoryName = categoryFilterValue,
                filterByName = nameFilterValue,
                value = e && e.target.value,
                filteredData = response;
            switch (filterType) {
                case 0:
                    filterByExistingStatus = this.getExistingStatusCode(value);
                    break;
                case 1:
                    filterByCategoryName = value;
                    break;
                case 2:
                    filterByName = value || this.refs.filterByName.value;
                    break;
                default:

                    break;
            }
            if (filterByName) {
                if (filteredData.length) {
                    filteredData = filteredData.filter(item => (
                        item.name.toLowerCase().includes(filterByName.toLowerCase()) || item.manufacturer.toLowerCase().includes(filterByName.toLowerCase())
                    ));
                } else {
                    filteredData = response.filter(item => (
                        item.name.toLowerCase().includes(filterByName.toLowerCase()) || item.manufacturer.toLowerCase().includes(filterByName.toLowerCase())
                    ));
                }
            }
            if (filterByCategoryName) {
                filteredData = filteredData.filter(item => item.category_name.toLowerCase() === filterByCategoryName.toLowerCase());
            }
            if (filterByExistingStatus) {
                if (filterByExistingStatus !== "2") {
                    filteredData = filteredData.filter(item => item.existing_status == filterByExistingStatus);
                }
            }
            this.setState({filteredData, callFromRender: false, existingFilterValue: filterByExistingStatus === "0" ? "Нет в наличии" : filterByExistingStatus === "1" ? "Есть в наличии" : "Все", categoryFilterValue: filterByCategoryName, nameFilterValue: filterByName, alreadyFiltered: true});
        };
    }

    changeItemStatus (item) {
        return () => {
            let self = this;
            axios({
                method:'post',
                url: "http://u0419737.cp.regruhosting.ru/kega/item_controller.php",
                data: querystring.stringify({
                    request_code: 1,
                    existing_status: 1 - parseInt(item.existing_status),
                    item_id: item.id
                }),
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                },
                responseType:'json'
            }).then(function(response) {
                if (response.data.change_status) {
                    let changedResponse = self.state.response;
                    changedResponse[changedResponse.indexOf(item)].existing_status = 1 - parseInt(item.existing_status);
                    self.setState({response: changedResponse, callFromRender: true});
                }
            }).catch(function(error){
                throw new Error(error);
            });
        }
    }

    componentDidMount () {
        let self = this;
        axios({
            method:'post',
            url: "http://u0419737.cp.regruhosting.ru/kega/item_controller.php",
            data: querystring.stringify({
                request_code: 3,
                sub_market_id: localStorage.getItem('market_id')
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

    getInfoForCertainPage () {
        let certainPageInfo = [],
            pageNumber = parseInt(localStorage.getItem("productsPageNumber"));
        if (!pageNumber) {
            pageNumber = 0;
        }
        for (let i = pageNumber * 15; i < (pageNumber + 1) * 15; ++i) {
            if (this.state.filteredData.length || this.state.alreadyFiltered) {
                if ((this.state.existingFilterValue || this.state.categoryFilterValue || this.state.nameFilterValue) && this.state.filteredData[i]) {
                    certainPageInfo.push(this.state.filteredData[i]);
                }
            } else {
                if (this.state.response[i]) {
                    certainPageInfo.push(this.state.response[i]);
                }
            }
        }
        return certainPageInfo;
    }

    getCategoryNames () {
        let categoryNames = ["Все"];
        this.state.response.map(item => {
            if (item && categoryNames.indexOf(item.category_name) === -1) {
                categoryNames.push(item.category_name);
            }
        });
        return categoryNames;
    }

    componentWillUnmount () {
        localStorage.removeItem("productsPageNumber");
    }

    render() {
        this.state.callFromRender && this.filterProducts()();
        if (!this.state.response) {
            return (
                <div>Loading...</div>
            )
        }
        let paginationInfo = this.getPaginationInfo(),
            categoryNames = this.getCategoryNames();
        return (
            <div className="content">
                <Grid fluid>
                    <ChooseFilials filterProductsByBranch={this.filterProductsByBranch} title="Все товары" filials={this.props.props.data.arr} />
                    <div className="products-filter">
                        <div className="choose-date prod-filters-select col-md-6">
                            <label className="col-md-4" htmlFor="usr">
                                фильтр товаров:
                            </label>
                            <div className="col-md-4">
                                <select className="form-control processing" value={this.state.existingFilterValue} onChange={this.filterProducts(0)}>
                                    <option value="Все">Все</option>
                                    <option value="Нет в наличии">Нет в наличии</option>
                                    <option value="Есть в наличии">Есть в наличии</option>
                                </select>
                            </div>
                            <div className="col-md-4">
                                <select className="form-control processing" value={this.state.categoryFilterValue} onChange={this.filterProducts(1)}>
                                    {
                                        categoryNames && categoryNames.map((item, index) => <option value={item} key={index}>{item}</option>)
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="search-block col-md-6">
                            <input className="form-control" placeholder="Поиск по товаром" ref="filterByName" value={this.state.nameFilterValue} type="search" onChange={this.filterProducts(2)}/>
                            <button className="btn btn-default" onClick={this.filterProducts(2)}>Найти</button>
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
                                                <td><span className="edit" onClick={this.openEditPage(item.id)}></span><span className="trash pe-7s-trash" onClick={this.openDeletePopup(item.id)}></span></td>
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
                        paginationInfo.length > 1 && <Pagination pageName="productsPageNumber" arr={this.props.props.data.arr} pages={paginationInfo} getCertainInfos={this.getCertainInfos} self={this} />
                    }
                </Grid>
                <div id="delete-popup" className="popup-block">
                    <div className="popup-inner-delete">
                        <span className="close-icon" onClick={this.closeDeletePopup}>x</span>
                        <p>Удалить этот товар?</p>
                        <button className="btn" onClick={this.deleteProduct}>Yes</button>
                        <button className="btn" onClick={this.closeDeletePopup}>No</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default AllProducts;