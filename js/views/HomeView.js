var HomeView = function() {

    this.service = app.service;

    this.initialize = function () {
        window.clearTimeout(app.refresher);
        this.$el = $('<div/>');
        this.render();
    };

    this.render = function() {
        this.$el.html(this.template());
        this.renderNew({data:this});
        this.newTab = $('.control-item#new', this.$el);
        this.joinTab = $('.control-item#join', this.$el);

        this.newTab.on('click', this, this.renderNew);
        this.joinTab.on('click', this, this.renderJoin);
        return this;
    };

    this.clearHandler = function() {
        this.$el.off('click');
    }

    this.renderNew = function(event) {
        self = event.data
        $('.btn#join', self.$el).off();
        $('.content', self.$el).html(self.newTemplate());

        $('.control-item#new', self.$el).addClass('active');
        $('.control-item#join', self.$el).removeClass('active');
        $('.btn#create', self.$el).on('click', self, self.create);
    };

    this.renderJoin = function(event) {
        self = event.data
        $('.btn#create', self.$el).off('click');
        $('.content', self.$el).html(self.joinTemplate());

        $('.control-item#join', self.$el).addClass('active');
        $('.control-item#new', self.$el).removeClass('active');
        $('.btn#join', self.$el).on('click', self, self.join);
    };

    this.create = function(event) {
        view = event.data;
        promise = view.service.create(parseInt($('#size').val()));
        promise.done(function(response) {
            console.log("response from create " + JSON.stringify(response))
            if (response.success) {
                view.clearHandler();
                app.savePlayerId(response.player.id);
                window.location = '#character'
            } else {
                window.alert("Error: " + response.message)
            }
        });
        return false;
    };

    this.join = function(event) {
        view = event.data;
        promise = view.service.join(parseInt($('#group_id').val()));
        promise.done(function(response) {
            console.log("response from join " + JSON.stringify(response))
            if (response.success) {
                view.clearHandler();
                app.savePlayerId(response.player.id);
                window.location = '#ready'
            } else {
                window.alert("Error: " + response.message)
            }
        });
        return false;
    };

    this.initialize();
};
