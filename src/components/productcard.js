import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import media from '../styles/media';

import {Wrapper, Hr, Button, Picture} from './elements'
import {Header, Footer} from './headerfooter';

const CardContainer= styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    ${media.tabletLandscape`
        flex-direction: row;
        flex-grow: 0;
    `}
`
CardContainer.displayName = 'CardContainer'

const CardDescBox = styled.div`
    flex: 0 1 auto;
    padding: 15px 25px;
    color: ${props => props.theme.fontColorInverse};
    display: flex;
    flex-direction: column;
    background-color: ${props => props.theme.accent1light};
    width: 100%;
    ${media.tabletLandscape`
        padding: 35px 45px;
        margin-left: 55%;
        z-index: 3;
    `}
    ${media.desktop`
        margin-left: 65%;
    `}
    ${media.bigDesktop`
        margin-left: 75%;
    `}
`
CardDescBox.displayName = 'CardDescBox'

const CardHeader = styled.h1`
    flex: 0 0 auto;
    background-color: ${props => props.theme.accent1};
    margin: -15px -25px 0 -25px;
    font-size: 3rem;
    font-weight: bold;
    padding: 25px 15px;
    color: ${props => props.theme.fontColorInverse};
    ${media.tabletLandscape`
        margin: -35px -45px 0 -45px;
        padding: 25px 35px;
    `}
`
CardHeader.displayName = 'CardHeader'

const CardDescText = styled.p`
    flex: 0 0 auto;
    margin-top: 30px;
    margin-bottom: 30px;
`
CardDescText.displayName = 'CardDescText'

const Arrow = styled.div`
    position: relative;
    width: 0; 
    height: 0; 
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;            
    border-top: 20px solid ${props => props.theme.accent1};
    margin-left: 20px;
    margin-bottom: -20px;
`
Arrow.displayName = 'Arrow'

const CardPicture = Picture.extend`
    flex: 2 0 auto;
    min-height: 30vh;
    ${media.tabletLandscape`
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    `}
`
CardPicture.displayName = 'CardPicture'

const CardActions = styled.div`
    flex: 0 0 auto;
`
CardActions.displayName = 'CardActions'

const PriceTag = styled.div`
    font-size: 2rem;
    font-weight: bold;
    float: left;
    ${media.smallPhoneOnly`
        float: initial;
    `}
`
PriceTag.displayName = 'PriceTag'

const OrderButton = Button.extend`
    float: right;
    ${media.smallPhoneOnly`
        float: initial;
        margin-top: 10px;
    `}
`
OrderButton.displayName = 'OrderButton'

export default class ProductCard extends Component {
    closeButtonClick = () => {
        this.props.history.push('/')
    }

    render() {
        return (
            <Wrapper>
                <Header menuRoutes={this.props.menuRoutes} autoDark={this.props.productData.darkUI} onCloseButtonClick={this.closeButtonClick} />
                <CardContainer>
                    <CardPicture pictureUrl={this.props.productData.picture.url} pictureLoader={this.props.productData.picture.loader} />
                    <CardDescBox>
                        <CardHeader>{this.props.productData.title}</CardHeader>
                        <Arrow />
                        <CardDescText>{this.props.productData.description}</CardDescText>
                        <CardActions>
                            <Hr dark />
                            <PriceTag>{`${this.props.productData.priceValue} $`}</PriceTag>
                            <OrderButton kind="primary">Obtenir un rendez-vous</OrderButton>
                        </CardActions>
                    </CardDescBox>
                </CardContainer>
                <Footer autoDark={this.props.productData.darkUI}></Footer>
            </Wrapper>
        )
    }
}

ProductCard.propTypes = {
    productData: PropTypes.object.isRequired,
    menuRoutes: PropTypes.object.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    })
}