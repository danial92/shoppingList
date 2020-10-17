import React, { Component, Fragment } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem
} from 'reactstrap';
import RegisterModal from './registerModal';
import Logout from './logout';
import Login from './loginModal';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class myNavbar extends Component {

    state = {
        isOpen: false
    }

    static propTypes = {
        auth: PropTypes.object.isRequired
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render() {
        const { isAuthenticated, user } = this.props.auth

        const authLinks = (
            <Fragment>
                <NavItem style={{display: 'flex'}}>
                    <span className="navbar-text mr-3">
                        <strong>{ user ? `Welcome ${user.name}` : '' }</strong>
                    </span>
                    <Logout />
                </NavItem>
            </Fragment>
        )

        const guestLinks = (
            <Fragment>
                <NavItem style={{display: 'flex'}}>
                    <RegisterModal />
                </NavItem>
                <NavItem style={{display: 'flex'}}>
                    <Login />
                </NavItem>
            </Fragment>
        )

        return (
            <div>
                <Navbar color="dark" dark expand="sm" className="mb-5">
                    <NavbarBrand href="/">ShoppingList</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            { isAuthenticated ? authLinks : guestLinks }
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, null)(myNavbar);