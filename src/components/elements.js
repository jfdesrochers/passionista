import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'
import media from '../styles/media';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100%;
    height: 100%;
    justify-content: space-between;
    ${media.tabletPortrait`
        margin-left: 40px;
        margin-right: 40px;
    `}
`
Wrapper.displayName = 'Wrapper'

export const Hr = styled.hr`
    border: solid 1px ${props => props.dark ? '#000000' : '#ffffff'};
    margin-top: 0;
    margin-bottom: 20px;
    display: ${props => props.hiddenMobile ? 'none' : 'block'};
    ${media.tabletPortrait`
        display: block;
    `}
    ${media.tabletLandscape`
        border: solid 1px ${props => (props.dark || props.autoDark) ? '#000000' : '#ffffff'};
    `}
`
Hr.displayName = 'Hr'

export const DivImage = styled.div`
    display: inline-block;
    background-size: contain;
    background-repeat: no-repeat;
`
DivImage.displayName = 'DivImage'

const MenuButtonContainer = styled.div`
    width: 32px;
    height: 24px;
    position: relative;
    transform: rotate(0deg);
    transition: .5s ease-in-out;
    cursor: pointer;

    ${media.tabletPortrait`
        width: 60px;
        height: 45px;
    `}
  
    span {
        display: block;
        position: absolute;
        height: 4px;
        width: 100%;
        background: ${props => props.dark ? '#000000' : '#ffffff'};
        border-radius: 4px;
        opacity: 1;
        left: 0;
        transform: rotate(0deg);
        transition: .25s ease-in-out;
    }

    ${media.tabletLandscape`
        span {    
            background: ${props => (props.dark || props.autoDark) ? '#000000' : '#ffffff'};
        }
    `}

    span:nth-child(1) {
        top: 0;
    }

    span:nth-child(2), span:nth-child(3) {
        top: calc(50% - 2px);
    }

    span:nth-child(4) {
        top: calc(100% - 4px);
    }

    &.open span:nth-child(1) {
        top: calc(50% - 2px);
        width: 0%;
        left: 50%;
    }

    &.open span:nth-child(2) {
        transform: rotate(45deg);
    }

    &.open span:nth-child(3) {
        transform: rotate(-45deg);
    }

    &.open span:nth-child(4) {
        top: calc(50% - 2px);
        width: 0%;
        left: 50%;
    }
`
MenuButtonContainer.displayName = 'MenuButtonContainer'

export class MenuButton extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false
        }
    }

    buttonClick = (e) => {
        e.preventDefault()
        const newState = !this.state.open;
        this.setState({open: newState})
        if (this.props.onMenuButtonClick) {
            this.props.onMenuButtonClick(newState);
        }
    }

    render() {
        return (
            <MenuButtonContainer onClick={this.buttonClick} className={this.state.open && "open"} {...this.props}>
                <span />
                <span />
                <span />
                <span />
            </MenuButtonContainer>
        )
    }
}

MenuButton.propTypes = {
    onMenuButtonClick: PropTypes.func,
    dark: PropTypes.bool,
    autoDark: PropTypes.bool
}

const CloseButtonContainer = styled.div`
    width: 32px;
    height: 24px;
    position: relative;
    transition: .5s ease-in-out;
    cursor: pointer;
    opacity: 0;

    ${media.tabletPortrait`
        width: 60px;
        height: 45px;
    `}

    span {
        display: block;
        position: absolute;
        height: 4px;
        width: 100%;
        background: ${props => props.dark ? '#000000' : '#ffffff'};
        border-radius: 4px;
        opacity: 1;
        left: 0;
        transform: rotate(0deg);
        transition: .25s ease-in-out;
    }

    ${media.tabletLandscape`
        span {    
            background: ${props => (props.dark || props.autoDark) ? '#000000' : '#ffffff'};
        }
    `}

    &.show {
        opacity: 1;
    }

    span:nth-child(1), span:nth-child(2) {
        top: calc(50% - 2px);
    }

    &.show span:nth-child(1) {
        transform: rotate(45deg);
    }

    &.show span:nth-child(2) {
        transform: rotate(-45deg);
    }
`
CloseButtonContainer.displayName = 'CloseButtonContainer'

export class CloseButton extends Component {
    buttonClick = (e) => {
        e.preventDefault()
        if (this.props.onCloseButtonClick) {
            this.props.onCloseButtonClick();
        }
    }

    render() {
        return (
            <CloseButtonContainer className={this.props.onCloseButtonClick && "show"} onClick={this.buttonClick} {...this.props}>
                <span />
                <span />
            </CloseButtonContainer>
        )
    }
}

CloseButton.propTypes = {
    onCloseButtonClick: PropTypes.func,
    dark: PropTypes.bool,
    autoDark: PropTypes.bool
}

export const Button = styled.button`
    background-color: ${props => props.theme.button[props.kind].backColor};
    color: ${props => props.theme.button[props.kind].fontColor};
    padding: 10px 15px;
    border: none;
    font: inherit;
    font-weight: bold;
    &:hover {
        background-color: ${props => props.theme.button[props.kind].hoverColor};
    }
    &:active {
        background-color: ${props => props.theme.button[props.kind].downColor};
    }
    &:focus {
        outline: ${props => props.theme.button[props.kind].fontColor} auto 5px;
    }
`
Button.displayName = 'Button'
Button.propTypes = {
    kind: PropTypes.string.isRequired
}

class PictureComponent extends Component {
    constructor (props) {
        super(props)
        this.state = {
            loaded: false
        }
    }

    componentDidMount () {
        if (this.props.pictureLoader) {
            this.img = new Image()
            this.img.onload = () => {
                this.setState({loaded: true})
            }
            this.img.src = this.props.pictureUrl
        }
    }

    componentWillUnmount () {
        // We remove the references in case the component is unmounted before the image has loaded.
        if (this.img) {
            this.img.onload = null
            this.img = null
        }
    }

    render () {
        return (
            <div className={this.props.className + (this.state.loaded ? ' loaded' : '')} />
        )
    }
}

export const Picture = styled(PictureComponent)`
    background-color: ${props => props.theme.backColor};
    background-image: url(${props => props.pictureLoader ? ('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDACAWGBwYFCAcGhwkIiAmMFA0MCwsMGJGSjpQdGZ6eHJmcG6AkLicgIiuim5woNqirr7EztDOfJri8uDI8LjKzsb/2wBDASIkJDAqMF40NF7GhHCExsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsb/wAARCAAWACgDASIAAhEBAxEB/' + props.pictureLoader) : props.pictureUrl});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    transition: .25s ease-in-out;
    &.loaded {
        background-image: url(${props => props.pictureUrl})
    }
`
Picture.displayName = 'Picture'