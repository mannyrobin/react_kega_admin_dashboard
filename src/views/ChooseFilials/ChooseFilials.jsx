import React, {Component} from 'react';

class ChooseFilials extends Component {
    render() {
        return (
            <div className="content">
                <h2 className="custom-header-h2 custom-dashboard-header">
                    <span className="uppercase">{this.props.title}</span>
                    <div className="custom-select col-md-4">
                        <label className="col-md-5" htmlFor="sel1">Выберите филиал:</label>
                        <select className="form-control col-md-7" id="sel1">
                            {
                                this.props.props.data && this.props.props.data.arr && this.props.props.data.arr.map(item => {
                                    return <option key={item.sub_market_id}>{item.sub_market_name}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className="clearfix"></div>
                </h2>
            </div>
        );
    }
}

export default ChooseFilials;