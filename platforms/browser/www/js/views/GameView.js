var GameView = function(group, player, service) {
    this.group = group;
    this.player = player;
    this.service = service;

    this.initialize = function () {
        this.$el = $('<div/>');
        this.refresh({data: this});
    }

    this.refresh = function(event) {
        var self = event.data;
        self.service.playerView(self.group, self.player).done(function(response) {
            self.render(response);
        })
    }

    this.render = function(response) {
        this.$el.html(this.template(response));
        $('#refresh').on('click', this, this.refresh);
    };

    this.initialize();
};
