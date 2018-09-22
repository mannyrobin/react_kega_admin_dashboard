import React, {Component} from 'react';
import {Grid, Row, Col } from 'react-bootstrap';

import {Card} from 'components/Card/Card.jsx';
import ChooseFilials from "../ChooseFilials/ChooseFilials";
import UploadFile from "../UploadFile/UploadFile";
import axios from "axios/index";
import querystring from "querystring";

class EditProduct extends Component {
    constructor(props) {
        super(props);
        this.sendProductData = this.sendProductData.bind(this);
        this.collectReqBody = this.collectReqBody.bind(this);
        this.setLittleImg = this.setLittleImg.bind(this);
        this.setLargeImg = this.setLargeImg.bind(this);
        this.changeBranchId = this.changeBranchId.bind(this);
        this.state = {
            reqBody: {},
            loaded: false,
            categories: null,
            selectedFielialId: this.props.props.data.arr[0].sub_market_id,
        }
    }

    changeBranchId (e) {
        let value = e.target.value;
        localStorage.setItem('sub_market_id', value);
        this.setState({selectedFielialId: value});
    }

    setLittleImg (img) {
        let { reqBody } = this.state;
        reqBody.logo_pic = img;
        this.setState({reqBody});
    }


    setLargeImg (img) {
        let { reqBody } = this.state;
        reqBody.banner_pic = img;
        this.setState({reqBody});
    }

    collectReqBody (key) {
        return (e) => {
            let reqBody = this.state.reqBody;
            reqBody[key] = e.target.value;
            this.setState({reqBody});
            this.setState({reqBody});
        }
    }

    sendProductData (e) {
        e.preventDefault();
        let self = this,
            { reqBody } = this.state,
            itemToEdit = JSON.parse(localStorage.getItem("itemToEdit"));
        reqBody.market_id = localStorage.getItem('market_id');
        reqBody.sub_market_id = this.props.props.data.arr[0].sub_market_id;
        reqBody.request_code = 6;
        reqBody.id = itemToEdit.id;

        if (Object.keys(reqBody).length > 0) {
            axios({
                method:'post',
                url: "http://u0419737.cp.regruhosting.ru/kega/item_controller.php",
                data: querystring.stringify(reqBody),
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                },
                responseType:'json'
            }).then(function(response) {
                if (response.data && response.data.update_status) {
                    window.location.href = window.location.origin + "/#/all_products";
                }
            }).catch(function(error){
                throw new Error(error);
            });
        }
    }

    componentDidMount () {
        let self = this,
            itemToEdit = JSON.parse(localStorage.getItem("itemToEdit"));
        axios({
            method:'post',
            url: "http://u0419737.cp.regruhosting.ru/kega/categories_controller.php",
            data: querystring.stringify({
                request_code: 1,
                market_id: localStorage.getItem('market_id')
            }),
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            },
            responseType:'json'
        }).then(function(response) {
            let resObj = {
                loaded: true,
                categories: response.data,
                reqBody: {
                    category_id: response.data[0].id,
                    unit_id: "1"
                }
            };
            if (itemToEdit) {
                resObj = {
                    ...resObj,
                    reqBody: {
                        ...resObj.reqBody,
                        ...itemToEdit,
                    }
                }
            }
            self.setState(resObj);
        }).catch(function(error){
            throw new Error(error);
        });
    }

    componentWillUnmount () {
        localStorage.removeItem("itemToEdit");
    }

    render() {
        let { categories, loaded, category_id } = this.state;
        if (!loaded) {
            return <div>
                Loading...
            </div>
        }
        return (
            <div className="content">
                <Grid fluid>
                    <ChooseFilials title="Изменить товар" getByBranch={this.changeBranchId} filials={this.props.props.data.arr}  />
                    <Row>
                        <Col md={12}>
                            <Card
                                title="Описание товара"
                                content={
                                    <form className="custom-contact">
                                        <div className="add-product-block custom-block">
                                            <h4>Данные товара</h4>
                                            <div className="add-product-sub-block1">
                                                <Col md={7}>
                                                    <div className="form-group first">
                                                        <label htmlFor="usr">Наименование товара:</label>
                                                        <input type="text" onChange={this.collectReqBody("item_name")} defaultValue={this.state.reqBody.item_name} className="form-control" id="usr"/>
                                                    </div>
                                                </Col>
                                                <Col md={5}>
                                                    <div className="form-group">
                                                        <label htmlFor="sel1">Наименования категории:</label>
                                                        <select value={category_id} onChange={this.collectReqBody("category_id")} className="form-control" id="sel1">
                                                            {
                                                                categories && categories.map(item => <option value={item.id} key={item.id}>{item.name}</option>)
                                                            }
                                                        </select>
                                                    </div>
                                                </Col>
                                                <div className="clearfix"/>
                                            </div>
                                            <div className="add-product-sub-block2">
                                                <div className="form-group first">
                                                    <label htmlFor="count-or-weight">Введите кол-во</label>
                                                    <input defaultValue={this.state.reqBody.capacity} className="form-control" type="number" name="count-or-weight"
                                                           placeholder="Вес или объем" onChange={this.collectReqBody("item_size")}
                                                           id="count-or-weight"/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="unit-measurements">Единица измерения</label>
                                                    <select onChange={this.collectReqBody("unit_id")} className="form-control" name="unit-measurements"
                                                            id="unit-measurements" placeholder="Единица измерения">
                                                        <option value="1">Грамм</option>
                                                        <option value="2">Литр</option>
                                                        <option value="3">Штук</option>
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="price">Цена, руб</label>
                                                    <input className="form-control" type="number" name="price" onChange={this.collectReqBody("price")}
                                                           defaultValue={this.state.reqBody.price}
                                                           id="price"/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="alcohol">Алкоголь, %</label>
                                                    <input className="form-control" type="number" name="alcohol" onChange={this.collectReqBody("alchohol_percent")}
                                                           defaultValue={this.state.reqBody.alchohol_percent}
                                                           id="alcohol"/>
                                                </div>
                                                <div className="clearfix"/>
                                            </div>
                                            <div className="add-product-sub-block1">
                                                <div className="col-md-custom">
                                                    <div className="form-group first">
                                                        <label htmlFor="usr">Описание товара:</label>
                                                        <input type="text" className="form-control" placeholder="Введите описание" onChange={this.collectReqBody("item_description")}
                                                               defaultValue={this.state.reqBody.item_description}
                                                               id="usr"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="clearfix"/>
                                        </div>
                                        <hr className="custom-hr"/>
                                        <UploadFile images={{logo_url: this.state.reqBody.icon_url, banner_url: this.state.reqBody.cover_url}} littleImgWidth={370} littleImgHeight={370} largeImgWidth={750} largeImgHeight={370} setLittleImg={this.setLittleImg} setLargeImg={this.setLargeImg} />
                                        <hr className="custom-hr"/>
                                        <button type="submit" onClick={this.sendProductData}
                                                className="custom-violet-btn btn">Сохранить
                                        </button>
                                    </form>
                                }
                            />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default EditProduct;