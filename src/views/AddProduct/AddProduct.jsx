import React, {Component} from 'react';
import {Grid, Row, Col } from 'react-bootstrap';

import {Card} from 'components/Card/Card.jsx';
import ChooseFilials from "../ChooseFilials/ChooseFilials";
import UploadFile from "../UploadFile/UploadFile";

class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.sendProductData = this.sendProductData.bind(this);
        this.collectReqBody = this.collectReqBody.bind(this);
        this.state = {
            reqBody: {}
        }
    }

    collectReqBody (key) {
        return (e) => {
            let reqBody = this.state.reqBody;
            reqBody[key] = e.target.value;
            this.setState({reqBody});
        }
    }

    sendProductData (e) {
        // e.preventDefault();
        // let self = this;
        // axios({
        //     method:'post',
        //     url: "http://u0419737.cp.regruhosting.ru/kega/markets_controller.php",
        //     data: querystring.stringify({
        //         request_code: 4,
        //         market_id: localStorage.getItem('market_id'),
        //         data: self.state.reqBody
        //
        //     }),
        //     headers: {
        //         'Content-type': 'application/x-www-form-urlencoded'
        //     },
        //     responseType:'json'
        // }).then(function(response) {
        //     // self.setState({filials: response.data})
        // }).catch(function(error){
        //     throw new Error(error);
        // });
    }

    componentDidMount () {
        let itemToEdit = JSON.parse(localStorage.getItem("itemToEdit"));
        if (itemToEdit) {
            this.setState({...itemToEdit});
        }
        this.setState({loaded: true});
    }

    componentWillUnmount () {
        localStorage.removeItem("itemToEdit");
    }

    render() {
        if (!this.state.loaded) {
            return <div>
                Loading...
            </div>
        }
        return (
            <div className="content">
                <Grid fluid>
                    <ChooseFilials title="Добавление товара" props={this.props.props} />
                    <Row>
                        <Col md={12}>
                            <Card
                                title="Описание товара"
                                content={
                                    <form className="custom-contact">
                                        <div className="add-product-block custom-block">
                                            <h4>Данные организации</h4>
                                            <div className="add-product-sub-block1">
                                                <Col md={7}>
                                                    <div className="form-group first">
                                                        <label htmlFor="usr">Наименование товара:</label>
                                                        <input type="text" onChange={this.collectReqBody("name")} defaultValue={this.state.name} className="form-control" id="usr"/>
                                                    </div>
                                                </Col>
                                                <Col md={5}>
                                                    <div className="form-group">
                                                        <label htmlFor="sel1">Наименования категории:</label>
                                                        <select className="form-control" id="sel1">
                                                            <option>1</option>
                                                            <option>2</option>
                                                            <option>3</option>
                                                            <option>4</option>
                                                        </select>
                                                    </div>
                                                </Col>
                                                <div className="clearfix"></div>
                                            </div>
                                            <div className="add-product-sub-block2">
                                                <div className="form-group first">
                                                    <label htmlFor="count-or-weight">Введите кол-во</label>
                                                    <input className="form-control" type="text" name="count-or-weight"
                                                           placeholder="Вес или объем" onChange={this.collectReqBody("count")}
                                                           id="count-or-weight"/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="unit-measurements">Единица измерения</label>
                                                    <select className="form-control" name="unit-measurements"
                                                            id="unit-measurements" placeholder="Единица измерения">
                                                        <option>1</option>
                                                        <option>2</option>
                                                        <option>3</option>
                                                        <option>4</option>
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="price">Цена, руб</label>
                                                    <input className="form-control" type="text" name="price" onChange={this.collectReqBody("price")}
                                                           defaultValue={this.state.price}
                                                           id="price"/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="alcohol">Алкоголь, %</label>
                                                    <input className="form-control" type="text" name="alcohol" onChange={this.collectReqBody("alcohol_percent")}
                                                           defaultValue={this.state.alcohol_percent}
                                                           id="alcohol"/>
                                                </div>
                                                <div className="clearfix"></div>
                                            </div>
                                            <div className="add-product-sub-block1">
                                                <div className="col-md-custom">
                                                    <div className="form-group first">
                                                        <label htmlFor="usr">Описание товара:</label>
                                                        <input type="text" className="form-control" placeholder="Введите описание" onChange={this.collectReqBody("description")}
                                                               defaultValue={this.state.description}
                                                               id="usr"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="clearfix"></div>
                                        </div>
                                        <hr className="custom-hr"/>
                                        <UploadFile littleImgWidth={370} littleImgHeight={370} largeImgWidth={750} largeImgHeight={370} />
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

export default AddProduct;