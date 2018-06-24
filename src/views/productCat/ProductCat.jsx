import React, {Component} from 'react';
import {Grid, Row} from 'react-bootstrap';
import ChooseFilials from "../ChooseFilials/ChooseFilials";

class Contact extends Component {
    render() {
        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        <div className="col-md-12 add-stock">
                            <ChooseFilials title="Категории товаров" filials={this.props.props.data.arr}  />
                            <div className="col-md-5">
                                <h3>Категории</h3>
                                <div className="name-and-edit-prod">
                                    <span className="prod-edit-name">Бутылочное пиво</span>
                                    <span className="prod-edit-write">11 записей</span>
                                    <span className="prod-edit-icons">
                                        <span className="edit"></span>
                                        <span className="trash pe-7s-trash"></span>
                                    </span>
                                </div>
                                <div className="name-and-edit-prod">
                                    <span className="prod-edit-name">Разливное пиво</span>
                                    <span className="prod-edit-write">11 записей</span>
                                    <span className="prod-edit-icons">
                                        <span className="edit"></span>
                                        <span className="trash pe-7s-trash"></span>
                                    </span>
                                </div>
                                <div className="name-and-edit-prod">
                                    <span className="prod-edit-name">Лимонады</span>
                                    <span className="prod-edit-write">11 записей</span>
                                    <span className="prod-edit-icons">
                                        <span className="edit"></span>
                                        <span className="trash pe-7s-trash"></span>
                                    </span>
                                </div>
                                <div className="name-and-edit-prod">
                                    <span className="prod-edit-name">Закуски</span>
                                    <span className="prod-edit-write">11 записей</span>
                                    <span className="prod-edit-icons">
                                        <span className="edit"></span>
                                        <span className="trash pe-7s-trash"></span>
                                    </span>
                                </div>
                            </div>
                            <div className="col-md-7 add-new-cat">
                                <h3>Добавить новую категорию</h3>
                                <div className="stock-search">
                                    <label>Наименование категории</label>
                                    <div className="input-search">
                                    <input className="form-control" type="search" placeholder="Введите наименование" />
                                    <button>Добавить категорию</button>
                                    </div>
                                    <div className="clearfix"></div>
                                </div>
                                <p>Название определяет, как категория будет отображаться в приложении</p>
                            </div>
                        </div>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default Contact;
