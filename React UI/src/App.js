import React, { Component } from 'react';
import './App.css';
import logo from './imgs/alphaFiveColorsCircle.png';
import idleLogo from './imgs/IdleAlertLogo.png';
import triggeredLogo from './imgs/TrigAlertLogo.png';
import {listAlerts} from './fn';
import {triggered} from './fn';
import{listStatuses} from './fn';
import ReactShow from 'react-show';

class App extends Component {
	state = {
		isLoggedIn: false,
		systems: [],
	 	trigAlerts: [[]], 
	 	idleAlerts: [[]],
		statuses:[[]],
		alertCreate: false,
		alertDelete: false,
		alertModify: false,
	 	sysName: "0", 
	 	alertName:"", 
	 	field: "", 
	 	threshold: "",
	 	delAlertName: "------", 
		delSysName: "",
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
		this.handleChange = this.handleChange.bind(this);
		this.handleLogout = this.handleLogout.bind(this);
		this.handleAlertCreate = this.handleAlertCreate.bind(this);
		this.handleAlertDelete = this.handleAlertDelete.bind(this);
		this.handleAlertModify = this.handleAlertModify.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleDelAlertName = this.handleDelAlertName.bind(this);
		this.handleDelSysName = this.handleDelSysName.bind(this);
		this.handleNewAlert = this.handleNewAlert.bind(this);
		this.handleSysName = this.handleSysName.bind(this);
		this.handleField = this.handleField.bind(this);
		this.handleAlertName = this.handleAlertName.bind(this);
		this.handleThreshold = this.handleThreshold.bind(this);
		this.handleDeleteAlert = this.handleDeleteAlert.bind(this);
		this.state.value = 0;
		this.selection = 0;
		this.alertName="Name";
		this.handleUser = this.handleUser.bind(this);
		this.handlePass = this.handlePass.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
	}
	handleUser(event){
		this.setState({User:event.target.value});
	}
	handlePass(event){
		this.setState({Pass:event.target.value});
	}
	handleLogin(event){
		event.preventDefault();
		if(this.state.User==""){
				window.alert("Please enter a Username");
			}
		else if(this.state.Pass==""){
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
		.then(temp => this.setState({login:temp[0]["username"]}))
		.then(res => {
		if(this.state.login == ""){
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
      		.then(statuses => this.setState({ statuses }));
			this.setState({User:""});
			this.setState({Pass:""});
		}});
	}}
	handleLogout(event){
		event.preventDefault();
		if(this.state.isLoggedIn){
			this.setState({alertMan:false});
			this.selection = 0;
			this.setState({ value: 0 });
			this.setState({ sysName: 0 });
			this.setState({ field: 0 });
			this.setState({ delAlertName: "------" });
			this.setState({ isLoggedIn:false});
			this.setState({ systems:[]});
			this.setState({ trigAlerts:[[]]});
			this.setState({ idleAlerts:[[]]});
			this.setState({ allAlerts:[[]]});
			this.setState({ login:""})
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
	handleDelSysName(event){
		this.setState({delAlertName:event.target.value});
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
		if(this.selection=="0"){
			window.alert('Please select a system to create alerts');
		}
		else if(this.state.alertName==""){
			window.alert('Please enter an alert name');
		}
		else if(this.state.alertName=="------"){
			window.alert('Please enter a different alert name');
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
				username: this.state.login, 
				name: this.state.alertName,
				threshold: this.state.threshold,
				field: this.state.field,
				sysName: this.state.systems[this.selection]
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
		window.alert(this.state.alertName + " has been created.")
		}
	}
	handleDeleteAlert(event){
		event.preventDefault();
		if(this.selection=="0"){
			window.alert('Please select a system to delete alerts');
		}
		else if(this.state.delAlertName=="------"){
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
					systemName: this.state.systems[this.selection]
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
			<div className="login2"> 
			{this.props.children}
				<form onSubmit={this.handleLogin} className = "submitform">
					Username: <input type="text" onChange={this.handleUser} placeholder="Your Username" className= "userpass"/>
					<br/>{"\xa0"/*Puts a space before the word password to make it align nice*/}Password: <input type="text" secureTextEntry={true} onChange={this.handlePass} placeholder="Your Password" className= "userpass"/>
					<br/><input type="submit" value="Login" className= "form22" onClick={this.handleLogin}/>
				</form>
			</div>			

		</ReactShow>
			
		<ReactShow show={this.state.isLoggedIn}>
				<div className="currSys">
					<p>System Name: {this.state.systems[this.selection]}</p>
				</div>
				
				<div className="middleLogo"> 
					<img src={logo} height="100" width="100" alt="it us!"/> 
				</div>
				
				<div className="logOut" onClick={this.handleLogout}>
					<p>Logout of {this.state.login}</p>
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
						<div className="toggleAlertCreate" onClick={this.handleAlertCreate}>
							<b>Toggle Alert Creator</b>
						</div>
						<div className="toggleAlertModify" onClick={this.handleAlertModify}>
							<b>Toggle Alert Modifier</b>
						</div>
						<div className="toggleAlertDelete" onClick={this.handleAlertDelete}>
							<b>Toggle Alert Deleter</b>
						</div>
					<br></br>
					<ReactShow show={this.state.alertCreate}>
						<div className="alertManager">
									<br></br>
									<form onSubmit={this.handleNewAlert}>
										<label>
											System for the alert: {this.state.systems[this.selection]}<br/>
											New Alert Name:
											<input type="text" placeholder="Alert Name" onChange={this.handleAlertName} />							
											<br></br>
											Field for the alert:
											<select value={this.state.field} onChange={this.handleField}>
												<option value={''}>{'Select a field'}</option>;
												<option value={'sizeTiB'}>{'Size in Terabytes'}</option>;
												<option value={'freeTiB'}>{'Free space in Terabytes'}</option>;
												<option value={'freePct'}>{'Free space as a percent'}</option>;
												<option value={'failedCapacityTiB'}>{'Failed amount in Terabytes'}</option>;
												<option value={'cpuAvgMax'}>{'Average maximum CPU usage'}</option>;
												<option value={'dataRateKBPSAvg'}>{'Data rate in KBPS'}</option>;
												})}
											</select>
							
											<br></br>
											Threshold: <input type="number" placeholder="Enter a number" onChange={this.handleThreshold} />
										</label>
						
										<br></br>
						
										<input type="submit" value="Save Alert" />
									</form>
									<br></br>
						</div>
					</ReactShow>
					<ReactShow show={this.state.alertModify}>
						<div className="alertManager">
							<br></br>Modify goes here
						</div>
					</ReactShow>
					<ReactShow show={this.state.alertDelete}>
						<div className="alertManager">
							<br></br>
								<form onSubmit={this.handleDeleteAlert}>
									System for the alert: {this.state.systems[this.selection]}
									<br></br>
									Alert to be deleted:
									<select value={this.state.delAlertName} onChange={this.handleDelAlertName}>
										{this.state.allAlerts[this.selection].map((e, key) => {
											return <option value={e}>{e}</option>;
										})}
									</select>
									<input type="submit" value="Delete Alert" />
							</form><br/>
							</div>
						</ReactShow>
				</div>
		<div className="leftSideStatus">
			{triggered(this.state.trigAlerts[this.selection], this.selection)}
		</div>
		<div className ="leftSideViewStatuses">
					<div className="statusInteriorBox">
						<b>Statuses:</b>
						{listStatuses(this.state.statuses[this.selection], idleLogo)}
						{/**{listAlerts(this.state.idleAlerts[this.selection], idleLogo)}
						We will be creating a listStatuses function which is effectively the same as list 
						alert just instead lists out the statuses.					
						**/}
					</div>
		</div>
		</ReactShow>
	</div>
	);
	}
	}

	export default App;