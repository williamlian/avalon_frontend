var KingView = function() {

    this.response = null;
    this.service = app.service;

    this.initialize = function() {
        var self = this;

        self.$el = $('<div/>');
        self.service.status(app.player_id).done(function(response) {
            if(!response.player.is_king) {
                console.log('not king, go back to game view');
                window.location = '#game';
            }
            self.response = response;
            self.render();
        });
    };

    this.render = function() {
        var self = this;
        this.$el.html(self.template(self.response));
        $('#start-vote').on('click', this, this.startVote);
        $('.knight').each(function() {
            var knight = $(this);
            console.log('adding listener to voter ' + knight.attr('name'));
            knight.on('toggle', self, self.onToggle);


            //hack
            knight.on('click', self, function(event){
               $('.toggle', event.currentTarget).each(function() {
                   $(this).addClass('active')
               })
            });
        });
        return this;
    };

    this.onToggle = function(event) {
        var toggle = $(event.target);
        var view = event.data;
        if (toggle.hasClass('toggle') || toggle.hasClass('toggle-handle')) {
            view = event.data;
            console.log('toggle: ' + $(event.currentTarget).attr('name'))
            view.updateCount();
        }
    };

    this.updateCount = function() {
        var len = $('.toggle.active', this.$el).length;
        $('#knight-count').html(len);
    };

    this.startVote = function(event) {
        var self = event.data;
        var knights = [];
        $('.toggle.active', this.$el).each(function() {
            var toggle = $(this);
            var listItem = toggle.parent('.knight')
            knights.push(listItem.attr('name'));
        })
        console.log("King chose " + knights);
        self.service.startVote(self.response.group.id, app.player_id, knights).done(function(response) {
            console.log("response from start vote " + JSON.stringify(response))
            if (response.success) {
                $(self.$el).off('click');
                window.location = '#game';
            } else {
                window.alert("Error: " + response.message);
            }
        });
    };

    this.initialize();
};
