import React, { Component } from 'react';
import './App.css';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import logo from './imgs/alphaFiveBWCircle.png'
import good from './imgs/PerformingProperly.png'
import bad from './imgs/TriggeredAlert.png'




function triggered(){
  const triggered = false;
  if (triggered) {
    return <img src={bad} height="20%" width="40%" />;
  }
  return <img src={good} height="20%" width="40%"/>;
}

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
  }

  handleChange(event) {
    this.setState({value: event.target.value});
	this.name=this.state.value;
  }

  handleSubmit(event) {
	  {/*alert('You have selected: ' + this.state.value);*/}
     this.name=this.state.value;
	
	event.preventDefault();
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
					<br></br>
					<img src={logo} height="120" width="120" />
				</div>
				
				
				<div className="currSys">
					<p>System Name: {this.name}</p>
					
				</div>
				
				<div className="NONSENSE"> </div>
				
				<div className="logOut">
					<p>Logout</p>
				</div>
				
				{/*<div className="separationLine"><br></br></div>*/}
				
				<div className="leftSide">
					
					<form onSubmit={this.handleSubmit}>
						<label>
						<br></br>Choose Which System to Monitor:
						<select value={this.state.value} onChange={this.handleChange}>
							<option value="None">Select a System</option>
							<option value="Zach's System">Zach's System</option>
							<option value="Elise's System">Elise's System</option>
							<option value="Jeff's System">Jeff's System</option>
							<option value="Neena's System">Neena's System</option>
						</select>
						</label>
						<input type="submit" value="Submit" />
						
					</form>
					<br></br>
				</div>
				<div className="rightSide">
					<p>Currently Triggerred Alerts</p>
					<br></br>
				</div>
				<div className="leftSideStatus">
				{triggered()}
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
