import React, { Component } from 'react';
import {
	Route,
	NavLink,
} from "react-router-dom";
import './login.css';

class login extends Component{
	state = {User: "User", Pass: "Password", allUsers: []}
	// componentDidMount() {
	// document.title = "Alpha V Alerts"		
	// 	fetch('/usernames')
	// 	.then(res => res.json())
	// 	.then(allUsers => this.setState({ allUsers }));
	// }
	constructor(props) {
		super(props);
		this.handleUser = this.handleUser.bind(this);
		this.handlePass = this.handlePass.bind(this);
		this.handleallUsers = this.handleallUsers.bind(this);
	}
	handleUser(event){
		this.setState({User:event.target.value});
	}
	handlePass(event){
		this.setState({Pass:event.target.value});
	}
	handleallUsers(event){
		event.preventDefault();
		fetch('/allUsers',{ 
			method:'GET',
			headers:{ 
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username: 'Hoyin', 
				name: this.state.User,
				password: this.state.Pass
			})
		});
	}
	render() {
		return(
			<div className="login2"> 
			{this.props.children}
			<form onSubmit={this.handleallUsers}>
				Username: <input type="text" onChange={this.handleUser} placeholder="Your Username" className= "userpass"/>
				<br/>Password: <input type="text" onChange={this.handlePass} placeholder="Your Password" className= "userpass"/>
				<br/><input type="submit" value="Save Alert" className= "form"/>
			</form>
			</div>
		);
	}

}

export default login;
