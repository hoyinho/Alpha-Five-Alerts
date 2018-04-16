import React, { Component } from 'react';
import './App.css';
import logo from './imgs/alphaFiveColorsCircle.png';
import idleLogo from './imgs/IdleAlertLogo.png';
import triggeredLogo from './imgs/TrigAlertLogo.png';
import {listAlerts} from './fn';
import {triggered} from './fn';
import {parse} from '../node_modules/json3';
class App extends Component {
  state = {users: []}

  componentDidMount() {
	document.title = "Alpha V Alerts"
    fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({ users }));
  }
  
  constructor(props) {
    super(props);
    this.state.temp = {value: 'None'};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
	this.bools = [false,false, true, true, false]
	this.trig = [["Select a System to view Alerts"],["Full Storage"],[],[],["Slow RAM", "Need Patch"]];
	this.idle = [["Select a System to view Alerts"],["Slow RAM", "Need Patch"],["Full Storage", "Slow RAM", "Need Patch"],["Full Storage", "Slow RAM", "Need Patch"],["Full Storage"]];
	this.state.value = 0;
	this.selection = 0;
  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }
  handleSubmit(event) {
	event.preventDefault();
	this.selection = this.state.value;
	this.forceUpdate();
  }
  render() {
    return (
		<div className="App">
				<header className="Alpha V Alerts">
					<title>Alpha V Alert System </title>
				</header>

				<div className="welcomeBanner" >
					<h2>Welcome To</h2>
					<h1>The Alpha V Alert System</h1>
				</div>

				<div className="currSys">
					<p>System Name: {this.state.users[this.selection]}</p>
				</div>
					<div className="middleLogo"> <img src={logo} height="100" width="100" alt="it us!"/> </div>
					<div className="logOut">
						<p>Logout</p>
				</div>

				<div className="leftSide">
					<form onSubmit={this.handleSubmit}>
						<label>
						<br></br>Choose Which System to Monitor:
						<select value={this.state.value} onChange={this.handleChange}>
    						{this.state.users.map((e, key) => {
        					return <option value={key}>{e}</option>;
 					    })}
						</select>
						</label>
						<input type="submit" value="Submit" />
					</form>
					<br></br>
				</div>

				<div className="rightSide">
					<p>Alerts for Current System</p>
					<br></br>
						<div className="rightSideTriggered">
							<b>Triggered Alerts:</b>
							{listAlerts(this.trig[this.selection], triggeredLogo)}
						</div>
					<br></br>
						<div className="rightSideIdle">
							<b>Idle Alerts:</b>
							{listAlerts(this.idle[this.selection], idleLogo)}
						</div>
					<br></br>
				</div>

				<div className="leftSideStatus">
					{triggered(this.bools, this.selection)}
				</div>
		</div>
    );
  }/*
  render() {
    return (
				      <div className="AppTEST">
        <h1>Users</h1>
        {this.state.users.map(user =>
          {user}
        )}
      </div>
    );
  }*/
}

export default App;