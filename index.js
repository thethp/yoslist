var yoplait = require('yoplait');
var config = require('./config.json');
var request = require('request');
console.log('Signing up: ' + config.yoUsername + ' with UDID: ' + config.udid);
yoplait.logIn(config.yoUsername,config.yoPassword,config.udid,function(err,yo) {
    if (err) {
	return console.log('Sign up failed! ', err);
    }
    
    var lastTime = 0;
    var newListing = false;
    setInterval(checkListings, 60000*config.interval);
    
    function checkListings() {
	console.log('Checking Listings');
	var listingURL = 'http://'+config.city+'.craigslist.org/jsonsearch/'+config.craigslistSearchType+'/?sale_date=-&maxAsk='+config.maxPrice;
	request(listingURL, function(err, res, body) {
	    if (!err && res.statusCode == 200) {
		var listings = JSON.parse(body)[0];
		for(var i = 0; i < listings.length; i++) {
		    if(listings[i].Longitude > config.locTopLeft[1] && listings[i].Longitude < config.locBottomRight[1] && listings[i].Latitude < config.locTopLeft[0] && listings[i].Latitude < config.locBottomRight[0] && listings[i].PostedDate > lastTime) {
			lastTime = listings[i].PostedDate;
			newListing = true;
		    }
		}
		if(newListing) {
		    sendOutYo();
		    newListing = false;
		}
	    }
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
