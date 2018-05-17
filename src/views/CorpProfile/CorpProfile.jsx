import React, {Component} from 'react';
import {Grid, Row, Col, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import axios from "axios";
import {Card} from 'components/Card/Card.jsx';
import {FormInputs} from 'components/FormInputs/FormInputs.jsx';
import {UserCard} from 'components/UserCard/UserCard.jsx';
import  Filials from "./Filials";
import UploadFile from "../UploadFile/UploadFile";
import querystring from "querystring";
import Maps from "../Maps/Maps";

class CorpProfile extends Component {
    constructor (props) {
        super(props);
        this.removeFilial = this.removeFilial.bind(this);
        this.addFilial = this.addFilial.bind(this);
        this.openMapPopup = this.openMapPopup.bind(this);
        this.collectReqBody = this.collectReqBody.bind(this);
        // this.sendFilialContactData = this.sendFilialContactData.bind(this);
        this.state = {
            filials: [],
            mapParams: {
                lat: null,
                lng: null
            },
            reqBody: {}
        }
    }

    collectReqBody (key) {
        return (e) => {
            let reqBody = this.state.reqBody;
            reqBody[key] = e.target.value;
            this.setState({reqBody: reqBody})
        }
    }

    // sendFilialContactData (e) {
    //     e.preventDefault();
    //     let self = this;
    //     axios({
    //         method:'post',
    //         url: "http://u0419737.cp.regruhosting.ru/kega/markets_controller.php",
    //         data: querystring.stringify({
    //             request_code: 4,
    //             market_id: localStorage.getItem('market_id'),
    //             data: {
    //                 name: self.state.name,
    //                 address: self.state.address,
    //                 contact_name: self.state.contact_name,
    //                 mobile_number: self.state.mobile_number,
    //                 city: self.state.city,
    //                 mail: self.state.mail,
    //             }
    //         }),
    //         headers: {
    //             'Content-type': 'application/x-www-form-urlencoded'
    //         },
    //         responseType:'json'
    //     }).then(function(response) {
    //         self.setState({filials: response.data})
    //         console.log(">>>>>>>>>>>>>>>11111111111111  ", response)
    //     }).catch(function(error){
    //         throw new Error(error);
    //     });
    // }

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
        let newFilials = this.state.filials;
        newFilials.push(newFilials.length + 1);
        this.setState({filials: newFilials})
    }

    removeFilial (id) {
        this.setState((state) => { filials: state.filials.filter(filial => filial.id !== id) });
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
            self.setState({filials: response.data})
            console.log(">>>>>>>>>>>>>>>11111111111111  ", response)
        }).catch(function(error){
            throw new Error(error);
        });
    }

    render() {
        console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  ", this.state.reqBody)
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
                                            this.state.filials.map((filial) => {
                                                return <Filials filial={filial} collectReqBody={this.collectReqBody} removeFilial={this.removeFilial} key={filial.id} openMapPopup={this.openMapPopup} />
                                            })
                                        }
                                        <a className="add-filial" onClick={this.addFilial}>+ Добавить еще один</a>
                                        <hr className="custom-hr"/>
                                        <button type="submit" onClick={this.sendFilialContactData}
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
            </div>
        );
    }
}

export default CorpProfile;