import React, { Component } from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import styled, {ThemeProvider} from 'styled-components';
import {TransitionGroup} from 'react-transition-group';

import {darkTheme} from './styles/themes';

import LandingPage from './components/landingpage';
import ProductCard from './components/productcard';
import {Fade} from './components/animations';

import base from './data';

const Container = styled.div`
    position: absolute;
    width: 100vw;
    height: 100vh;
    background-color: ${props => props.theme.backColor};
    color: ${props => props.theme.fontColor};
`
Container.displayName = 'Container'

class App extends Component {
    constructor(props) {
        super(props);

        // Initial State
        this.state = {
            storeData: {}
        }
    }

    componentWillMount() {
        // First we retrieve from cache for 'instant effect'
        const cache = localStorage.getItem('storeData')
        if (cache) {
            this.setState({'storeData': JSON.parse(cache)})
        }
        // Then we sync the new data, if any
        this.ref = base.syncState('/storeData', {
            context: this,
            state: 'storeData'
        });
    }

    componentDidUpdate() {
        // We cache the current state to localStorage
        localStorage.setItem('storeData', JSON.stringify(this.state.storeData))
    }

    componentWillUnmount() {
        // We unbind the database to stop syncing
        base.removeBinding(this.ref);
    }

    render() {
        return (
            <ThemeProvider theme={darkTheme}>
                <TransitionGroup>
                    <Fade key={this.props.location.key}>
                        <Container>
                            <Switch location={this.props.location}>
                                <Route exact path="/" render={() => {
                                    return (
                                        <LandingPage 
                                            storeData={this.state.storeData}
                                        />
                                    )
                                }} />
                                <Route path="/services/:service" render={(props) => {
                                    if (props.match.params.service in this.state.storeData) {
                                        return (
                                            <ProductCard
                                                productData={this.state.storeData[props.match.params.service]}
                                                menuRoutes={Object.keys(this.state.storeData).reduce((o, i) => {
                                                    o['Nos Services'][i] = this.state.storeData[i].title
                                                    return o
                                                }, {'Nos Services': {}})}
                                                history={props.history}
                                            />
                                        )
                                    } else {
                                        return (
                                            <LandingPage 
                                                storeData={this.state.storeData}
                                                error404
                                            />
                                        )
                                    }
                                }} />
                                <Route render={() => {
                                    return (
                                        <LandingPage 
                                            storeData={this.state.storeData}
                                            error404
                                        />
                                    )
                                }} />
                            </Switch>
                        </Container>
                    </Fade>
                </TransitionGroup>
            </ThemeProvider>
        );
    }
}

export default withRouter(App);
