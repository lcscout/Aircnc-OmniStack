import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import New from './pages/New'

export default class Routes extends Component {
	constructor(props) {
		super(props)
		this.state = {
			user_token: "",
		}
	}

	forceForce = () => {
		this.setState({user_token: localStorage.getItem('auth-token')})
	}

	handleLogout() {
		localStorage.removeItem('user')
		localStorage.removeItem('auth-token')

		return window.location = process.env.PUBLIC_URL + '/'
	}

	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route path="/" exact component={Login}/>
					<Route path="/dashboard" render={props => <Dashboard {...props} forceForce = {this.forceForce} />} />
					<Route path="/new" render={props => <New {...props} forceForce = {this.forceForce} />} />
				</Switch>
				{this.state.user_token && <button onClick={this.handleLogout} className="logout"><i className="fas fa-angle-double-left"></i></button>}
			</BrowserRouter>
		)
	}
}