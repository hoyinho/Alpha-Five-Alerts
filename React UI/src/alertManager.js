import React, { Component } from 'react';
import './App.css';
import {
	Route,
	NavLink,
} from "react-router-dom";

class App extends Component {
  state = {systems: [], sysName: "Name", alertName:"Alert Name", field: "field", threshold: "0", delAlertName: "Delete Alert Name", allAlerts: []}

  componentDidMount() {
	document.title = "Alpha V Alerts"
    fetch('/systems')
      .then(res => res.json())
      .then(systems => this.setState({ systems }));
    fetch('/allAlerts')
      .then(res => res.json())
      .then(allAlerts => this.setState({ allAlerts }));
  }
  
  constructor(props) {
    super(props);
    this.handleDelAlertName = this.handleDelAlertName.bind(this);
    this.handleNewAlert = this.handleNewAlert.bind(this);
    this.handleSysName = this.handleSysName.bind(this);
	this.handleField = this.handleField.bind(this);
	this.handleAlertName = this.handleAlertName.bind(this);
	this.handleThreshold = this.handleThreshold.bind(this);
	this.handleDeleteAlert = this.handleDeleteAlert.bind(this);
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
		window.alert(this.state.alertName + " has been created. Refresh to view changes.")
	}//end of handleNewAlert()
	handleDeleteAlert(event){
		if(this.state.delAlertName == "Select a System to view Alerts"){
			window.alert("Can't delete that one")
		}
		else{
		event.preventDefault();
		fetch('/deleteAlert',{ 
			method:'POST',
			headers:{ 
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username: 'Hoyin', 
				name: this.state.delAlertName
			})
		});//end of fetch
		window.alert(this.state.delAlertName + " has been deleted. Refresh to view changes.")
	}}//end of handleDeleteAlert()
  
  render() {
    return (
		<div className="alertManager">
		<br/>
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
			{/*<br/>
			System: {this.state.sysName}
			<br/>
			Alert Name: {this.state.alertName}
			<br/>
			Field: {this.state.field}
			<br/>
			Threshold: {this.state.threshold}*/}
		</form>
		<form onSubmit={this.handleDeleteAlert}>
			<label>
			{/*Alert Name: {this.state.delAlertName}
			<br/>
			<br/>*/}Alert to be deleted:<select value={this.state.delAlertName} onChange={this.handleDelAlertName}>
    						{this.state.allAlerts.map((e, key) => {
        					return <option value={e}>{e}</option>;
 					    })}
			</select>
			<input type="submit" value="Delete Alert" />
			</label>
		</form><br/>
					<div>
					<NavLink to="./App"> Close Alert Management </NavLink>
					<Route path="/App" component={App}/>
					</div>			
		</div>
    );
  }
}

export default App;