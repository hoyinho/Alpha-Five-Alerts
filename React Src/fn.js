import good from './imgs/PerformingProperly.png'
import bad from './imgs/TriggeredAlert.png'
import none from './imgs/noneSelected.png'
import React, { Component } from 'react';


export function triggered(bools, index){
  if(index=="0"){
	  return <img src={none} height="20%" width="40%" alt="Nothing is happening"/>;
  }
  if (bools[index]) {
	 return <img src={good} height="20%" width="40%" alt="Nothing it happening, or only good things are happening"/>;
    
  }
	return <img src={bad} height="20%" width="40%" alt="Things are happening that might not be good"/>;
}
export function listAlerts(list, bullet){
	var alertList = list.map(function(name, index){
		return <li key={ index }> {<b><img src={bullet} height="16" width="16" alt="it us!"/>{ "\xa0\xa0\xa0\xa0"+ name}</b>}</li>;
	})
	return <ul>{alertList}</ul>;
}
