import React, { Component } from 'react';
import querystring from "querystring";
import axios from "axios/index";

class Info extends Component {
    constructor (props) {
        super(props);
        this.state = {
            item: this.props.item,
            colors: [null, "greenStatus", "grayStatus", "redStatus", "yellowStatus"]
        };
        this.changeStatus = this.changeStatus.bind(this);
    }

    changeStatus (e) {
        let self = this,
            value = e.target.value;
        axios({
            method:'post',
            url: "http://u0419737.cp.regruhosting.ru/kega/orders_controller.php",
            data: querystring.stringify({
                request_code: 3,
                order_id: self.state.item.id,
                status: e.target.value
            }),
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            },
            responseType:'json'
        }).then(function(response) {
            if (response.data && response.data.change_status) {
                if (localStorage.getItem("allOrders")) {
                    let changedItem = self.state.item;
                    changedItem.status = value;
                    self.setState({item: changedItem});
                } else {
                    self.props.removeChangedItem(self.state.item.id);
                }
            }
        }).catch(function(error){
            throw new Error(error);
        });
    }

    render() {
        return (
            <tr>
                <td>{this.state.item.id && this.state.item.id}</td>
                <td>{this.state.item.start_date && this.state.item.start_date}</td>
                <td>{this.state.item.finish_date && this.state.item.finish_date}</td>
                <td>{this.state.item.total_price && this.state.item.total_price}</td>
                <td>{this.state.item.user_name && this.state.item.user_name}</td>
                <td>{this.state.item.mobile_number && this.state.item.mobile_number}</td>
                <td>
                    <select className={`${this.state.colors[this.state.item.status]} processing form-control`} value={this.state.item.status} onChange={this.changeStatus}>
                        {
                            this.props.statusNames && this.props.statusNames.map((name, index) => {
                                if (index === 0) {
                                    return null;
                                }
                                return <option key={index} value={index}>{name}</option>
                            })
                        }
                    </select>
                </td>
                <td><a onClick={this.props.openMoreDetails(this.props.item.id)}>Подробнее</a></td>
            </tr>
        );
    }
}

export default Info;
