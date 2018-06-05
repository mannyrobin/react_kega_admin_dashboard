import React, { Component } from 'react';

class Info extends Component {
    render() {
        return (
            <tr>
                <td>John</td>
                <td>{this.props.item.start_date && this.props.item.start_date}</td>
                <td>{this.props.item.finish_date && this.props.item.finish_date}</td>
                <td>John</td>
                <td>{this.props.item.user_name && this.props.item.user_name}</td>
                <td>{this.props.item.mobile_number && this.props.item.mobile_number}</td>
                <td>
                    <select className="form-control processing">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                    </select>
                </td>
                <td><a onClick={this.props.openMoreDetails(this.props.item.id)}>Подробнее</a></td>
            </tr>
        );
    }
}

export default Info;
