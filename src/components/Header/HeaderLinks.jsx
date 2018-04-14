import React, {Component} from 'react';
import { NavItem, Nav, NavDropdown, MenuItem } from 'react-bootstrap';


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
                    <NavItem eventKey={1} href="#" className="icon-notification circle-number"><span>11</span></NavItem>
                    <NavItem eventKey={1} href="#" className="icon-messages circle-number"><span>11</span></NavItem>
                    <NavItem eventKey={3} href="#" className="user-icon"><img id="userIcon" src={this.props.props.data.icon_url}/><span>Vansdorf</span></NavItem>
                </Nav>
            </div>
        );
    }
}

export default HeaderLinks;
