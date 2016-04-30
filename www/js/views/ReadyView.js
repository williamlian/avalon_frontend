var ReadyView = function(service, response) {
	this.player = response.player;
    this.service = service;

    this.initialize = function () {
        this.$el = $('<div/>');
        this.render();
    }

    this.render = function() {
        this.$el.html(this.template(response));
        $('.btn#ready', this.$el).on('click', this, this.ready);
        return this;
    };

    this.ready = function(event) {
    	var self = event.data;
    	var name = $('input#name', self.$el).val();
    	self.player.name = name;

    	promise = view.service.ready(self.player);
        promise.done(function(response) {
            console.log("response from ready " + JSON.stringify(response))
            if (response.success) {
                gameView = new GameView(response.group, response.player, self.service);
                $('body').html(gameView.$el);
            } else {
                window.alert("Error: " + response.message)
            }
        });
    	return false;
    };

    this.initialize();
};
