var mongoose = require("mongoose");
var user = require("./user");


mongoose.connect("mongodb://localhost/test2");

var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function(){
    console.log("we are connected!");
});

function get_All_Usernames(){
    return user.find({}).select("username");
}

function get_All_Systems(username){
    return user.findOne({'username': username}).select("systems");
}

function get_All_Systems_Names(username){
    return user.findOne({'username': username}, {"systems.companyName":1});
}

function get_All_Alert_Names(username){
    return user.findOne({"username": username}).select("alerts.alertName");
}

function get_All_Alerts(username){
    return user.findOne({'username': username}).select("alerts");
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

function create_Alert(username, name, threshold, field, systemSerial){
    const newAlert = {
	"alertName": name,
	"alertThreshold": threshold,
	"alertField": field,
	"systemSerial": systemSerial
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

function delete_Alert(username, alertName){
    return user.update({"username": username}, {$pull : {"alerts": {"alertName": alertName}}});
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

module.exports = {get_All_Systems, get_All_Alerts, create_Alert, change_Alert, add_User,get_All_Systems_Names,create_System, delete_Alert, get_System, delete_System} 