import React, {Component} from 'react';
import {Grid, Row} from 'react-bootstrap';
import ChooseFilials from "../ChooseFilials/ChooseFilials";
import axios from "axios/index";
import querystring from "querystring";

class ProductCat extends Component {
    constructor (props) {
        super(props);
        this.removeCategory = this.removeCategory.bind(this);
        this.addCategory = this.addCategory.bind(this);
        this.openEditField = this.openEditField.bind(this);
        this.updateCategory = this.updateCategory.bind(this);
        this.changeBranchId = this.changeBranchId.bind(this);
        this.closeRemoveCategoryPopup = this.closeRemoveCategoryPopup.bind(this);
        this.state = {
            response: null,
            openPopup: false
        }
    }

    changeBranchId (e) {
        let value = e.target.value;
        localStorage.setItem('sub_market_id', value);
        this.setState({selectedFielialId: value});
    }

    closeRemoveCategoryPopup () {
        this.setState({openPopup: false});
    }

    openEditField (id) {
        return () => {
            let currentRes = this.state.response;
            currentRes = currentRes.map(item => {
                if (item.id === id) {
                    item.open = !item.open;
                }
                return item;
            });
            this.setState({response: currentRes});

        }
    }

    updateCategory (id) {
        return () => {
            let self = this,
                newName = self.refs.editCatName.value;
            if (newName) {
                axios({
                    method:'post',
                    url: "http://u0419737.cp.regruhosting.ru/kega/categories_controller.php",
                    data: querystring.stringify({
                        request_code: 4,
                        sub_market_id: localStorage.getItem('sub_market_id'),
                        category_id: id,
                        category_name: newName
                    }),
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded'
                    },
                    responseType:'json'
                }).then(function(response) {
                    if (response.data.delete_status) {
                        let currentRes = self.state.response;
                        currentRes = currentRes.filter(item => {
                            if (item.id === id) {
                                item.name = newName;
                            }
                            return item;
                        });
                        self.openEditField(id)();
                        self.setState({response: currentRes});
                    }
                }).catch(function(error){
                    throw new Error(error);
                });
            }
        }
    }

    removeCategory (id) {
        return () => {
            let self = this,
                res = self.state.response,
                itemToDelete = null;
            res.map(item => {
                if (item.id === id && parseInt(item.count) === 0) {
                    itemToDelete = true;
                }
            });
            if (itemToDelete) {
                axios({
                    method:'post',
                    url: "http://u0419737.cp.regruhosting.ru/kega/categories_controller.php",
                    data: querystring.stringify({
                        request_code: 2,
                        market_id: localStorage.getItem('market_id'),
                        category_id: id
                    }),
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded'
                    },
                    responseType:'json'
                }).then(function(response) {
                    if (response.data.delete_status) {
                        let currentRes = self.state.response;
                        currentRes = currentRes.filter(item => item.id !== id);
                        self.setState({response: currentRes});
                    }
                }).catch(function(error){
                    throw new Error(error);
                });
            } else {
                this.setState({openPopup: true});
            }
        }
    }

    addCategory (id) {
        let self = this,
            catName = self.refs.newCatName.value;
        axios({
            method:'post',
            url: "http://u0419737.cp.regruhosting.ru/kega/categories_controller.php",
            data: querystring.stringify({
                request_code: 3,
                market_id: localStorage.getItem('market_id'),
                sub_market_id: localStorage.getItem('sub_market_id'),
                category_name: catName
            }),
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            },
            responseType:'json'
        }).then(function(response) {
            if (response.data.add_status) {
                let currentRes = self.state.response,
                    greatestId = 0;
                currentRes.map(item => {
                    let id = parseInt(item.id);
                    if (id > greatestId) {
                        greatestId = id;
                    }
                });
                let newCat = {
                        id: ++greatestId,
                        count: 0,
                        name: catName
                    };
                currentRes.push(newCat);
                self.setState({response: currentRes});
            }
        }).catch(function(error){
            throw new Error(error);
        });
    }

    componentDidMount () {
        let self = this;
        axios({
            method:'post',
            url: "http://u0419737.cp.regruhosting.ru/kega/categories_controller.php",
            data: querystring.stringify({
                request_code: 1,
                sub_market_id: localStorage.getItem('sub_market_id')
            }),
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            },
            responseType:'json'
        }).then(function(response) {
            self.setState({response: response.data});
        }).catch(function(error){
            throw new Error(error);
        });
    }

    render() {
        let { response } = this.state;
        if (!response) {
            return (
                <div>Loading...</div>
            )
        }
        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        <div className="col-md-12 add-stock">
                            <ChooseFilials getByBranch={this.changeBranchId} title="Категории товаров" filials={this.props.props.data.arr}  />
                            <div className="col-md-5">
                                <h3>Категории</h3>
                                {
                                    response.map(item => {
                                        return [
                                            <div key={item.id} className="name-and-edit-prod">
                                                <span className="prod-edit-name">{item.name}</span>
                                                <span className="prod-edit-write">{item.count} записей</span>
                                                <span className="prod-edit-icons">
                                                    <span className="edit" onClick={this.openEditField(item.id)}/>
                                                    <span className="trash pe-7s-trash" onClick={this.removeCategory(item.id)} />
                                                </span>
                                            </div>,
                                            <div className="custom-edit-block">
                                                {
                                                    item.open && <input type="text" placeholder="Please enter new name of the category" ref="editCatName"/>
                                                }
                                                {
                                                    item.open && <button onClick={this.updateCategory(item.id)}>Изменить</button>
                                                }
                                            </div>
                                        ]
                                    })
                                }
                            </div>
                            <div className="col-md-7 add-new-cat">
                                <h3>Добавить новую категорию</h3>
                                <div className="stock-search">
                                    <label>Наименование категории</label>
                                    <div className="input-search">
                                    <input className="form-control" type="search" placeholder="Введите наименование" ref="newCatName" />
                                    <button onClick={this.addCategory}>Добавить категорию</button>
                                    </div>
                                    <div className="clearfix"></div>
                                </div>
                                <p>Название определяет, как категория будет отображаться в приложении</p>
                            </div>
                        </div>
                    </Row>
                </Grid>
                {
                    this.state.openPopup && <div id="remove-filial-popup" className="popup-block open-popup">
                        <div className="popup-inner-delete">
                            <span className="close-icon" onClick={this.closeRemoveCategoryPopup}>x</span>
                            <p>Вы не можете удалить эту категорию</p>
                            <button onClick={this.closeRemoveCategoryPopup}>Ок</button>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default ProductCat;
