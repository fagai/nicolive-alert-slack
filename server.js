"use strict";

require('dotenv').config({silent: true}); // dotenv load

const SLACK_POST_CHANNEL = '#' + process.env.SLACK_POST_CHANNEL;

var SlackWebClient = require('slack-client').WebClient;
var web = new SlackWebClient(process.env.SLACK_API_TOKEN);

var domain = require('domain');
var d = domain.create();

d.on('error', function(err) {
    console.log('error: '+ err);
});

var async = require('async');

var NicoLiveAlert = require('./lib/NicoLiveAlert');
var NicoLiveAlertChatParser = require('./lib/NicoLiveAlertChatPaser');

async.waterfall([
  function(next) {
    NicoLiveAlert.login(process.env.NICONICO_LOGIN_MAIL, process.env.NICONICO_LOGIN_PASS, function(err, ticket) {
      next(err, ticket);
    });
  },
  function(ticket, next) {
    NicoLiveAlert.getAlertStatus(ticket, function(err, alert_status) {
      next(err, alert_status);
    });
  },
  function(alert_status, next) {
    NicoLiveAlert.connectCommentServer(alert_status, function(err, socket) {

      if(err) { next(err) }

      socket.on('connect', function() {
        console.log('connect alert server.');
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

    });
  }
], d.intercept(function(result){

}));
