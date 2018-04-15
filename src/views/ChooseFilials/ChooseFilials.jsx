import React, {Component} from 'react';
import { Grid } from 'react-bootstrap';

class ChooseFilials extends Component {
    constructor (props) {
        super(props);
    }

    render() {
        return (
            <div className="content">
                <h2 className="custom-header-h2 custom-dashboard-header">
                    <span>ВСЕ ТОВАРЫ</span>
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
            </div>
        );
    }
}

export default ChooseFilials;