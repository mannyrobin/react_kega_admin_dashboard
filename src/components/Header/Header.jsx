import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';

import HeaderLinks from './HeaderLinks.jsx';

class Header extends Component{
    render(){
        return (
            <Navbar fluid>
                <Navbar.Header>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <HeaderLinks props={this.props.props} />
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Header;
