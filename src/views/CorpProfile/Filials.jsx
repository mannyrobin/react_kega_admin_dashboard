import React, {Component} from 'react';
import {Grid, Row, Col, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';

class Filials extends Component {
    render() {
        return (
            <div className="custom-block filials">
                <h4>
                    <a className="remove-block"><i className="pe-7s-trash" onClick={() => {this.props.removeFilial(this.props.item)}}></i></a>
                </h4>
                <Col md={6}>
                    <div className="form-group">
                        <label className="col-md-4" htmlFor="usr">Name:</label>
                        <input type="text" className="form-control col-md-8" id="usr"/>
                    </div>
                    <div className="form-group">
                        <label className="col-md-4" htmlFor="sel1">Select list:</label>
                        <select className="form-control col-md-8" id="sel1">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="col-md-4" htmlFor="usr">Name:</label>
                        <input type="text" className="form-control col-md-8" id="usr"/>
                    </div>
                    <a className="check-in-map">проверить на карте</a>
                </Col>
                <Col md={6}>
                    <div className="form-group">
                        <label className="col-md-4" htmlFor="usr">Name:</label>
                        <input type="text" className="form-control col-md-8" id="usr"/>
                    </div>
                    <div className="form-group">
                        <label className="col-md-4" htmlFor="usr">Name:</label>
                        <input type="text" className="form-control col-md-8" id="usr"/>
                    </div>
                    <div className="form-group">
                        <label className="col-md-4" htmlFor="usr">Name:</label>
                        <input type="text" className="form-control  col-md-8" id="usr"/>
                    </div>
                </Col>
                <div className="clearfix"></div>
            </div>
        );
    }
}

export default Filials;
