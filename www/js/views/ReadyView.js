var ReadyView = function(service, response) {

    this.initialize = function () {
        this.$el = $('<div/>');
        this.render();
    }

    this.render = function() {
        this.$el.html(this.template(response));
        return this;
    };

    this.initialize();
};
