var good =  require('./imgs/PerformingProperly.png');
var bad = require('./imgs/TriggeredAlert.png');
var none = require('./imgs/noneSelected.png');
var React = require('react');

export function triggered(arrTrig, index){
  if(index===0){
	  return <img src={none} height="20%" width="40%" alt="Nothing is happening"/>;
  }
  if (arrTrig.length===0) {
	 return <img src={good} height="20%" width="40%" alt="Nothing it happening, or only good things are happening"/>;
  }
	return <img src={bad} height="20%" width="40%" alt="Things are happening that might not be good"/>;
}
export function listAlerts(list, bullet){
	if(list.length===0){
		return <ul><li key={ 0 }> {<b><img src={bullet} height="16" width="16" alt="fancy bullet points"/>{ "\xa0\xa0\xa0\xa0No alerts to display"}</b>}</li></ul>;
	}
	var alertList = list.map(function(name, index){
		return <li key={ index }> {<b><img src={bullet} height="16" width="16" alt="fancy bullet points"/>{ "\xa0\xa0\xa0\xa0"+ name}</b>}</li>;
	})
	return <ul>{alertList}</ul>;
}

export function listStatusesLeft(list, bullet){
	if(list.length===0){
		return <ul><li key={ 0 }> {<b><img src={bullet} height="16" width="16" alt="fancy bullet points"/>{ "No statuses to display"}</b>}</li></ul>;
	}
	var alertList = list.map(function(name, index){
		if(index>0){
			return <li key={ index }> {<b><img src={bullet} height="16" width="16" alt="fancy bullet points"/>{ "\xa0" + name[0]}</b>}</li>;
		}
		else{
			return "";	
		} 
	})
	return <ul>{alertList}</ul>;
}
export function listStatusesRight(list, bullet){
	if(list.length===0){
		return <ul><li key={ 0 }> {<b><img src={bullet} height="16" width="16" alt="fancy bullet points"/>{ "\xa0\xa0\xa0\xa0No alerts to display"}</b>}</li></ul>;
	}
	var alertList = list.map(function(name, index){
		if(index>0){
			return <li key={ index }> {<b>{ "\xa0\xa0\xa0\xa0"+ name[1]+"\xa0\xa0\xa0"}</b>}</li>;
		}
		else{
			return "";	
		} 
	})
	return <ul>{alertList}</ul>;
}