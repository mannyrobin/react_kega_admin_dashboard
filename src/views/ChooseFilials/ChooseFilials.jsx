import React, {Component} from 'react';

class ChooseFilials extends Component {
    render() {
        let marketId = localStorage.getItem("sub_market_id"),
            { getByBranch } = this.props;
        return (
            <div className="content">
                <h2 className="custom-header-h2 custom-dashboard-header">
                    <span className="uppercase">{this.props.title}</span>
                    <div className="custom-select col-md-4">
                        <label className="col-md-5 choose-label-txt" htmlFor="sel1">Выберите филиал:</label>
                        <select className="form-control col-md-7" value={marketId} onChange={getByBranch && getByBranch} id="sel1">
                            {
                                this.props.filials && this.props.filials.map(filial => {
                                    return <option value={filial.sub_market_id} key={filial.sub_market_id}>{filial.sub_market_name}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className="clearfix"/>
                </h2>
            </div>
        );
    }
}

export default ChooseFilials;