import React, { Component } from 'react';

class Info extends Component {
    render() {
        return (
            <tr>
                <td>John</td>
                <td>John</td>
                <td>John</td>
                <td>John</td>
                <td>John</td>
                <td>John</td>
                <td>
                    <select className="form-control processing">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                    </select>
                </td>
                <td><a href="#" onClick={this.props.moreDetails}>Подробнее</a></td>
            </tr>
        );
    }
}

export default Info;
