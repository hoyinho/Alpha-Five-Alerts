import React, { Component } from 'react';
import './App.css';
import logo from './imgs/alphaFiveColorsCircle.png';
import idleLogo from './imgs/IdleAlertLogo.png';
import triggeredLogo from './imgs/TrigAlertLogo.png';
import statusLogo from './imgs/StatusLogo.png';
import {listAlerts} from './fn';
import {triggered} from './fn'; import{listStatusesRight} from './fn';import{listStatusesLeft} from './fn';
import ReactShow from 'react-show';

class App extends Component {
	state = {
		isLoggedIn: false,
		systems: [],
		sysSelect: 0,
	 	trigAlerts: [["Fetching alerts"]], 
	 	idleAlerts: [["Fetching alerts"]],
		statuses:[[["Fetching statuses",""]]],
		alertCreate: false,
		alertDelete: false,
		alertModify: false,
	 	alertName:"", 
	 	field: "", 
	 	threshold: "",
	 	delAlertName: "------", 
	 	allAlerts: [[]],
	 	User: "",
	 	Pass: "",
	 	login: ""
	 }
	componentDidMount() {
		document.title = "Alpha V Alerts"
	}
	constructor(props) {
		super(props);
		this.handleSysSelect = this.handleSysSelect.bind(this);
		this.handleLogout = this.handleLogout.bind(this);
		this.handleAlertCreate = this.handleAlertCreate.bind(this);
		this.handleAlertDelete = this.handleAlertDelete.bind(this);
		this.handleAlertModify = this.handleAlertModify.bind(this);
		this.handleDelAlertName = this.handleDelAlertName.bind(this);
		this.handleNewAlert = this.handleNewAlert.bind(this);
		this.handleField = this.handleField.bind(this);
		this.handleAlertName = this.handleAlertName.bind(this);
		this.handleThreshold = this.handleThreshold.bind(this);
		this.handleDeleteAlert = this.handleDeleteAlert.bind(this);
		this.handleUser = this.handleUser.bind(this);
		this.handlePass = this.handlePass.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
		this.state.sysSelect = 0;
		this.repeatName = false;
	}
	handleUser(event){
		this.setState({User:event.target.value});
	}
	handlePass(event){
		this.setState({Pass:event.target.value});
	}
	handleLogin(event){
		event.preventDefault();
		if(this.state.User===""){
				window.alert("Please enter a Username");
			}
		else if(this.state.Pass===""){
			window.alert("Please enter a Passsword");
		}
		else{
			fetch('/login',{ 
			method:'POST',
			headers:{ 
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username: this.state.User,
				password: this.state.Pass
			})
		})
		.then(res=>res.json())
		.then(temp => {
			console.log(temp["username"]);
			this.setState({login:temp["username"]});
		})
		.then(res => {
		if(this.state.login===""){
			window.alert("Incorrect Username or Password");
		}
		else{
			this.setState({isLoggedIn:true});
			fetch('/systems', {
				method: 'POST',
				headers:{
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					username: this.state.login
				})
			})
			.then(res => res.json())
			.then(systems => this.setState({ systems }));
			fetch('/trigAlerts', {
				method: 'POST',
				headers:{
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					username: this.state.login
				})
			}) 
			.then(res => res.json())
			.then(trigAlerts => this.setState({ trigAlerts }));
			fetch('/idleAlerts', {
				method: 'POST',
				headers:{
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					username: this.state.login
				})
			}) 
			.then(res => res.json())
			.then(idleAlerts => this.setState({ idleAlerts }));
    		fetch('/allAlerts', {
				method: 'POST',
				headers:{
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					username: this.state.login
				})
			})
      		.then(res => res.json())
      		.then(allAlerts => this.setState({ allAlerts }));
			fetch('/status', {
				method: 'POST',
				headers:{
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					username: this.state.login
				})
			})
			.then(res => res.json())
      		.then(statuses => {
      			this.setState({ statuses });
      		})
			this.setState({User:""});
			this.setState({Pass:""});
		}});
	}}
	handleLogout(event){
		event.preventDefault();
		if(this.state.isLoggedIn){
			this.setState({ isLoggedIn:false});
			this.setState({ systems:[]});
			this.setState({ sysSelect: 0 });
			this.setState({ trigAlerts:[["Fetching alerts"]]});
			this.setState({ idleAlerts:[["Fetching alerts"]]});
			this.setState({ statuses:[["Fetching statuses"]]});
			this.setState({ alertCreate: false});
			this.setState({ alertDelete: false});
			this.setState({ alertModify: false});
	 		this.setState({ alertName:""});
			this.setState({ field: "" });
			this.setState({ threshold: 0});
			this.setState({ delAlertName: "------" });
			this.setState({ allAlerts:[[]]});
			this.setState({ User: ""});
			this.setState({ Pass: ""});
			this.setState({ login:""});
		}
	}
	handleAlertCreate(event){
		event.preventDefault();
		this.setState({alertCreate:!this.state.alertCreate});
		this.setState({alertDelete:false});
		this.setState({alertModify:false});
	}
	handleAlertDelete(event){
		event.preventDefault();
		this.setState({alertDelete:!this.state.alertDelete});
		this.setState({alertCreate:false});
		this.setState({alertModify:false});
	}
	handleAlertModify(event){
		event.preventDefault();
		this.setState({alertModify:!this.state.alertModify});
		this.setState({alertCreate:false});
		this.setState({alertDelete:false});
	}
	handleSysSelect(event) {
		this.setState({ sysSelect: event.target.value });
	}
	handleAlertName(event){
		this.setState({alertName:event.target.value});
	}
	handleDelAlertName(event){
		this.setState({delAlertName:event.target.value});
	}
	handleField(event){
		this.setState({field:event.target.value});
	}
	handleThreshold(event){
		this.setState({threshold:event.target.value});
	}
	handleNewAlert(event){
		event.preventDefault();
		for(var y = 0; y<this.state.allAlerts[this.state.sysSelect].length; y++){
			if(this.state.alertName===this.state.allAlerts[this.state.sysSelect][y]){
				this.repeatName=true;
			}
		}
		if(this.state.sysSelect===0){
			window.alert('Please select a system to create alerts');
		}
		else if(this.state.alertName===""){
			window.alert('Please enter an alert name');
		}
		else if(this.state.alertName==="------"||this.repeatName){
			window.alert('Please enter a different alert name');
			this.repeatName=false;
		}
		else if(this.state.field===""){
			window.alert('Please select a field for the alert');
		}
		else if(this.state.threshold===""){
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
					username: this.state.login, 
					name: this.state.alertName,
					threshold: this.state.threshold,
					field: this.state.field,
					sysName: this.state.systems[this.state.sysSelect]
				})
			});
			fetch('/trigAlerts', {
				method: 'POST',
				headers:{
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					username: this.state.login
				})
			}) 
			.then(res => res.json())
			.then(trigAlerts => this.setState({ trigAlerts }));
			fetch('/idleAlerts', {
				method: 'POST',
				headers:{
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					username: this.state.login
				})
			}) 
			.then(res => res.json())
			.then(idleAlerts => this.setState({ idleAlerts }));
    		fetch('/allAlerts', {
				method: 'POST',
				headers:{
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					username: this.state.login
				})
			})
			.then(res => res.json())
      		.then(allAlerts => this.setState({ allAlerts }));
			this.setState({threshold:""});
			this.setState({alertName:""});
			this.setState({field:""});
		}
	}	
	handleModAlert(event){
		event.preventDefault();
		if(this.state.sysSelect===0){
			window.alert('Please select a system to create alerts');
		}
		else{
			fetch('/modifyAlert',{ 
				method:'POST',
				headers:{ 
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					username: this.state.login, 
					name: this.state.alertName,
					threshold: this.state.threshold,
					field: this.state.field,
					sysName: this.state.systems[this.state.sysSelect]
				})
			});
			fetch('/trigAlerts', {
				method: 'POST',
				headers:{
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					username: this.state.login
				})
			}) 
			.then(res => res.json())
			.then(trigAlerts => this.setState({ trigAlerts }));
			fetch('/idleAlerts', {
				method: 'POST',
				headers:{
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					username: this.state.login
				})
			}) 
			.then(res => res.json())
			.then(idleAlerts => this.setState({ idleAlerts }));
    		fetch('/allAlerts', {
				method: 'POST',
				headers:{
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					username: this.state.login
				})
			})
			.then(res => res.json())
      		.then(allAlerts => this.setState({ allAlerts }));
			this.setState({threshold:""});
			this.setState({alertName:""});
			this.setState({field:""});
		}
	}
	handleDeleteAlert(event){
		event.preventDefault();
		if(this.state.sysSelect===0){
			window.alert('Please select a system to delete alerts');
		}
		else if(this.state.delAlertName==="------"){
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
					username: this.state.login, 
					name: this.state.delAlertName,
					systemName: this.state.systems[this.state.sysSelect]
				})
			});
			fetch('/trigAlerts', {
				method: 'POST',
				headers:{
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					username: this.state.login
				})
			}) 
			.then(res => res.json())
			.then(trigAlerts => this.setState({ trigAlerts }));
			fetch('/idleAlerts', {
				method: 'POST',
				headers:{
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					username: this.state.login
				})
			}) 
			.then(res => res.json())
			.then(idleAlerts => this.setState({ idleAlerts }));
    		fetch('/allAlerts', {
				method: 'POST',
				headers:{
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					username: this.state.login
				})
			})
			.then(res => res.json())
      		.then(allAlerts => this.setState({ allAlerts }));
			this.setState({ delAlertName: "------" });
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
			<div className="login2"> 
			{this.props.children}
				<form onSubmit={this.handleLogin} className = "submitform">
					Username: <input type="text" onChange={this.handleUser} placeholder="Your Username" className= "user"/>
					<br/>{"\xa0"/*Puts a space before the word password to make it align nice*/}Password: <input type="password" secureTextEntry={true} onChange={this.handlePass} placeholder="Your Password" className= "pass"/>
					<br/><input type="submit" value="Login" className= "form22" onClick={this.handleLogin}/>
				</form>
			</div>			
		</ReactShow>
			
		<ReactShow show={this.state.isLoggedIn}>
				<div className="currSys">
					<br/><form onSubmit={this.handleSubmit}>
						<label>
						{"\xa0\xa0\xa0\xa0\xa0\xa0\xa0"}Choose a system:
							< select value={this.state.sysSelect} onChange={this.handleSysSelect} className = "dropdown">
								{this.state.systems.map((e, key) => {
									return <option value={key}>{e}</option>;
								})}
							</select>
						</label>
					</form><br/>
				</div>
				
				<div className="middleLogo"> 
					<img src={logo} height="100" width="100" alt="it us!"/> 
				</div>
				
				<div className="logOut" onClick={this.handleLogout}>
					<p>Logout of {this.state.login}</p>
				</div>
	
				<div className="rightSide">
					<p>Alerts for Current System</p>
					<div className="rightSideTriggered">
						<b>Triggered Alerts:</b>
						{listAlerts(this.state.trigAlerts[this.state.sysSelect], triggeredLogo)}
					</div>
	
					<br></br>
	
					<div className="rightSideIdle">
						<b>Idle Alerts:</b>
						{listAlerts(this.state.idleAlerts[this.state.sysSelect], idleLogo)}
					</div>
	
					<br></br>
						<div className="toggleAlertCreate" onClick={this.handleAlertCreate}>
							<b>Alert Creator</b>
						</div>
						<div className="toggleAlertModify" onClick={this.handleAlertModify}>
							<b>Alert Modifier</b>
						</div>
						<div className="toggleAlertDelete" onClick={this.handleAlertDelete}>
							<b>Alert Deleter</b>
						</div>
					<br></br>
					<ReactShow show={this.state.alertCreate}>
						<div className="alertManager">
									<br></br>
									<form onSubmit={this.handleNewAlert}>
										<label>
											System for the alert: {this.state.systems[this.state.sysSelect]}<br/>
											New Alert Name:
											<input type="text" placeholder="Alert Name" value={this.state.alertName}onChange={this.handleAlertName} />							
											<br></br>
											Trigger the alert when:
											<select value={this.state.field} onChange={this.handleField}>
												<option value={''}>{'Select a field'}</option>;
												<option value={'freeTiB'}>{'Free space in Terabytes is less than'}</option>;
												<option value={'freePct'}>{'Free space as a percent is less than'}</option>;
												<option value={'failedCapacityTiB'}>{'Failed amount in Terabytes is more than'}</option>;
												<option value={'cpuAvgMax'}>{'Average maximum CPU usage is more than'}</option>;
												<option value={'dataRateKBPSAvg'}>{'Data rate in KBPS is less than'}</option>;
												})}
											</select>
							
											<br></br>
											Threshold: <input type="number" placeholder="Enter a number" value={this.state.threshold} onChange={this.handleThreshold} step="0.00001"/>
										</label>
						
										<br></br>
						
										<input type="submit" className="submitbutton" value="Save Alert" />
									</form>
									<br></br>
						</div>
					</ReactShow>
					<ReactShow show={this.state.alertModify}>
						<div className="alertManager">
							<form onSubmit={this.handleModAlert}>
							<br/>Alert to be modified: <select value={this.state.modAlertName} onChange={this.handleModAlertName}>
										{this.state.allAlerts[this.state.sysSelect].map((e, key) => {
											return <option value={e}>{e}</option>;
										})}				
							</select>
							<br/>New Alert Name:
							<input type="text" placeholder="Alert Name" value={this.state.newModAlertName} onChange={this.handleNewModAlertName} />
							<br/>
							Threshold: <input type="number" placeholder="Enter a number" value={this.state.newThreshold} onChange={this.handleNewThreshold} step="0.00001"/>
							<br/><input type="submit" className="submitbutton" value="Save Alert" />
							</form>
						</div>
					</ReactShow>
					<ReactShow show={this.state.alertDelete}>
						<div className="alertManager">
							<br></br>
								<form onSubmit={this.handleDeleteAlert}>
									System for the alert: {this.state.systems[this.state.sysSelect]}
									<br></br>
									Alert to be deleted:
									<select value={this.state.delAlertName} onChange={this.handleDelAlertName}>
										{this.state.allAlerts[this.state.sysSelect].map((e, key) => {
											return <option value={e}>{e}</option>;
										})}
									</select>
									<input type="submit" className="submitbutton" value="Delete Alert" />
							</form><br/>
							</div>
						</ReactShow>
				</div>
		<div className="leftSideStatus">
			{triggered(this.state.trigAlerts[this.state.sysSelect], this.state.sysSelect)}
		</div>
		<div className ="leftSideViewStatuses">
					<div className="statusInteriorBox">
						<div className="statusRight">
						<b>Values:{"\xa0\xa0\xa0\xa0\xa0\xa0"}</b>
						{listStatusesRight(this.state.statuses[this.state.sysSelect],statusLogo)}
						</div>
						<div className="statusLeft">
						<b>{"\xa0\xa0"}Statuses types:</b>
						{listStatusesLeft(this.state.statuses[this.state.sysSelect],statusLogo)}
						</div>
					</div>
					<br></br><br></br><br></br>
		</div>
		</ReactShow>
	</div>
	);
	}
	}

	export default App;