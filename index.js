var yoplait = require('yoplait');
var config = require('config.json');

console.log('Signing up: ' + config.yoUsername + ' with UDID: ' + config.udid);
yoplait.login(config.yoUsername,config.yoPassword,yo.udid,function(err,yo) {
    if (err) {
	return console.log('Sign up failed! ', err);
    }

    console.log('Yo-ing thethp');
    yo.sendYo('THETHP', function(err) {
	if (err) {
	    console.log('nogo on the yo: ', err);
	} else {
	    console.log('YO THETHP');
	}
    }
});
