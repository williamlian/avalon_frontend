var GameView = function() {
    this.group = null;
    this.player = null;
    this.service = app.service;
    this.stopRefresh = false;

    this.initialize = function () {
        var self = this;
        self.$el = $('<div/>');
        self.service.status(app.player_id).done(function(response) {
            self.group = response.group;
            self.player = response.player;
            self.refresh({data: self});
        });
    };

    this.scheduleNextRefresh = function() {
        var self = this;
        if(self.stopRefresh) {
            return;
        }
        // make sure the view is still attached
        if($('body .game-view').length > 0 ) {
            app.refresher = window.setTimeout(function () {
                self.refresh({data: self});
            }, app.REFRESH_PERIOD);
        } else {
            console.log('game view not attached, not refreshing any more');
        }
    };

    this.refresh = function(event) {
        var self = event.data;
        self.service.status(app.player_id).done(function(response) {
            if (response.group == null) {
                console.log('group is gone');
                window.location = '#home';
                return;
            }
            if (response.group.status == 'voting') {
                console.log('start voting view');
                window.location = '#vote';
                return;
            } else if(response.group.status == 'quest' && response.player.status == 'quest') {
                console.log('start quest view');
                window.location = '#quest';
                return;
            } else {
                self.render(response);
            }
        });
        console.log("game view refreshed");
    };

    this.render = function(response) {
        var self = this;
        self.$el.off('click');
        response["can_choose_knights"] = (response.group.status == 'started' && response.player.is_king)
        for(i in response.group.players) {
            player = response.group.players[i];
            player.character = CharacterPresenter.present(player.character);
        }
        this.$el.html(this.template(response));
        $('#quit').on('click', this, this.quit);
        $('#king').on('click', this, this.king);
        this.scheduleNextRefresh();
        return this;
    };

    this.king = function(event) {
        var self = event.data;
        self.$el.off('click');
        window.clearTimeout(app.refresher);
        self.stopRefresh = true;
        window.location = '#king';
    }

    this.quit = function(event) {
        var self = event.data;
        self.service.quit(app.player_id).done(function() {
            window.clearTimeout(app.refresher);
            self.stopRefresh = true;
            app.savePlayerId(0);
            window.location = '#home';
        });
    };

    this.initialize();
};
