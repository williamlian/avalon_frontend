var ReadyView = function() {
	this.status = null;
    this.service = app.service;

    this.initialize = function () {
        var self = this;
        self.$el = $('<div/>');
        self.service.status(app.player_id).done(function(response){
            self.status = response;
            self.render();
        })
    }

    this.render = function() {
        this.$el.html(this.template(this.status));
        $('.btn#ready', this.$el).on('click', this, this.ready);
        return this;
    };

    this.ready = function(event) {
    	var self = event.data;
    	var name = $('input#name', self.$el).val();
    	var player = self.status.player;
        player.name = name;

    	promise = self.service.ready(player);
        promise.done(function(response) {
            console.log("response from ready " + JSON.stringify(response))
            if (response.success) {
                window.location = '#game'
            } else {
                window.alert("Error: " + response.message)
            }
        });
    	return false;
    };

    this.initialize();
};
