import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {Wrapper} from './elements'
import {Header, Footer} from './headerfooter';

export default class LandingPage extends Component {
    render() {
        return (
            <Wrapper>
                <Header menuRoutes={Object.keys(this.props.storeData).reduce((o, i) => {
                    o['Nos Services'][i] = this.props.storeData[i].title
                    return o
                }, {'Nos Services': {}})} />
                <div></div>
                <Footer></Footer>
            </Wrapper>
        )
    }
}

LandingPage.propTypes = {
    storeData: PropTypes.object.isRequired,
    error404: PropTypes.bool
}