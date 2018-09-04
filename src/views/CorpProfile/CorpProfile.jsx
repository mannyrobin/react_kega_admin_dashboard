import React, {Component} from 'react';
import {Grid, Row, Col } from 'react-bootstrap';
import axios from "axios";
import {Card} from 'components/Card/Card.jsx';
import Filials from "./Filials";
import UploadFile from "../UploadFile/UploadFile";
import querystring from "querystring";
import Maps from "../Maps/Maps";

class CorpProfile extends Component {
    constructor (props) {
        super(props);
        this.removeFilial = this.removeFilial.bind(this);
        this.addFilial = this.addFilial.bind(this);
        this.openMapPopup = this.openMapPopup.bind(this);
        this.collectFilialReqBody = this.collectFilialReqBody.bind(this);
        this.closeRemoveFilialPopup = this.closeRemoveFilialPopup.bind(this);
        this.openRemoveFilialPopup = this.openRemoveFilialPopup.bind(this);
        this.sendFilialData = this.sendFilialData.bind(this);
        this.collectDataOrganizationReqBody = this.collectDataOrganizationReqBody.bind(this);
        this.sendContactData = this.sendContactData.bind(this);
        this.state = {
            filials: [],
            cities: [],
            mapParams: {
                lat: null,
                lng: null
            },
            dataOrgReqBody: {
                yuriForma: "0",
                companyName: "",
                organizationNameName: "",
                address: "",
                inn: "",
                kpp: "",
                ogrn: ""
            },
            filialToDelete: null,
        }
    }

    sendContactData () {
        // let self = this;
        // axios({
        //     method:'post',
        //     url: "http://u0419737.cp.regruhosting.ru/kega/markets_controller.php",
        //     data: querystring.stringify({
        //         sub_market_id: id,
        //         data: self.state.dataOrgReqBody
        //     }),
        //     headers: {
        //         'Content-type': 'application/x-www-form-urlencoded'
        //     },
        //     responseType:'json'
        // }).then(function(response) {
        //     let filials = self.state.filials.filter(filial => filial.id !== id);
        //     if (response.data.change_status) {
        //         self.closeRemoveFilialPopup();
        //         self.setState({filials: filials})
        //     }
        // }).catch(function(error){
        //     throw new Error(error);
        // });
    }

    collectDataOrganizationReqBody (key) {
        return (e) => {
            let dataOrgReqBody = this.state.dataOrgReqBody;
            dataOrgReqBody[key] = e.target.value;
            this.setState({dataOrgReqBody});
        };
    }

    openRemoveFilialPopup (id) {
        return () => {
            let popup = document.getElementById("remove-filial-popup");
            popup.className = popup.className + " open-popup";
            this.setState({filialToDelete: id});
        }
    }

    closeRemoveFilialPopup () {
        let popup = document.getElementById("remove-filial-popup");
        popup.className = popup.className.replace(" open-popup", "");
        this.setState({filialToDelete: null});
    }

    removeFilial () {
        let self = this,
            id = this.state.filialToDelete;
        axios({
            method:'post',
            url: "http://u0419737.cp.regruhosting.ru/kega/markets_controller.php",
            data: querystring.stringify({
                sub_market_id: id,
                delete: 1
            }),
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            },
            responseType:'json'
        }).then(function(response) {
            let filials = self.state.filials.filter(filial => filial.id !== id);
            if (response.data.change_status) {
                self.closeRemoveFilialPopup();
                self.setState({filials: filials})
            }
        }).catch(function(error){
            throw new Error(error);
        });
    }

    sendFilialData (e) {
        e.preventDefault();
        let self = this;
        axios({
            method:'post',
            url: "http://u0419737.cp.regruhosting.ru/kega/markets_controller.php",
            data: querystring.stringify({
                request_code: 4,
                market_id: localStorage.getItem('market_id'),
                data: self.state.filials
            }),
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            },
            responseType:'json'
        }).then(function(response) {
            // self.setState({filials: response.data})
        }).catch(function(error){
            throw new Error(error);
        });
    }

    openMapPopup (params) {
        return () => {
            let popup = document.getElementById("map_popup");
            popup.className = popup.className + " open-popup";
            this.setState({mapParams: params});
        };
    }

    closeMapPopup () {
        let popup = document.getElementById("map_popup");
        popup.className = popup.className.replace(" open-popup", "");
    }

    addFilial () {
        let filials = this.state.filials,
            newFilialId = (parseInt(filials[filials.length - 1].id) + 1).toString(),
            newFilial = {id: newFilialId};
        filials.push(newFilial);
        this.setState({filials: filials})
    }

    collectFilialReqBody (filialId, key) {
        return (e) => {
            let filials = this.state.filials;
            filials.map(filial => {
                if (filial.id === filialId) {
                    filial[key] = e.target.value
                }
            });
            this.setState({filials});
        }
    }

    componentDidMount () {
        let self = this;
        axios({
            method:'post',
            url: "http://u0419737.cp.regruhosting.ru/kega/markets_controller.php",
            data: querystring.stringify({
                request_code: 2,
                market_id: localStorage.getItem('market_id')
            }),
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            },
            responseType:'json'
        }).then(function(response) {
            self.setState({filials: response.data});
        }).catch(function(error){
            throw new Error(error);
        });
        axios({
            method:'post',
            url: "http://u0419737.cp.regruhosting.ru/kega/index.php",
            data: querystring.stringify({
                city_list: 1
            }),
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            },
            responseType:'json'
        }).then(function(response) {
            self.setState({cities: response.data});
        }).catch(function(error){
            throw new Error(error);
        });
    }

    render() {
        if (!this.state.filials) {
            return (
                <div>
                    ...Loading
                </div>
            )
        }
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
                                                    <input type="text" className="form-control col-md-8" onChange={this.collectDataOrganizationReqBody("companyName")} id="usr"/>
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-md-4" htmlFor="sel1">Юридическая фирма:</label>
                                                    <select className="form-control col-md-8" id="sel1" value={this.state.yuriForma} onChange={this.collectDataOrganizationReqBody("yuriForma")}>
                                                        <option value="0">ООО</option>
                                                        <option value="1">ИП</option>
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-md-4" htmlFor="usr">Юр. наименование организации:</label>
                                                    <input type="text" className="form-control col-md-8" onChange={this.collectDataOrganizationReqBody("organizationNameName")} id="usr"/>
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-md-4" htmlFor="usr">Юр. адрес:</label>
                                                    <input type="text" className="form-control col-md-8" onChange={this.collectDataOrganizationReqBody("address")} id="usr"/>
                                                </div>
                                            </Col>
                                            <Col md={6}>
                                                <div className="form-group">
                                                    <label className="col-md-4" htmlFor="usr">ИНН:</label>
                                                    <input type="text" className="form-control col-md-8" onChange={this.collectDataOrganizationReqBody("inn")} id="usr"/>
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-md-4" htmlFor="usr">КПП:</label>
                                                    <input type="text" className="form-control col-md-8" onChange={this.collectDataOrganizationReqBody("kpp")} id="usr"/>
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-md-4" htmlFor="usr">ОГРН:</label>
                                                    <input type="text" className="form-control col-md-8" onChange={this.collectDataOrganizationReqBody("ogrn")} id="usr"/>
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
                                            this.state.filials.map((filial) => {
                                                return <Filials key={filial.id} changeCityName={this.changeCityName} cities={this.state.cities} filial={filial} collectReqBody={this.collectFilialReqBody} openRemoveFilialPopup={this.openRemoveFilialPopup} openMapPopup={this.openMapPopup} />
                                            })
                                        }
                                        <a className="add-filial" onClick={this.addFilial}>+ Добавить еще один</a>
                                        <hr className="custom-hr"/>
                                        <button type="submit" onClick={this.sendFilialData}
                                                className="custom-violet-btn btn">Сохранить
                                        </button>
                                    </form>
                                }
                            />
                        </Col>
                    </Row>
                </Grid>
                <div id="map_popup" className="popup-block">
                    <div className="popup-inner">
                        <span className="close-icon" onClick={this.closeMapPopup}>x</span>
                        <Maps lat={this.state.mapParams.lat} lng={this.state.mapParams.lng} />
                    </div>
                </div>
                <div id="remove-filial-popup" className="popup-block">
                    <div className="popup-inner-delete">
                        <span className="close-icon" onClick={this.closeRemoveFilialPopup}>x</span>
                        <p>Удалить этот Филиал?</p>
                        <button className="btn" onClick={this.removeFilial}>Да</button>
                        <button className="btn" onClick={this.closeRemoveFilialPopup}>Нет</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default CorpProfile;