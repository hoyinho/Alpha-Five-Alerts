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
	 	alertMan: false, 
	 	trigAlerts: [["Fetching alerts"]], 
	 	idleAlerts: [["Fetching alerts"]],
		statuses:[[["Fetching statuses",""]]],
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
		this.handleDelAlertName = this.handleDelAlertName.bind(this);
		this.handleDelSysName = this.handleDelSysName.bind(this);
		this.handleNewAlert = this.handleNewAlert.bind(this);
		this.handleSysName = this.handleSysName.bind(this);
		this.handleField = this.handleField.bind(this);
		this.handleAlertName = this.handleAlertName.bind(this);
		this.handleThreshold = this.handleThreshold.bind(this);
		this.handleDeleteAlert = this.handleDeleteAlert.bind(this);
		this.handleUser = this.handleUser.bind(this);
		this.handlePass = this.handlePass.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
		this.state.value = 0;
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
		.then(temp => {
			console.log(temp["username"]);
			this.setState({login:temp["username"]});
		})
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
			this.setState({alertMan:false});
			this.setState({ value: 0 });
			this.setState({ sysName: 0 });
			this.setState({ field: 0 });
			this.setState({ delAlertName: "------" });
			this.setState({ isLoggedIn:false});
			this.setState({ systems:[]});
			this.setState({ trigAlerts:[["Fetching alerts"]]});
			this.setState({ idleAlerts:[["Fetching alerts"]]});
			this.setState({ allAlerts:[[]]});
			this.setState({ login:""});
			this.setState({ statuses:[["Fetching statuses"]]});
			this.setState({ alertCreate: false});
			this.setState({ alertDelete: false});
			this.setState({ alertModify: false});
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
		for(var y = 0; y<this.state.allAlerts[this.state.value].length; y++){
			if(this.state.alertName===this.state.allAlerts[this.state.value][y]){
				this.repeatName=true;
			}
		}
		if(this.state.value=="0"){
			window.alert('Please select a system to create alerts');
		}
		else if(this.state.alertName==""){
			window.alert('Please enter an alert name');
		}
		else if(this.state.alertName=="------"||this.repeatName){
			window.alert('Please enter a different alert name');
			this.repeatName=false;
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
					sysName: this.state.systems[this.state.value]
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
		if(this.state.value=="0"){
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
					systemName: this.state.systems[this.state.value]
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
					Username: <input type="text" onChange={this.handleUser} placeholder="Your Username" className= "user"/>
					<br/>{"\xa0"/*Puts a space before the word password to make it align nice*/}Password: <input type="text" secureTextEntry={true} onChange={this.handlePass} placeholder="Your Password" className= "pass"/>
					<br/><input type="submit" value="Login" className= "form22" onClick={this.handleLogin}/>
				</form>
			</div>			
		</ReactShow>
			
		<ReactShow show={this.state.isLoggedIn}>
				<div className="currSys">
					<br/><form onSubmit={this.handleSubmit}>
						<label>
							Choose a system:
							<select value={this.state.value} onChange={this.handleChange}>
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
						{listAlerts(this.state.trigAlerts[this.state.value], triggeredLogo)}
					</div>
	
					<br></br>
	
					<div className="rightSideIdle">
						<b>Idle Alerts:</b>
						{listAlerts(this.state.idleAlerts[this.state.value], idleLogo)}
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
											System for the alert: {this.state.systems[this.state.value]}<br/>
											New Alert Name:
											<input type="text" placeholder="Alert Name" onChange={this.handleAlertName} />							
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
											Threshold: <input type="number" placeholder="Enter a number" onChange={this.handleThreshold} />
										</label>
						
										<br></br>
						
										<input type="submit" className="submitbutton" value="Save Alert" />
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
									System for the alert: {this.state.systems[this.state.value]}
									<br></br>
									Alert to be deleted:
									<select value={this.state.delAlertName} onChange={this.handleDelAlertName}>
										{this.state.allAlerts[this.state.value].map((e, key) => {
											return <option value={e}>{e}</option>;
										})}
									</select>
									<input type="submit" className="submitbutton" value="Delete Alert" />
							</form><br/>
							</div>
						</ReactShow>
				</div>
		<div className="leftSideStatus">
			{triggered(this.state.trigAlerts[this.state.value], this.state.value)}
		</div>
		<div className ="leftSideViewStatuses">
					<div className="statusInteriorBox">
						<div className="statusRight">
						<b>Values:{"\xa0\xa0\xa0\xa0\xa0\xa0"}</b>
						{listStatusesRight(this.state.statuses[this.state.value],statusLogo)}
						</div>
						<div className="statusLeft">
						<b>{"\xa0\xa0"}Statuses types:</b>
						{listStatusesLeft(this.state.statuses[this.state.value],statusLogo)}
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