import React, { Component } from 'react';
import './App.css';
import logo from './imgs/alphaFiveColorsCircle.png';
import idleLogo from './imgs/IdleAlertLogo.png';
import triggeredLogo from './imgs/TrigAlertLogo.png';
import {listAlerts} from './fn';
import {triggered} from './fn';


class App extends React.Component {
   componentDidMount(){
    document.title = "Alpha V Alerts"
  }
  
  
  constructor(props) {
    super(props);
    this.state = {value: 'None'};
	this.name= this.state.value;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
	this.triggered = true;
	this.bools = [false,true, true, true, false]
	this.names = ["None", "Zach's System", "Elise's System", "Jeff's System", "Neena's System"];
	this.trig = ["Full Storage", "Slow RAM", "Need Patch"];
	this.idle = ["Virus","Chrome Update","Email"];
	this.state.value = 0;
	this.Stats = 0;
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
	event.preventDefault();
    this.name=this.names[this.state.value];
	this.Stats = this.state.value;
	this.forceUpdate();
  }
  render() {
	 
    return (
		
		<div className="App">
		{/*This is the start of what I am adding*/}
				<header className="Alpha V Alerts">
					<title>Alpha V Alert System </title>
				</header>
				
				<div className="welcomeBanner" >
					<h2>Welcome To:</h2>
					<h1>The Alpha V Alert System</h1>
				</div>
				
				
				<div className="currSys">
					<p>System Name: {this.name}</p>
					
				</div>
				
				<div className="NONSENSE"> <img src={logo} height="100" width="100" alt="it us!"/> </div>
				
				<div className="logOut">
					<p>Logout</p>
				</div>
				
				{/*<div className="separationLine"><br></br></div>*/}
				
				<div className="leftSide">
					
					<form onSubmit={this.handleSubmit}>
						<label>
						<br></br>Choose Which System to Monitor:
						<select value={this.state.value} onChange={this.handleChange}>
							<option value={0}>Select a System</option>
							<option value={1}>Zach's System</option>
							<option value={2}>Elise's System</option>
							<option value={3}>Jeff's System</option>
							<option value={4}>Neena's System</option>
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
				{listAlerts(this.trig, triggeredLogo)}
				</div>
					<br></br>
				<div className="rightSideIdle">
				<b>Idle Alerts:</b>
				{listAlerts(this.idle, idleLogo)}
				</div>
					<br></br>
				</div>
				<div className="leftSideStatus">
				{triggered(this.bools, this.Stats)}
				</div>
				
			
		{/*<header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
       
	   <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.s</p>
		*/}
		
		</div>
	
	  
	  
	  
    );
  }
		
	
}

export default App;
