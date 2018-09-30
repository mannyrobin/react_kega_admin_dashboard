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
                    <HeaderLinks user={this.props.user} notCount={this.props.notCount} />
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Header;
