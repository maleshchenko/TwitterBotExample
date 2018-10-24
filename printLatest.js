var Twitter = require('twitter')
var config = require('./config.js')
var T = new Twitter(config)

var searchParams = {
    count: 10,
    result_type: 'recent',
    screen_name: 'realDonaldTrump',
}

function fetch_latest() {
	T.get('statuses/user_timeline', searchParams, function(err, data, response) {
        if (!err) {
            for (var j = 0; j < data.length; j++) {
                if (!data[j].retweeted_status) {
                    console.log(data[j].text)
                }
            }
    	} else {
    		console.log(err)
    	}
    })
}

function BotStart() {
	fetch_latest()
}

// Start bot and timer
BotStart()
