var Twitter = require('twitter');
var config = require('./config.js');
var T = new Twitter(config);

// Set up your search parameters
var params = {
  q: '@nick130586',
  count: 1,
  result_type: 'recent',
  lang: 'en'
}

//set up tweet time interval
var INTERVAL = 3*60*60*1000; // run every 3 hours

//set up array of tweets that can be randomly selected
var TWEETS_TO_REPLY = [
    " ",
    " ",
    " ",
    " ",
    " "
];

function BotStart() {
  // Initiate your search using the above paramaters
  T.get('search/tweets', params, function(err, data, response) {
    // If there is no error, proceed
    if (!err) {
      // Loop through the returned tweets
      for (let i = 0; i < data.statuses.length; i++) {
          T.post('statuses/update', { in_reply_to_status_id: data.statuses[0].id_str, status: '@' + data.statuses[0].user.screen_name + ' ' + TWEETS_TO_REPLY[Math.floor(Math.random() * TWEETS_TO_REPLY.length)]}, function(err, response) {
            if (err) {
              console.log(err[0].message);
            }
            else {
              let username = response.user.screen_name;
              let tweetId = response.id_str;

              console.log('Tweeted: ', `https://twitter.com/${username}/status/${tweetId}`);
              console.log(data.statuses[i]);
              console.log('-----------------------------------------');
            }
          });
      }
    } else {
      console.log(err);
    }
  })
}

// Start bot and timer
BotStart();
setInterval(BotStart, INTERVAL);