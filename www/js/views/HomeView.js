var HomeView = function(service) {

    this.service = service

    this.initialize = function () {
        this.$el = $('<div/>');
        this.render();
    };

    this.render = function() {
        this.$el.html(this.template());
        $('#create', this.$el).on('click', this.create)
        return this;
    };

    this.create = function() {
        this.service.create($('#size').val()).done(function(response) {
            console.log("response from create " + response)
            readyView = new ReadyView(service, response);
            $('body').html(readyView.render().$el);
        })
    };

    this.initialize();
};
