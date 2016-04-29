var AvalonService = function() {
    var url;

    this.initialize = function(serviceURL) {
        url = serviceURL ? serviceURL : "http://williamlian.com:8080";
        var deferred = $.Deferred();
        deferred.resolve();
        return deferred.promise();
    }

    this.create = function(size) {
        return $.ajax({
            url: url + "/group", 
            method: "POST", 
            data: JSON.stringify({size: size}),
            contentType: "application/json"
        });
    }

    this.getCharacters = function() {
        return $.ajax({
            url: url + "/characters",
            method: "GET"
        });
    }

    this.join = function(group_id) {
        return $.ajax({
            url: url + "/group/" + group_id + "/join", 
            method: "POST"
        });
    }

    this.ready = function(player) {
        return $.ajax({
            url: url + "/group/" + player.group_id + "/ready", 
            method: "POST", 
            data: JSON.stringify({player_id: player.id, name: player.name, photo: ''}),
            contentType: "application/json"
        });
    }

    this.toString = function() {
        return "Avalon service @ " + url;
    }
}