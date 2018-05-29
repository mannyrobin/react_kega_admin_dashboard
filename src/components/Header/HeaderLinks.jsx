import React, {Component} from 'react';
import { NavItem, Nav } from 'react-bootstrap';


class HeaderLinks extends Component{
    constructor (props) {
        super(props);
    }

    componentDidMount () {
    }

    render(){
        return (
            <div className="header-bottom">
                <Nav pullRight>
                    <NavItem eventKey={1} href="#" className="icon-notification circle-number"><span>{this.props.props.data.notification_count && this.props.props.data.notification_count}</span></NavItem>
                    <NavItem eventKey={1} href="#" className="icon-messages circle-number"><span>{this.props.props.data.message_count && this.props.props.data.message_count}</span></NavItem>
                    <NavItem eventKey={3} href="#" className="user-icon"><img id="userIcon" src={this.props.props.data.icon_url && this.props.props.data.icon_url}/><span>{this.props.props.data.name && this.props.props.data.name}</span></NavItem>
                    <div className="custom-drop-down">
                        <div className="custom-drop-down-inner">
                            <span>Notification</span>
                            <span>Notification</span>
                            <span>Notification</span>
                            <span>Notification</span>
                        </div>
                    </div>
                </Nav>
            </div>
        );
    }
}

export default HeaderLinks;
