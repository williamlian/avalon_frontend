var QuestView = function() {
    this.service = app.service;

    this.initialize = function() {
        var self = this;

        self.$el = $('<div/>');
        self.service.status(app.player_id).done(function(response) {
            if(!response.player.is_knight) {
                console.log('not knight, go back to game view');
                window.location = '#game';
            } else {
                self.response = response;
                self.render();
            }
        });
    };

    this.render = function() {
        var self = this;
        for(i in self.response.group.players) {
            player = self.response.group.players[i];
            player.character = CharacterPresenter.present(player.character);
        }
        this.$el.html(self.template(self.response));
        $('#success', self.$el).on('click', self, self.success);
        $('#fail', self.$el).on('click', self, self.failed);
        return self;
    };

    this.success = function(event) {
        var self = event.data;
        self.service.questResult(self.response.group.id, self.response.player.id, true).done(function(response) {
            if(response.success) {
                window.location = '#game'
            } else {
                window.alert("Error: " + response.message);
            }
        })
    };

    this.failed = function(event) {
        var self = event.data;
        self.service.questResult(self.response.group.id, self.response.player.id, false).done(function(response) {
            if(response.success) {
                window.location = '#game'
            } else {
                window.alert("Error: " + response.message);
            }
        })
    }

    this.initialize();
};
