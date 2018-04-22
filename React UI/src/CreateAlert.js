import React, { Component } from 'react';
import './App.css';
import {
	Route,
	NavLink,
	HashRouter
} from "react-router-dom";
import Main from "./Main";
import logo from './imgs/alphaFiveColorsCircle.png';
import idleLogo from './imgs/IdleAlertLogo.png';
import triggeredLogo from './imgs/TrigAlertLogo.png';
import {listAlerts} from './fn';
import {triggered} from './fn';

class App extends Component {
  state = {systems: [], sysName: "Name", alertName:"Alert Name", field: "field", threshold: "0", delAlertName: "Delete Alert Name"}

  componentDidMount() {
	document.title = "Alpha V Alerts"
    fetch('/systems')
      .then(res => res.json())
      .then(systems => this.setState({ systems }));
  }
  
  constructor(props) {
    super(props);
    this.handleDelAlertName = this.handleDelAlertName.bind(this);
    this.handleNewAlert = this.handleNewAlert.bind(this);
    this.handleSysName = this.handleSysName.bind(this);
	this.handleField = this.handleField.bind(this);
	this.handleAlertName = this.handleAlertName.bind(this);
	this.handleThreshold = this.handleThreshold.bind(this);
	this.state.value = 0;
	this.selection = 0;
	this.alertName ="test";
	this.delAlertName = "test";
  }
  handleAlertName(event){
	  this.setState({alertName:event.target.value});
  }
  handleDelAlertName(event){
	  this.setState({delAlertName:event.target.value});
  }
   handleSysName(event){
	  this.setState({sysName:event.target.value});
  }
  handleField(event){
	  this.setState({field:event.target.value});
  }
  handleThreshold(event){
	  this.setState({threshold:event.target.value});
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
				username: 'Hoyin', 
				name: this.state.alertName,
				threshold: this.state.threshold,
				field: this.state.field,
				sysName: this.state.systems[this.state.sysName]
			})
		});//end of fetch
		window.alert(this.state.alertName + "has been created")
	}//end of handleNewAlert()
	handleDeleteAlert(event){
		event.preventDefault();
		fetch('/deleteAlert',{ 
			method:'POST',
			headers:{ 
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username: 'Hoyin', 
				name: this.state.alertName
			})
		});//end of fetch
		window.alert(this.state.delAlertName + "has been created")
	}//end of handleDeleteAlert()
  
  render() {
    return (
		<div className="CreateAlert">
		<form onSubmit={this.handleNewAlert}>
			<label>
			 New Alert Name:
			<input type="text" onChange={this.handleAlertName} />
			<br/>System for the alert:<select value={this.state.sysName} onChange={this.handleSysName}>
    						{this.state.systems.map((e, key) => {
        					return <option value={key}>{e}</option>;
 					    })}
			</select>
			<br/>Field for the alert:<select value={this.state.field} onChange={this.handleField}>
    						{this.state.systems.map((e, key) => {
        					return <option value={key}>{e}</option>;
 					    })}
			</select>
			<br/>Threshold: <input type="text" onChange={this.handleThreshold} />
			</label>
			<br/>
			<input type="submit" value="Save Alert" />
			<br/>
			System: {this.state.sysName}
			<br/>
			Alert Name: {this.state.alertName}
			<br/>
			Field: {this.state.field}
			<br/>
			Threshold: {this.state.threshold}
		</form>
		<form onSubmit={this.handleDeleteAlert}>
			<label>
			 Deleted Alert Name:
			<input type="text" onChange={this.handleDelAlertName} />
			<br/>
			Alert Name: {this.state.delAlertName}
			<br/>
			<input type="submit" value="Delete Alert" />
			</label>
		</form>
					<div>
					<NavLink to="./App"> Close Alert creation </NavLink>
					<Route path="/App" component={App}/>
					</div>			
		</div>
    );
  }
}

export default App;