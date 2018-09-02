import React, {Component} from 'react';
import { NavItem, Nav } from 'react-bootstrap';


class HeaderLinks extends Component{
    constructor (props) {
        super(props);
    }

    toggleNotMesifications (className) {
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
        return (
            <div className="header-bottom">
                <div className="nav navbar-nav navbar-right">
                    <a onClick={this.toggleNotMesifications("icon-notification")} className="icon-notification circle-number remove-arrow"><span>{this.props && this.props.props && this.props.props.data && this.props.props.data.notification_count && this.props.props.data.notification_count}</span></a>
                    {/*<a onClick={this.toggleNotMesifications("icon-messages")} className="icon-messages circle-number remove-arrow"><span>{this.props && this.props.props && this.props.props.data && this.props.props.data.message_count && this.props.props.data.message_count}</span></a>*/}
                    <a className="user-icon"><img id="userIcon" src={this.props && this.props.props && this.props.props.data && this.props.props.data.icon_url && this.props.props.data.icon_url}/><span>{this.props && this.props.props && this.props.props.data && this.props.props.data.name && this.props.props.data.name}</span></a>
                </div>
                <div id="notMesPopup" className="custom-drop-down">
                    <div className="custom-drop-down-inner">
                        <span>Notification</span>
                        <span>Notification</span>
                        <span>Notification</span>
                        <span>Notification</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default HeaderLinks;
