import React, {Component} from 'react';
import { NavItem, Nav, NavDropdown, MenuItem } from 'react-bootstrap';


class HeaderLinks extends Component{
    constructor (props) {
        super(props);
    }

    componentDidMount () {
        // document.getElementById("userIcon").style.background = "url()"
    }

    render(){
        console.log("}}}}}}}}}}}}}}}}}}}}}}}}}  ", this.props.props)
        return (
            <div className="header-bottom">
                <Nav pullRight>
                    <NavItem eventKey={1} href="#" className="icon-notification"></NavItem>
                    <NavItem eventKey={1} href="#" className="icon-messages"></NavItem>
                    <NavItem eventKey={3} href="#" className="user-icon"><img id="userIcon" src={this.props.props.data.icon_url}/><span>Vansdorf</span></NavItem>
                </Nav>
            </div>
        );
    }
}

export default HeaderLinks;
