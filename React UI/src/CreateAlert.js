import React, { Component } from 'react';
import './App.css';
import logo from './imgs/alphaFiveColorsCircle.png';
import idleLogo from './imgs/IdleAlertLogo.png';
import triggeredLogo from './imgs/TrigAlertLogo.png';
import {listAlerts} from './fn';
import {triggered} from './fn';

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
	this.alertName="hooplah";
  }
  handleChange(event) {
	 this.setState({ value: event.target.value });
  }
  handleSubmit(event) {
	event.preventDefault();
	this.selection = this.state.value;
	this.forceUpdate();
  }
  
	//John's edit
	//function for sending new alert data to newAlert route
	handleNewAlert(event){
		
		{this.alertName=prompt("Please enter the alert name","Test Name")}
		this.forceUpdate();
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
		</div>
    );
  }
}

export default App;