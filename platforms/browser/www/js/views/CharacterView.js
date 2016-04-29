var CharacterView = function(service) {

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
		this.$el.html(this.template(characters));
		$('.btn#submit', this.$el).on('click', this, this.submit);
		return this;
	}

	this.submit = function(event) {
		self = event.data;
		return false;
	}

	this.initialize();
}