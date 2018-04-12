import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';

import HeaderLinks from '../Header/HeaderLinks.jsx';

import imagine from 'assets/img/sidebar-3.jpg';
import logo from 'assets/img/logo_image.png';

import appRoutes from 'routes/routes.jsx';
import {Redirect} from "react-router";

class Sidebar extends Component{
    constructor(props){
        super(props);
        this.dropDown = this.dropDown.bind(this);
        this.state = {
            width: window.innerWidth,
            dropDowned: false,
            dropDownArrow: true
        }
    }
    activeRoute(routeName) {
        return this.props.location.pathname.indexOf(routeName) > -1 ? 'active' : '';
    }
    updateDimensions(){
        this.setState({width:window.innerWidth});
    }
    componentDidMount() {
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions.bind(this));
    }
    dropDown () {
        // if (!this.state.dropDowned) {
        //     window.location = "http://localhost:3000/#/menu/all_categories";
        // }
        this.setState(() => ({dropDowned: !this.state.dropDowned, dropDownArrow: !this.state.dropDownArrow}))
    }
    render(){
        const sidebarBackground = {
            backgroundImage: 'url(' + imagine + ')'
        };
        return (
            <div id="sidebar" className="sidebar" data-color="black" data-image={imagine}>
                <div className="sidebar-background"></div>
                <div className="logo">
                    <a href="https://www.creative-tim.com" className="simple-text logo-normal">
                        <div className="logo-img">
                            <img src={logo} alt="logo_image"/>
                        </div>
                    </a>
                </div>
                <div className="sidebar-wrapper">
                    <ul className="nav">
                        { this.state.width <= 991 ? (<HeaderLinks />):null }
                        {
                            appRoutes.map((prop, index) => {
                                if(!prop.redirect) {
                                    if (prop.child && !this.state.dropDowned) {
                                        return null;
                                    }
                                    return (
                                        <li className={prop.child ? "submenu" : ""}
                                            key={index} onClick={() => {prop.openDropDown && this.dropDown()}}>
                                            <NavLink to={prop.path} className="nav-link"
                                                     activeClassName={`${prop.dropDown && this.state.dropDownArrow ? "open" : ""} active`}>
                                                <i className={prop.icon}></i>
                                                <p>{prop.name}</p>
                                            </NavLink>
                                        </li>
                                    );
                                }
                                return null;
                            })
                        }
                        <li>
                            <a className="nav-link logOut" onClick={this.props.doLogOut}>
                                <i className="pe-7s-power"></i>
                                <p>Выход</p>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Sidebar;