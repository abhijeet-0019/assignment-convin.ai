import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'antd';
import '../antd.css';

const Navbar = () => {

    const navLinkStyles = ({ isActive }) => {
        return {
            fontWeight: isActive ? 'bold' : 'normal',
            textDecoration: isActive ? 'none' : 'underline',
        };
    };

    return (
        <Menu theme="dark" mode="horizontal" className="navbar">
        <Menu.Item key="home">
                <NavLink style={navLinkStyles} to={'/'}>
                    Home
                </NavLink>
            </Menu.Item>    
        <Menu.Item key="all-cards">
                <NavLink style={navLinkStyles} to={'all-cards'}>
                    All Cards
                </NavLink>
            </Menu.Item>
            <Menu.Item key="history">
                <NavLink style={navLinkStyles} to={'history'}>
                    History
                </NavLink>
            </Menu.Item>
        </Menu>
    );
};

export default Navbar;