"use strict";

require('dotenv').config(); // dotenv load

const SLACK_POST_CHANNEL = '#' + process.env.SLACK_POST_CHANNEL;

var SlackWebClient = require('slack-client').WebClient;
var web = new SlackWebClient(process.env.SLACK_API_TOKEN);

var domain = require('domain');
var d = domain.create();

d.on('error', function(err) {
    console.log('error: '+ err);
});

// TODO SlackのチャンネルにBotがジョインしていなければJOINさせる

var NicoLiveAlert = require('./lib/NicoLiveAlert');
var NicoLiveAlertChatParser = require('./lib/NicoLiveAlertChatPaser');

NicoLiveAlert.login(process.env.NICONICO_LOGIN_MAIL, process.env.NICONICO_LOGIN_PASS, d.intercept(function(ticket) {
    NicoLiveAlert.getAlertStatus(ticket, d.intercept(function(alert_status) {
        NicoLiveAlert.connectCommentServer(alert_status, d.intercept(function(socket) {
            
            socket.on('connect', function() {
                
            });
            
            socket.on('data', function(data) {
                //console.log(data);
                
                var nico_live_alert_chat_parser = new NicoLiveAlertChatParser(data, alert_status.getCommunityIds());
                var in_community_ids = nico_live_alert_chat_parser.retriveInCommunityIds();
                if(!in_community_ids.length) {
                    return;
                }
                var live_ids = nico_live_alert_chat_parser.retriveLiveIds(in_community_ids);
                
                live_ids.forEach(function(live_id) {
                    var post_text = "[放送開始] http://live.nicovideo.jp/watch/lv" + live_id;
                    web.chat.postMessage(SLACK_POST_CHANNEL, post_text, {as_user: true}, d.intercept(function(response) {
                        //console.log(response);
                    }));
                });
                
            });
        }));
    }));
}));
