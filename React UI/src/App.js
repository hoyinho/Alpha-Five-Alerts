import React, { Component } from 'react';
import './App.css';
import logo from './imgs/alphaFiveColorsCircle.png';
import idleLogo from './imgs/IdleAlertLogo.png';
import triggeredLogo from './imgs/TrigAlertLogo.png';
import {listAlerts} from './fn';
import {triggered} from './fn';
import Popup from 'react-popup';
import ReactShow from 'react-show';

class App extends Component {
	state = {
		isLoggedIn: false,
		systems: [],
	 	trigAlerts: [[]], 
	 	idleAlerts: [[]], 
	 	alertMan: false, 
	 	sysName: "0", 
	 	alertName:"", 
	 	field: "", 
	 	threshold: "",
	 	delAlertName: "------", 
	 	allAlerts: []}

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
    	fetch('/allAlerts')
      	.then(res => res.json())
      	.then(allAlerts => this.setState({ allAlerts }));
	}

	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
		this.handleLogout = this.handleLogout.bind(this);
		this.handleAlertMan = this.handleAlertMan.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleDelAlertName = this.handleDelAlertName.bind(this);
		this.handleNewAlert = this.handleNewAlert.bind(this);
		this.handleSysName = this.handleSysName.bind(this);
		this.handleField = this.handleField.bind(this);
		this.handleAlertName = this.handleAlertName.bind(this);
		this.handleThreshold = this.handleThreshold.bind(this);
		this.handleDeleteAlert = this.handleDeleteAlert.bind(this);
		this.state.value = 0;
		this.selection = 0;
		this.alertName="Name";
	}
	handleLogin(event){
		event.preventDefault();
		if(!this.state.isLoggedIn){
			this.setState({isLoggedIn:true});
		}
	}
	handleLogout(event){
		event.preventDefault();
		if(this.state.isLoggedIn){
			this.setState({alertMan:false});
			this.selection = 0;
			this.setState({ value: 0 });
			this.setState({ sysName: 0 });
			this.setState({ field: 0 });
			this.setState({ delAlertName: 0 });
			this.setState({isLoggedIn:false});
		}
	}
	handleAlertMan(event){
		event.preventDefault();
		this.setState({alertMan:!this.state.alertMan});
	}
	handleChange(event) {
		this.setState({ value: event.target.value });
	}
	handleSubmit(event) {
		event.preventDefault();
		this.selection = this.state.value;
		this.forceUpdate();
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
	handleNewAlert(event){
		event.preventDefault();
		if(this.state.alertName==""){
			window.alert('Please enter an alert name');
		}
		else if(this.state.sysName=="0"){
			window.alert('Please select a system for the alert');
		}
		else if(this.state.field==""){
			window.alert('Please select a field for the alert');
		}
		else if(this.state.threshold==""){
			window.alert('Please enter a threshold for the alert');
		}
		else{
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
		});
		fetch('/trigAlerts') 
		.then(res => res.json())
		.then(trigAlerts => this.setState({ trigAlerts }));
		fetch('/idleAlerts') 
		.then(res => res.json())
		.then(idleAlerts => this.setState({ idleAlerts }));
    	fetch('/allAlerts')
      	.then(res => res.json())
      	.then(allAlerts => this.setState({ allAlerts }));
		window.alert(this.state.alertName + " has been created.")
		}
	}
	handleDeleteAlert(event){
		event.preventDefault();
		if(this.state.delAlertName=="------"){
			window.alert('Please select an alert to delete');
		}
		else{
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
			});
			fetch('/trigAlerts') 
			.then(res => res.json())
			.then(trigAlerts => this.setState({ trigAlerts }));
			fetch('/idleAlerts') 
			.then(res => res.json())
			.then(idleAlerts => this.setState({ idleAlerts }));
    		fetch('/allAlerts')
     	 	.then(res => res.json())
      		.then(allAlerts => this.setState({ allAlerts }));
			window.alert(this.state.delAlertName + " has been deleted.")
		}
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
			<ReactShow show={!this.state.isLoggedIn}>
			<div className="logOut" onClick={this.handleLogin}>
			<p>Login</p>
			</div>
			</ReactShow>
			<ReactShow show={this.state.isLoggedIn}>
			<div className="currSys">
			<p>System Name: {this.state.systems[this.selection]}</p>
			</div>
			
			<div className="middleLogo"> <img src={logo} height="100" width="100" alt="it us!"/> </div>
			
			<div className="logOut" onClick={this.handleLogout}>
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

			<br/>
			<div className="toggleAlertMan" onClick={this.handleAlertMan}>
			<b>Click this section to toggle the alert manager</b>
			</div>
			<br></br>
			<ReactShow show={this.state.alertMan}>
			<div className="alertManager">
			
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
			<option value={''}>{'Select a field'}</option>;
			<option value={'sizeTiB'}>{'Size in Terabytes'}</option>;
			<option value={'freeTiB'}>{'Free space in Terabytes'}</option>;
			<option value={'freePct'}>{'Free space as a percent'}</option>;
			<option value={'failedCapacityTiB'}>{'Failed amount in Terabytes'}</option>;
			<option value={'cpuAvgMax'}>{'Average maximum CPU usage'}</option>;
			<option value={'dataRateKBPSAvg'}>{'Data rate in KBPS'}</option>;
			})}

			</select>

			<br/>Threshold: <input type="number" onChange={this.handleThreshold} />
			</label>

			<br/>

			<input type="submit" value="Save Alert" />
			</form>
			
			<form onSubmit={this.handleDeleteAlert}>
			<label>
			
		<br/>Alert to be deleted:<select value={this.state.delAlertName} onChange={this.handleDelAlertName}>
		{this.state.allAlerts.map((e, key) => {
			return <option value={e}>{e}</option>;
		})}
		</select>
		<input type="submit" value="Delete Alert" />
		</label>
		</form><br/>		
		</div>
		</ReactShow>

	</div>
	<div className="leftSideStatus">
	{triggered(this.state.trigAlerts[this.selection], this.selection)}
	</div>
		</ReactShow>
	</div>
	);
	}
	}

	export default App;