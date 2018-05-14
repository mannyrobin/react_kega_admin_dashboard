import React, {Component} from 'react';
import {Grid, Row, Col, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import axios from "axios";

import {Card} from 'components/Card/Card.jsx';
import {FormInputs} from 'components/FormInputs/FormInputs.jsx';
import {UserCard} from 'components/UserCard/UserCard.jsx';
import Button from 'elements/CustomButton/CustomButton.jsx';
import  Filials from "./Filials";

import avatar from "assets/img/faces/face-3.jpg";
import UploadFile from "../UploadFile/UploadFile";

class CorpProfile extends Component {
    constructor (props) {
        super(props);
        this.removeFilial = this.removeFilial.bind(this);
        this.addFilial = this.addFilial.bind(this);
        this.openMapPopup = this.openMapPopup.bind(this);
        this.closeMapPopup = this.closeMapPopup.bind(this);
        this.state = {
            filials: [1, 2, 3],
            openMap: false
        }
    }

    openMapPopup () {
        this.setState({openMap: true})
    }

    closeMapPopup () {
        this.setState({openMap: false})
    }

    addFilial () {
        let newFilials = this.state.filials;
        newFilials.push(newFilials.length + 1);
        this.setState({filials: newFilials})
    }

    removeFilial (item) {
        let index = this.state.filials.indexOf(item);
        this.setState((state) => { filials: state.filials.splice(index, 1) });
    }

    render() {
        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <div className="content">
                                <h2 className="custom-header-h2 custom-dashboard-header">
                                    <span className="uppercase">Профиль компании</span>
                                    <div className="clearfix"></div>
                                </h2>
                            </div>
                            <Card
                                title="Профиль компании"
                                content={
                                    <form className="custom-contact" >
                                        <div className="custom-block">
                                            <h4>Данные организации</h4>
                                            <Col md={6}>
                                                <div className="form-group">
                                                    <label className="col-md-4" htmlFor="usr">Наименование компании:</label>
                                                    <input type="text" className="form-control col-md-8" id="usr"/>
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-md-4" htmlFor="sel1">Юридическая фирма:</label>
                                                    <select className="form-control col-md-8" id="sel1">
                                                        <option>1</option>
                                                        <option>2</option>
                                                        <option>3</option>
                                                        <option>4</option>
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-md-4" htmlFor="usr">Юр. наименование организации:</label>
                                                    <input type="text" className="form-control col-md-8" id="usr"/>
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-md-4" htmlFor="usr">Юр. адрес:</label>
                                                    <input type="text" className="form-control  col-md-8" id="usr"/>
                                                </div>
                                            </Col>
                                            <Col md={6}>
                                                <div className="form-group">
                                                    <label className="col-md-4" htmlFor="usr">ИНН:</label>
                                                    <input type="text" className="form-control col-md-8" id="usr"/>
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-md-4" htmlFor="usr">КПП:</label>
                                                    <input type="text" className="form-control col-md-8" id="usr"/>
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-md-4" htmlFor="usr">ОГРН:</label>
                                                    <input type="text" className="form-control  col-md-8" id="usr"/>
                                                </div>
                                            </Col>
                                            <div className="clearfix"></div>
                                            <button type="submit" onClick={this.sendContactData}
                                                    className="custom-violet-btn btn">Сохранить
                                            </button>
                                        </div>
                                        <hr className="custom-hr"/>
                                        <UploadFile littleImgWidth={350} littleImgHeight={350} largeImgWidth={640} largeImgHeight={355} />
                                        <hr className="custom-hr"/>
                                        <div className="custom-block filials">
                                            <h4>Филиалы</h4>
                                        </div>
                                        {
                                            this.state.filials.map((item) => {
                                                return <Filials item={item} addFilial={this.addFilial} removeFilial={this.removeFilial} key={item} openMapPopup={this.openMapPopup} closeMapPopup={this.closeMapPopup} />
                                            })
                                        }
                                        <a className="add-filial" onClick={this.addFilial}>+ Добавить еще один</a>
                                        <hr className="custom-hr"/>
                                        <button type="submit" onClick={this.sendContactData}
                                                className="custom-violet-btn btn">Сохранить
                                        </button>
                                    </form>
                                }
                            />
                        </Col>
                    </Row>
                </Grid>
                <div className="popup-block">
                    <div className="popup-inner">
                        <span className="close-icon">x</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default CorpProfile;