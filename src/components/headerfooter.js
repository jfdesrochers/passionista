import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import media from '../styles/media';

import logo from '../images/logo.png';
import logodark from '../images/logodark.png';
import tagline from '../images/tagline.png';
import taglinedark from '../images/taglinedark.png';

import {Hr, DivImage, MenuButton, CloseButton} from './elements';

export const Logo = DivImage.extend`
    width: 212.5px;
    height: 38px;
    margin: 20px 10px;
    background-image: ${props => props.dark ? `url(${logodark})` : `url(${logo})`};
    ${media.tabletPortrait`
        width: 425px;
        height: 76px;
        margin: 20px;
    `}
    ${media.tabletLandscape`
        background-image: ${props => (props.autoDark || props.dark) ? `url(${logodark})` : `url(${logo})`};
    `}
`
Logo.displayName = 'Logo'

export const Tagline = DivImage.extend`
    width: 126.5px;
    height: 16px;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: 10px;
    background-image: ${props => props.dark ? `url(${taglinedark})` : `url(${tagline})`};
    ${media.tabletPortrait`
        width: 253px;
        height: 32px;
        margin-top: 20px;
        margin-bottom: 20px;
        margin-left: 0;
    `}
    ${media.tabletLandscape`
        background-image: ${props => (props.autoDark || props.dark) ? `url(${taglinedark})` : `url(${tagline})`};
    `}
`
Logo.displayName = 'Tagline'

const HeaderWrapper = styled.div`
    z-index: 20;
`
HeaderWrapper.displayName = 'HeaderWrapper'

const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
`
HeaderContainer.displayName = 'HeaderContainer'

const NavContainer = styled.nav`
    width: 100%;
    z-index: 999;
    position: absolute;
    top: 75px;
    background: rgba(0, 0, 0, 0.5);
    box-shadow: 5px 0 10px rgba(0, 0, 0, 0.65);
    color: #ffffff;
    left: -100%;
    bottom: 0;
    transition: opacity 300ms 100ms ease, transform 500ms ease;
    transform: translate(-100%);
    opacity: 0;
    &.open {
        transition: opacity 300ms 100ms ease, transform 500ms ease;
        transform: translate(100%);
        opacity: 1;
    }

    ${media.tabletPortrait`
        top: 120px;
        width: 360px;
        left: -360px;
    `}

    ${media.desktop`
        width: 450px;
        left: -450px;
    `}
`
NavContainer.displayName = 'NavContainer'

const Menu = styled.ul`
    list-style: none outside none;
    padding: 0;
    margin: 0;
`
Menu.displayName = 'Menu'

const MenuHeading = styled.h1`
    font-size: 32px;
    text-transform: uppercase;
    margin: 0;
    padding: 17px 10px;
    padding-bottom: 8.5px;

    ${media.desktop`
        font-size: 36px;
        padding: 25px 20px;
        padding-bottom: 12.5px;
    `}
`
MenuHeading.displayName = 'MenuHeading'

const MenuLink = styled(Link)`
    display: block;
    padding: 17px 20px;
    color: ${props => props.theme.accent2};
    font-size: 24px;
    font-weight: 300;
    text-transform: uppercase;
    text-decoration: none;
    border-bottom: 1px solid #ffffff;
    ${media.desktop`
        font-size: 28px;
        padding: 25px 30px;
    `}
`
MenuLink.displayName = 'MenuLink'

const FooterWrapper = styled.div`
    z-index: 20;
`
FooterWrapper.displayName = 'FooterWrapper'

export class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            menuOpen: false
        }
    }

    menuButtonClick = (menuState) => {
        this.setState({
            menuOpen: menuState
        })
    }

    render() {
        return (
            <HeaderWrapper>
                <HeaderContainer>
                    <MenuButton {...this.props} onMenuButtonClick={this.menuButtonClick} />
                    <Logo dark={this.props.dark} autoDark={this.props.autoDark} />
                    <CloseButton dark={this.props.dark} autoDark={this.props.autoDark} onCloseButtonClick={this.props.onCloseButtonClick} />
                </HeaderContainer>
                <Hr hiddenMobile dark={this.props.dark} autoDark={this.props.autoDark} />
                <NavContainer className={this.state.menuOpen && "open"}>
                    {Object.keys(this.props.menuRoutes).map((menuCat) => (
                        <div key={menuCat}>
                            <MenuHeading>{menuCat}</MenuHeading>
                            <Menu>
                                {Object.keys(this.props.menuRoutes[menuCat]).map((menuPath) => (
                                    <li key={menuPath}>
                                        <MenuLink to={`/services/${menuPath}`}>{this.props.menuRoutes[menuCat][menuPath]}</MenuLink>
                                    </li>
                                ))}
                            </Menu>
                        </div>
                    ))}
                </NavContainer>
            </HeaderWrapper>
        )
    }
}

Header.propTypes = {
    menuRoutes: PropTypes.object.isRequired,
    onCloseButtonClick: PropTypes.func,
    dark: PropTypes.bool,
    autoDark: PropTypes.bool
}

export const Footer = (props) => {
    return (
        <FooterWrapper>
            <Tagline {...props} />
        </FooterWrapper>
    )
}