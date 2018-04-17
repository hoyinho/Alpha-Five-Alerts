var mongoose = require("mongoose");
var user = require("./user");


mongoose.connect("mongodb://localhost/test2");

var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function(){
    console.log("we are connected!");
    get_System_Field("Hoyin", '6500228', "nodes.cpuAvgMax").then(function(field){
	console.log(field);
    });
});

function get_All_Systems(username){
    return user.findOne({'username': username}).select("systems");
}

function get_All_Alerts(username){
    return user.findOne({'username': username}).select("alerts");
};

function create_Alert(username, name, threshold, field){
    const newAlert = {
	"alertName": name,
	"alertThreshold": threshold,
	"alertField": field
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

function get_System_Field(username, systemSerial, field){
    return user.findOne({"username": username, "systems.serialnumberInserv": systemSerial}).select("systems." + field);
}

