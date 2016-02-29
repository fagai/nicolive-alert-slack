"use strict";

class NicoLiveAlertChatParser {
    constructor(chatData ,community_ids) {
        this.chatData = chatData;
        this.community_ids = community_ids;
        this.cheerio = require('cheerio');
    }
    retriveInCommunityIds() {
        var input_ids = this.chatData.match(/((co|ch)\d+)/g); // コミュニティ番号抜き出し
        if(input_ids === null) return [];
        
        var ids = [];
        for(var i = 0; i < input_ids.length; i++) {
            // 指定しているコミュニティ一覧に存在するか
            var index = this.community_ids.indexOf(input_ids[i]);
            if(index !== -1) {
                ids.push(input_ids[i]);
            }
        }
        
        if(!ids.length) return [];
        return ids;
    }
    retriveLiveIds(community_ids) {
        var ids = [];
        var $ = this.cheerio.load(this.chatData);
        $('chat').each(function(index, elem) {
            var chat_values = $(elem).text().split(',');
            if(chat_values.length >= 2 && community_ids.indexOf(chat_values[1]) !== -1) {
                ids.push(chat_values[0]);
            }
        });
        return ids;
    }
}

module.exports = NicoLiveAlertChatParser;