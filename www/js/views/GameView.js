var GameView = function() {
    this.group = null;
    this.player = null;
    this.service = app.service;

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
        app.refresher = window.setTimeout(function() {
            self.refresh({data: self});
        }, 2000);
    };

    this.refresh = function(event) {
        var self = event.data;
        self.service.status(app.player_id).done(function(response) {
            self.$el.off('click');
            self.render(response);
        });
        console.log("game view refreshed");
    };

    this.render = function(response) {
        this.$el.html(this.template(response));
        $('#quit').on('click', this, this.quit);
        this.scheduleNextRefresh();
        return this;
    };

    this.quit = function(event) {
        var self = event.data;
        self.service.quit(app.player_id).done(function(response) {
            window.clearTimeout(app.refresher);
            app.savePlayerId(0);
            window.location = '#home';
        });
    }

    this.initialize();
};
