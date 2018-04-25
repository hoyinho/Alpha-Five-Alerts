var mongoose = require("mongoose");
var user = require("./user");


mongoose.connect("mongodb://localhost/test2");

var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function(){
    console.log("we are connected!");
	
    /* get_All_Systems("Hoyin").then(function(names){
	console.log(names);
    });*/
});

function get_All_Usernames(){
    return user.find({}).select("username");
}

function validate_Login(username, password){
    return user.aggregate([
	{"$match": {
	    "username": username,
	    "password": password
	}},
	{"$project": {
	    "_id": 0,
	    "username": 1
	}}
    ]);
}

function get_All_Systems(username){ //needs to return current value to compare against threshold
    return user.aggregate([ 
	{"$match": {
	    "username": username
	}},
	{"$unwind": "$systems" },
	{"$project": {
	    "_id": 0,
	    "systems":1
	}},
	{"$sort" :{
	    "systems.companyName": 1
	}}
    ]);
}

function get_All_Systems_Names(username){
    return user.aggregate([
	{"$match": {
	    "username": username
	}},
	{"$unwind": "$systems"},
	{"$project": {
	    "_id": 0,
	    "systems.companyName": 1
	}},
	{"$sort" : {
	    "systems.companyName": 1
	}}
    ]); 
}

function get_All_Alert_Names(username){
    return user.findOne({"username": username}).select("alerts.alertName");
}

function get_All_Alerts(username){
    return user.aggregate([ 
	{"$match": {
	    "username": username
	}},
	{"$unwind": "$alerts" },
	{"$project": {
	    "_id": 0,
	    "alerts":1
	}},
	{"$group" : {
	    _id: "$alerts.systemName",
	    alerts: { $addToSet: "$alerts"}
	}},
	{"$sort" :{
	    "alerts.systemName": 1
	}}
    ]);
	    
}

function create_System(username, serial, name, model, fullM, os, update, sizeT, freeT, freeP, freePZP, failed, cpu, dataR){
    const newSystem = {
	"serialnumberInserv": serial,
	"companyName": name,
	"model": model,
	"fullModel": fullM,
	"osVersion": os,
	"updated" : update,
	"capacity": {
	    "sizeTiB": sizeT,
	    "freeTiB": freeT,
	    "freePct": freeP,
	    "freePctZeroPredictedDate": freePZP,
	    "failedCapacityTiB": failed
	},
	"nodes": {
	    "cpuAvgMax": cpu
	},
	"Performance" : {
	    "dataRateKBPSAvg": dataR
	}
    }
    return user.update({"username": username}, { $push: {systems: newSystem}});
}

function create_Alert(username, name, threshold, field, systemName){
    const newAlert = {
	"alertName": name,
	"alertThreshold": threshold,
	"alertField": field,
	"systemName": systemName
    }
    return user.update({"username": username}, { $push: {alerts: newAlert}});
};

function change_Alert(username, name, alertFields){
    return user.update({"username": username, "alerts.alertName": name}, {"alerts.$": alertFields} );
}

function add_User(username, password){
    const newUser = new user({
	username: username,
	password: password,
	systems: [],
	alertIDs: []
    });
    return newUser.save();
}

function delete_Alert(username, alertName, systemName){
    return user.update({"username": username}, {$pull : {"alerts": {"alertName": alertName, "systemName": systemName}}});
}

function delete_System(username, systemSerial){
    return user.update({"username": username}, {$pull: {"systems": {"serialnumberInserv": systemSerial}}});
}

function get_System(username, systemSerial){
    return user.findOne({"username": username, "systems.serialnumberInserv": systemSerial}).select("systems.$");
}

function clear_DB(){
    user.remove({}).then(function(confirmation){
	console.log(confirmation);
    });
}

module.exports = {validate_Login, get_All_Systems, get_All_Alerts, create_Alert, change_Alert, add_User,get_All_Systems_Names,create_System, delete_Alert, get_System, delete_System, get_All_Usernames, get_All_Alert_Names, clear_DB} 
