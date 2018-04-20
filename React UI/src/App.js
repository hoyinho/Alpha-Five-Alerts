import React, { Component } from 'react';
import './App.css';
import logo from './imgs/alphaFiveColorsCircle.png';
import idleLogo from './imgs/IdleAlertLogo.png';
import triggeredLogo from './imgs/TrigAlertLogo.png';
import {listAlerts} from './fn';
import {triggered} from './fn';
import Popup from 'react-popup';
import ReactDOM from 'react-dom';

 

class App extends Component {
  state = {systems: [], trigAlerts: [[]], idleAlerts: [[]], status: []}

  componentDidMount() {
	document.title = "Alpha V Alerts"
    fetch('/systems')
      .then(res => res.json())
      .then(systems => this.setState({ systems }));
    fetch('/trigAlerts') 
      .then(res => res.json())
      .then(trigAlerts => this.setState({ trigAlerts }));
    fetch('/idleAlerts') 
      .then(res => res.json())
      .then(idleAlerts => this.setState({ idleAlerts }));
    fetch('/status')
      .then(res => res.json())
      .then(status => this.setState({ status }));
  }
  
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
	this.handleNewAlert = this.handleNewAlert.bind(this); //John's edit, don't know if this is needed
	this.state.value = 0;
	this.selection = 0;
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  handleSubmit(event) {
	event.preventDefault();
	this.selection = this.state.value;
	this.forceUpdate();
  }
  createAlert(event) {
  alert("hello");
  }

	//John's edit
	//function for sending new alert data to newAlert route
	handleNewAlert(event){
		event.preventDefault();
		
		fetch('/newAlert',{ 
			method:'POST',
			headers:{ 
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username: 'sickBro', 
				name: this.state.value,
				threshold: 14,
				field: 'Alert-Field'
			})
		});//end of fetch
	}//end of handleNewAlert()
  
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
				
				<form onSubmit={this.handleNewAlert}>
					<label>
						New Alert Name:
						<input type="text" onChange={this.handleChange} />
						<br/>
					</label>
					<input type="submit" value="Submit" />
				</form>
				
				
				
				<div className="currSys">
					<p>System Name: {this.state.systems[this.selection]}</p>
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
    						{this.state.systems.map((e, key) => {
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
							{listAlerts(this.state.trigAlerts[this.selection], triggeredLogo)}
						</div>
					<br></br>
						<div className="rightSideIdle">
							<b>Idle Alerts:</b>
							{listAlerts(this.state.idleAlerts[this.selection], idleLogo)}
						</div>
					<br></br>
				</div>

				<div className="leftSideStatus">
					{triggered(this.state.status, this.selection)}
				</div>

				<div className="createnewAlert">
					<form onSubmit={this.createAlert}>
						<input type="submit" value="CreateAlert" />
					</form>
					<br></br>
				</div>				
		</div>
    );
  }
}

export default App;