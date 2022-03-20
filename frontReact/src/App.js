import React, { Component } from 'react'
import {
	BrowserRouter as Router,
	Route
} from "react-router-dom"

import './App.css'
import './assets/css/all.css'


import HomeView from './views/HomeView'
import LoginView from './views/LoginView'
import RegisterView from './views/RegisterView'
import LogoutView from './views/LogoutView'
import MovimientosView from './views/MovimientosView'

class App extends Component {

	render() {
		return (
			<>
				<Router>
					<div className="App">
						<Route exact path="/" component={HomeView} />
						<Route exact path="/login" component={LoginView} />
						<Route exact path="/register" component={RegisterView} />
						<Route exact path="/logout" component={LogoutView} />
						<Route exact path="/movimientos" component={MovimientosView} />
					</div>
				</Router>
			</>
		)
	}
}

export default App;

//export NODE_OPTIONS=--openssl-legacy-provider