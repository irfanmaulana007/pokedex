import React, { Component } from 'react';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch, Redirect } from "react-router-dom";

import store from './store';

// Styles
import './App.css';

// Components
import Nav from './components/Nav';
import Footer from './components/Footer';
import Loaders from './components/utils/Loaders';

// Main
import Browse from './views/Browse';
import Compare from './views/Compare';

const history = createBrowserHistory();

class App extends Component {
    constructor(props) {
        super(props);
        this.state = store.getState().utils;
    
        store.subscribe (() => {
            this.setState(store.getState().utils);
        })
}

	componentDidMount(){
        document.title = "Pokedex | Warung Pintar";
    }
    
	render() {
        
        let { loaders, message } = this.state;
        
		return (
            <Router history={history}>
                <div>
                    {/* Loading Component */}
                    <Loaders display={loaders} message={message} />

                    <Nav />
                    <Switch>
                        <Route exact path="/" render={ () => {
                            return <Redirect to='/browse' />
                        } } />

                        <Route exact path="/browse" component={Browse}  />
                        <Route exact path="/compare" component={Compare}  />
                    </Switch>
                    <Footer />
                </div>
			</Router>
		)
	}
}

export default App;
