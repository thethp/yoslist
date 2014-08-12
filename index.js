var yoplait = require('yoplait');
var config = require('./config.json');
var http = require('http');

console.log('Signing up: ' + config.yoUsername + ' with UDID: ' + config.udid);
yoplait.logIn(config.yoUsername,config.yoPassword,config.udid,function(err,yo) {
    if (err) {
	return console.log('Sign up failed! ', err);
    }

    setInterval(checkListings, 60*config.interval);
    
    function checkListings() {
	console.log('Checking Listings');
	var listingURL = 'http://'+config.city+'.craigslist.org/jsonsearch/sub/?sale_date=-&maxAsk='+config.maxPrice;
	http.get(listingURL, function(res) {
	    res.on('data', function(data) {
		var listingArr = data[0];
		console.log(listingArr);
		//sendOutYo();
	    });
	});
    }

    function sendOutYo() {
	console.log('Yo-ing user');
	yo.sendYo(config.yoToAccount, function(err) {
	    if (err) {
		console.log('nogo on the yo: ', err);
	    } else {
		console.log('YO');
	    }
	});
    }
});
