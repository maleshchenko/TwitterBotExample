var Twitter = require('twitter')
var config = require('./config.js')
var T = new Twitter(config)

// Set up your search parameters
var mentionParams = {
  q: '@nick130586',
  count: 1,
  result_type: 'recent',
  lang: 'en',
  screen_name: "nick130586"
}

var replyParams = {
  count: 1,
  lang: 'en',
  screen_name: "nick130586"
}

var usersToMention = '' //add usernames separated by whitespace, for example, '@POTUS @VP @StateDept'

//set up tweet time interval
var INTERVAL = 3 * 60 * 60 * 1000; // run every 3 hours

//set up array of tweets that can be randomly selected
var TWEETS_TO_REPLY = [
    " ",
    " ",
    " ",
    " ",
    " "
];

function findAndReplyToMention() {
	// Search for a recent tweet in English where nick130586 is mentioned and reply to it
  	T.get('search/tweets', mentionParams, function(err, data, response) {
    	// If there is no error, proceed
    	if (!err) {
    		var latestTweet = data.statuses[0]
      		console.log(latestTweet)
      		T.post('statuses/update', { in_reply_to_status_id: latestTweet.id_str, status: '@' + latestTweet.user.screen_name + ' ' + TWEETS_TO_REPLY[Math.floor(Math.random() * TWEETS_TO_REPLY.length)] + ' ' + usersToMention }, function(err, response) {
        		if (err) {
          			console.log(err[0].message)
        		} else {
          			let username = response.user.screen_name
          			let tweetId = response.id_str

          			console.log('Replied to ' + latestTweet.user.screen_name + ':')
          			console.log(latestTweet.text);
          			console.log('-----------------------------------------')
        		}
    		})
    	} else {
      		console.log(err)
    	}
  	})
}

function findAndReplyToTweet() {
	// Search for a recent tweet in English by nick130586 and reply to it
 	 T.get('statuses/user_timeline', replyParams, function(err, data, response) {
  		if (!err) {
			var latestTweet = data[0]
      		console.log(latestTweet)
			if (latestTweet.lang == 'en') {
				var createdAt = latestTweet.created_at
				var tweetDate = Date.parse(createdAt.replace(/( \+)/, ' UTC$1'))
				var now = Date.now();

				var hoursAgo = function dhm(ms) {
    				days = Math.floor(ms / (24 * 60 * 60 * 1000))
    				daysms = ms % (24 * 60 * 60 * 1000);
    				hours = Math.floor((daysms) / (60 * 60 * 1000))

    				return hours
    			}
            
    			if (hoursAgo(now - tweetDate) < 3) {
    				//reply only if the tweet is recent (our reply is likely to get more impressions in this case)
    				T.post('statuses/update', { in_reply_to_status_id: latestTweet.id_str, status: '@' + latestTweet.user.screen_name + ' ' + TWEETS_TO_REPLY[Math.floor(Math.random() * TWEETS_TO_REPLY.length)] + ' ' + usersToMention }, function(err, response) {
    					if (err) {
              				console.log(err[0].message)
            			} else {
              				console.log('Replied to nick130586:')
              				console.log(latestTweet.text)
              				console.log('-----------------------------------------')
            			}
    				})
    			}
    		} 
		} else {
			console.log(err)
  		} 
 	})
}

function BotStart() {
	findAndReplyToMention()
	findAndReplyToTweet()
}

// Start bot and timer
BotStart();
setInterval(BotStart, INTERVAL);
