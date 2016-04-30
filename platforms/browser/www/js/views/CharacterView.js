var CharacterView = function(group, player, service) {
	this.group = group;
	this.player = player;
	this.service = service;

	this.initialize = function() {
		self = this;
		self.$el = $('<div />');
        service.getCharacters().done(function(response) {
        	if (response.success) {
        		self.render(response.characters);
			} else {
				window.alert("Error: " + response.message);
			}
        })
	}

	this.render = function(characters) {
		var self = this;
		this.$el.html(this.template(characters));
		$('.btn#submit', this.$el).on('click', this, this.submit);
		$('.character').each(function(i) {
			char = $(this);
			console.log('adding listener to chars ' + char.attr('name'));
			char.on('toggle', self, self.onToggle);
		});
		return this;
	}

	this.updateCount = function() {
		len = $('.toggle.active', this.$el).length;
		$('#select-count').html(len);
	}

	this.onToggle = function(event) {
		var toggle = $(event.target);
		var view = event.data;
		if (toggle.hasClass('toggle') || toggle.hasClass('toggle-handle')) {
			view = event.data;
			console.log('toggle: ' + $(event.currentTarget).attr('name'))
			view.updateCount();
		}
	}

	this.clearHandler = function() {
		this.$el.off('click');
		this.$el.off('toggle');
	}

	this.submit = function(event) {
		self = event.data;
		characters = [];
		$('.toggle.active', this.$el).each(function(i) {
			toggle = $(this);
			listItem = toggle.parent('.character')
			characters.push(listItem.attr('name'));
		})
		console.log(characters);
		promise = self.service.updateCharacters(self.group, self.player, characters);
		promise.done(function(response) {
			console.log("response from character " + JSON.stringify(response))
            if (response.success) {
                self.clearHandler();
                readyView = new ReadyView(self.service, response);
                $('body').html(readyView.$el);
            } else {
                window.alert("Error: " + response.message)
            }
		})
		return false;
	}

	this.initialize();
}