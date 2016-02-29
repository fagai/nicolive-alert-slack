"use strict"

var NicoLiveAlertStatus = function(status) {
    this.status = status;
}

NicoLiveAlertStatus.prototype = {
    getCommunityIds : function() {
        if(this.status.communities.hasOwnProperty('community_id')) {
            return this.status.communities.community_id;
        }
        return [];
    },
    getCommentServerData : function() {
        return this.status.ms;
    },
    getUserHash: function() {
        return this.status.user_hash;
    }
    
};

module.exports = NicoLiveAlertStatus;