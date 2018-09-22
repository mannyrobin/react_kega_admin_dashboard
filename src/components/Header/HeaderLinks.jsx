import React, {Component} from 'react';
import { NavItem, Nav } from 'react-bootstrap';
import axios from "axios/index";
import querystring from "querystring";


class HeaderLinks extends Component{
    constructor (props) {
        super(props);
        this.state = {
            notifications: []
        }
    }

    openDetails (id) {
        return () => {
            this.toggleNotifications("icon-notification")();
            localStorage.setItem("notificationEnabled", true);
            localStorage.setItem("notificationItemId", id);
            axios({
                method:'post',
                url: "http://u0419737.cp.regruhosting.ru/kega/notification_controller.php",
                data: querystring.stringify({
                    request_code: 2,
                    order_id: id
                }),
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                },
                responseType:'json'
            }).then(function(response) {
                if (response.data.change_status) {
                    let notifications = this.state.notification;
                    notifications.filter(item => item.id !== id);
                    this.setState({notifications});
                }
            }).catch(function(error){
                throw new Error(error);
            });
            if (window.location.href.includes("orders")) {
                window.location.reload();
            } else {
                window.location.href = window.location.origin + "/#/orders";

            }
        }
    }

    componentDidMount () {
        let self = this;
        axios({
            method:'post',
            url: "http://u0419737.cp.regruhosting.ru/kega/notification_controller.php",
            data: querystring.stringify({
                request_code: 1,
                market_id: localStorage.getItem('market_id')
            }),
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            },
            responseType:'json'
        }).then(function(response) {
            self.setState({notifications: response.data});
        }).catch(function(error){
            throw new Error(error);
        });
    }

    toggleNotifications (className) {
        return () => {
            let elementsTodEdit = document.getElementsByClassName("remove-arrow"),
                arrow = document.getElementsByClassName(className)[0],
                popup = document.getElementById("notMesPopup");
            for (let i = 0; i < elementsTodEdit.length; ++i) {
                !elementsTodEdit[i].classList.contains(className) && elementsTodEdit[i].classList.remove("arrow");
            }
            if (arrow.classList.contains("arrow")) {
                arrow.classList.remove("arrow");
                popup.classList.remove("opened")
            } else {
                arrow.classList.add("arrow");
                popup.classList.add("opened");
            }
        }
    }

    render () {
        let { notifications } = this.state;
        return (
            <div className="header-bottom">
                <div className="nav navbar-nav navbar-right">
                    <a onClick={this.toggleNotifications("icon-notification")} className="icon-notification circle-number remove-arrow"><span>{this.props && this.props.props && this.props.props.data && this.props.props.data.notification_count && this.props.props.data.notification_count}</span></a>
                    {/*<a onClick={this.toggleNotMesifications("icon-messages")} className="icon-messages circle-number remove-arrow"><span>{this.props && this.props.props && this.props.props.data && this.props.props.data.message_count && this.props.props.data.message_count}</span></a>*/}
                    <a className="user-icon"><img id="userIcon" src={this.props && this.props.props && this.props.props.data && this.props.props.data.icon_url && this.props.props.data.icon_url}/><span>{this.props && this.props.props && this.props.props.data && this.props.props.data.name && this.props.props.data.name}</span></a>
                </div>
                <div id="notMesPopup" className="custom-drop-down">
                    <div className="custom-drop-down-inner">
                        {
                            notifications.map(item => <span key={item.id} onClick={this.openDetails(item.id)}>{`У вас новый заказ на сумму ${item.total_price} руб. сделанный в ${item.time}.`}</span>)
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default HeaderLinks;
