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
        this.setLittleImg = this.setLittleImg.bind(this);
        this.setLargeImg = this.setLargeImg.bind(this);
        this.collectDataOrganizationReqBody = this.collectDataOrganizationReqBody.bind(this);
        this.sendContactData = this.sendContactData.bind(this);
        this.state = {
            filials: null,
            cities: [],
            comericalData: null,
            images: null,
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
        let self = this,
            reqData = this.state.comericalData;
        reqData.request_code  = 13;
        reqData.market_id = localStorage.getItem("market_id");
        axios({
            method:'post',
            url: "http://u0419737.cp.regruhosting.ru/kega/markets_controller.php",
            data: querystring.stringify(reqData),
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            },
            responseType:'json'
        }).then(function(response) {
        }).catch(function(error){
            throw new Error(error);
        });
    }

    collectDataOrganizationReqBody (key) {
        return (e) => {
            let comericalData = this.state.comericalData;
            comericalData[key] = e.target.value;
            this.setState({comericalData});
        };
    }

    openSaveFilialPopup () {
        let popup = document.getElementById("save-filial-popup");
        popup.className = popup.className + " open-popup";
    }

    closeSaveFilialPopup () {
        let popup = document.getElementById("save-filial-popup");
        popup.className = popup.className.replace(" open-popup", "");
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
            if (response.data && response.data.change_status) {
                self.closeRemoveFilialPopup();
                self.setState({filials: filials})
            }
        }).catch(function(error){
            throw new Error(error);
        });
    }

    sendFilialData (e) {
        e.preventDefault();
        let self = this,
            filials = this.state.filials,
            lastFilialNumber = 0,
            subMarkets =  JSON.parse(localStorage.getItem("loggedInUser"));
        for (let i = 0; i < filials.length; ++i) {
            let currentFilial = filials[i],
                reqObj = {
                    id: currentFilial.id,
                    address: currentFilial.address,
                    city_id: currentFilial.city_id,
                    closing_time: currentFilial.closing_time,
                    contact_name: currentFilial.contact_name,
                    lattitude: currentFilial.lattitude,
                    longitude: currentFilial.longitude,
                    mail: currentFilial.mail,
                    market_id: localStorage.getItem('market_id'),
                    mobile_number: currentFilial.mobile_number,
                    sub_market_name: currentFilial.name,
                    opening_time: currentFilial.opening_time,
                    request_code: 4
                };
            subMarkets.data.arr[i].sub_market_name = currentFilial.name;

            axios({
                method:'post',
                url: "http://u0419737.cp.regruhosting.ru/kega/markets_controller.php",
                data: querystring.stringify(reqObj),
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                },
                responseType:'json'
            }).then(function(response) {
                ++lastFilialNumber;
                if (response.data.add_status && lastFilialNumber === filials.length) {
                    self.openSaveFilialPopup();
                    localStorage.setItem("loggedInUser", JSON.stringify(subMarkets));
                    self.props.updateUser(subMarkets);
                }
            }).catch(function(error){
                throw new Error(error);
            });
        }
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
        let { filials, cities }= this.state,
            newFilialId = "-1",
            newFilial = {
                id: newFilialId,
                city_name: cities[0].city_name,
                city_id: cities[0].id
            };
        filials.push(newFilial);
        this.setState({filials: filials})
    }

    collectFilialReqBody (filialId, key) {
        return (e) => {
            let { filials, cities } = this.state,
                value = e.target.value;
            filials && filials.map(filial => {
                if (filial.id === filialId) {
                    filial[key] = value;
                    if (key === "city_name") {
                        cities.map(item => {
                            if (item.city_name === value) {
                                filial["city_id"] = item.id;
                            }
                        });
                    }
                }
            });
            this.setState({filials});
        }
    }

    setLittleImg (img) {
        let self = this;
        axios({
            method:'post',
            url: "http://u0419737.cp.regruhosting.ru/kega/markets_controller.php",
            data: querystring.stringify({
                request_code: 12,
                market_id: localStorage.getItem('market_id'),
                market_logo: img
            }),
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            },
            responseType:'json'
        }).then(function(response) {
        }).catch(function(error){
            throw new Error(error);
        });
    }


    setLargeImg (img) {
        let self = this;
        axios({
            method:'post',
            url: "http://u0419737.cp.regruhosting.ru/kega/markets_controller.php",
            data: querystring.stringify({
                request_code: 11,
                market_id: localStorage.getItem('market_id'),
                market_banner: img
            }),
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            },
            responseType:'json'
        }).then(function(response) {
        }).catch(function(error){
            throw new Error(error);
        });
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
            url: "http://u0419737.cp.regruhosting.ru/kega/location_controller.php",
            data: querystring.stringify({
                city_list: 1
            }),
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            },
            responseType:'json'
        }).then(function(response) {
            self.setState({cities: response.data, defaultCityId: response.data[0].id});
        }).catch(function(error){
            throw new Error(error);
        });
        axios({
            method:'post',
            url: "http://u0419737.cp.regruhosting.ru/kega/markets_controller.php",
            data: querystring.stringify({
                request_code: 9,
                market_id: localStorage.getItem('market_id')
            }),
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            },
            responseType:'json'
        }).then(function(response) {
            self.setState({comericalData: response.data});
        }).catch(function(error){
            throw new Error(error);
        });
        axios({
            method:'post',
            url: "http://u0419737.cp.regruhosting.ru/kega/markets_controller.php",
            data: querystring.stringify({
                request_code: 10,
                market_id: localStorage.getItem('market_id')
            }),
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            },
            responseType:'json'
        }).then(function(response) {
            self.setState({images: response.data});
        }).catch(function(error){
            throw new Error(error);
        });
    }

    render() {
        let { filials, comericalData, images } = this.state;
        if (!filials || !comericalData || !images) {
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
                                    <div className="clearfix"/>
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
                                                    <input type="text" className="form-control col-md-8" value={comericalData.company_name} onChange={this.collectDataOrganizationReqBody("company_name")} id="usr"/>
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-md-4" htmlFor="sel1">Юридическая фирма:</label>
                                                    <select className="form-control col-md-8" id="sel1" value={this.state.comericalData.company_type} onChange={this.collectDataOrganizationReqBody("company_type")}>
                                                        <option value="0">ИП</option>
                                                        <option value="1">ООО</option>
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-md-4" htmlFor="usr">Юр. наименование организации:</label>
                                                    <input type="text" className="form-control col-md-8" value={comericalData.comercial_name} onChange={this.collectDataOrganizationReqBody("comercial_name")} id="usr"/>
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-md-4" htmlFor="usr">Юр. адрес:</label>
                                                    <input type="text" className="form-control col-md-8" value={comericalData.comercial_address} onChange={this.collectDataOrganizationReqBody("comercial_address")} id="usr"/>
                                                </div>
                                            </Col>
                                            <Col md={6}>
                                                <div className="form-group">
                                                    <label className="col-md-4" htmlFor="usr">ИНН:</label>
                                                    <input type="text" className="form-control col-md-8" value={comericalData.inn} onChange={this.collectDataOrganizationReqBody("inn")} id="usr"/>
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-md-4" htmlFor="usr">КПП:</label>
                                                    <input type="text" className="form-control col-md-8" value={comericalData.kpp} onChange={this.collectDataOrganizationReqBody("kpp")} id="usr"/>
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-md-4" htmlFor="usr">ОГРН:</label>
                                                    <input type="text" className="form-control col-md-8" value={comericalData.ogrn} onChange={this.collectDataOrganizationReqBody("ogrn")} id="usr"/>
                                                </div>
                                            </Col>
                                            <div className="clearfix"/>
                                            <button type="submit" onClick={this.sendContactData}
                                                    className="custom-violet-btn btn">Сохранить
                                            </button>
                                        </div>
                                        <hr className="custom-hr"/>
                                        <UploadFile images={images} setLittleImg={this.setLittleImg} setLargeImg={this.setLargeImg} littleImgWidth={350} littleImgHeight={350} largeImgWidth={640} largeImgHeight={355} />
                                        <hr className="custom-hr"/>
                                        <div className="custom-block filials">
                                            <h4>Филиалы</h4>
                                        </div>
                                        {
                                            this.state.filials && this.state.filials.map((filial) => {
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
                <div id="save-filial-popup" className="popup-block">
                    <div className="popup-inner-delete">
                        <span className="close-icon" onClick={this.closeSaveFilialPopup}>x</span>
                        <p>Филиалы успешно сохранены</p>
                        <button className="btn" onClick={this.closeSaveFilialPopup}>Ок</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default CorpProfile;