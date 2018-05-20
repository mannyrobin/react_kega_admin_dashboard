import React, {Component} from 'react';
import {Grid, Row, Col, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';

class Filials extends Component {
    render() {
        return (
            <div className="custom-block filials">
                <h4>
                    <a className="remove-block"><i className="pe-7s-trash" onClick={this.props.openRemoveFilialPopup(this.props.filial.id)}></i></a>
                </h4>
                <Col md={6}>
                    <div className="form-group">
                        <label className="col-md-4" htmlFor="usr">Название филиала</label>
                        <input type="text" className="form-control col-md-8" id="usr" onChange={this.props.collectReqBody(this.props.filial.id, "name")} defaultValue={this.props.filial.name}/>
                    </div>
                    <div className="form-group">
                        <label className="col-md-4" htmlFor="sel1">Выберите город</label>
                        <select className="form-control col-md-8" value={this.props.filial.city_name} onChange={this.props.collectReqBody(this.props.filial.id, "city_name")} id="sel1">
                            {
                                this.props.cities.map(city => {
                                    return <option value={city}>{city}</option>;
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="col-md-4" htmlFor="usr">Адрес филиала</label>
                        <input type="text" className="form-control col-md-8" id="usr" onChange={this.props.collectReqBody(this.props.filial.id, "address")} defaultValue={this.props.filial.address}/>
                    </div>
                    <a className="check-in-map" onClick={this.props.openMapPopup({lat: this.props.filial.lattitude, lng: this.props.filial.longitude})} >проверить на карте</a>
                </Col>
                <Col md={6}>
                    <div className="form-group">
                        <label className="col-md-4" htmlFor="usr">Контактное лицо</label>
                        <input type="text" className="form-control col-md-8" id="usr" onChange={this.props.collectReqBody(this.props.filial.id, "contact_name")} defaultValue={this.props.filial.contact_name}/>
                    </div>
                    <div className="form-group">
                        <label className="col-md-4" htmlFor="usr">Контактный телефон</label>
                        <input type="text" className="form-control col-md-8" id="usr" onChange={this.props.collectReqBody(this.props.filial.id, "mobile_number")} defaultValue={this.props.filial.mobile_number}/>
                    </div>
                    <div className="form-group">
                        <label className="col-md-4" htmlFor="usr">Контактный e-mail</label>
                        <input type="text" className="form-control  col-md-8" id="usr" onChange={this.props.collectReqBody(this.props.filial.id, "mail")} defaultValue={this.props.filial.mail}/>
                    </div>
                </Col>
                <div className="clearfix"></div>
            </div>
        );
    }
}

export default Filials;