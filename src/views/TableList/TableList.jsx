import React, {Component} from 'react';
import {Grid, Row, Col, Table} from 'react-bootstrap';

import Card from 'components/Card/Card.jsx';
import {thArray, tdArray} from 'variables/Variables.jsx';

class TableList extends Component {

    render() {
        return (
            <div className="content">
                <Grid fluid>
                    <h2 className="custom-header-h2 custom-dashboard-header">
                        <span>ЗАКАЗЫ</span>
                        <div className="custom-select col-md-4">
                            <label className="col-md-5" htmlFor="sel1">Выберите филиал:</label>
                            <select className="form-control col-md-7" id="sel1">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                            </select>
                        </div>
                        <div className="clearfix"></div>
                    </h2>
                    <div className="products-filter">
                        <div className="choose-date prod-filters-select col-md-6">
                            <label className="col-md-4 choose-date-text" htmlFor="usr">
                                Выберите дату:
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
                            <input className="form-control" type="search"/>
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
                                    <td className="select-td">
                                        <select className="form-control">
                                            <option>Нет в наличии</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                        </select>
                                    </td>
                                    <td>Запасы</td>
                                    <td><span className="edit"></span><span className="trash pe-7s-trash"></span></td>
                                </tr>
                                <tr>
                                    <td className="prod-img" width="62px"><div className="prod-img"></div></td>
                                    <td>Наименование</td>
                                    <td>Категория</td>
                                    <td className="select-td">
                                        <select className="form-control">
                                            <option>В наличии</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                        </select>
                                    </td>
                                    <td>Запасы</td>
                                    <td><span className="edit"></span><span className="trash pe-7s-trash"></span></td>
                                </tr>
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                    <div className="clearfix"></div>
                    <div className="pagination-block">
                        <a className="active" href="#">1</a>
                        <a href="#">2</a>
                        <a href="#">3</a>
                    </div>
                </Grid>
            </div>
        );
    }
}

export default TableList;
