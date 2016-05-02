var VoteView = function() {

    this.response = null;
    this.service = app.service;
    this.refresher = 0;
    this.stopRefresh = false;

    this.initialize = function() {
        this.$el = $('<div/>');
        this.refresh();
    };

    this.refresh = function() {
        var self = this;
        if(self.stopRefresh) {
            return;
        }
        self.service.status(app.player_id).done(function (response) {
            if (response.group.status != "voting") {
                console.log('no longer voting mode, go back game view');
                this.stopRefresh = true;
                window.clearTimeout(self.refresher);
                window.location = '#game';
            } else {
                self.response = response;
                self.render();
                console.log('vote view refreshed');
            }
        });
    };

    this.render = function() {
        var self = this;
        var player = self.response.player;
        var group = self.response.group;

        self.$el.off('click');
        self.response["is_voting"] = (player.last_vote == null);
        self.response["show_start"] = (group.last_vote_result == true && player.is_king);
        self.response["show_skip"] = (group.last_vote_result == false && player.is_king);
        self.response["show_voter"] = (
            player.last_vote != null && !player.is_king ||
            player.last_vote != null && player.is_king && group.last_vote_result == null
        );
        self.response["vote_result"] = (group.last_vote_result == null ? "N/A" : (group.last_vote_result ? 'Accepted' : 'Rejected'));
        self.$el.html(self.template(self.response));

        $('#start-quest', self.$el).on('click', self, self.startQuest);
        $('#end-turn', self.$el).on('click', self, self.endTurn);
        $('#accept', self.$el).on('click', self, self.accept);
        $('#reject', self.$el).on('click', self, self.reject);

        self.refresher = window.setTimeout(function() {
            self.refresh();
        }, 2000);

        return this;
    };

    this.startQuest = function(event) {
        var self = event.data;
        self.service.startQuest(self.response.group.id, self.response.player.id).done(function(response) {
            if(response.success) {

            } else {
                window.alert("Error: " + response.message);
            }
        });
    };

    this.endTurn = function(event) {
        var self = event.data;
        self.service.endTurn(self.response.group.id, self.response.player.id).done(function(response) {
            if(response.success) {

            } else {
                window.alert("Error: " + response.message);
            }
        });
    };

    this.accept = function(event) {
        var self = event.data;
        self.service.vote(self.response.group.id, app.player_id, true).done(function(response) {
           if(response.success) {

           } else {
               window.alert("Error: " + response.message);
           }
        });
    };

    this.reject = function(event) {
        var self = event.data;
        self.service.vote(self.response.group.id, app.player_id, false).done(function(response) {
            if(response.success) {

            } else {
                window.alert("Error: " + response.message);
            }
        });
    };

    this.initialize();
};
