var AvalonService = function() {
    var url;

    this.initialize = function(serviceURL) {
        url = serviceURL ? serviceURL : "http://williamlian.com:8080";
        var deferred = $.Deferred();
        deferred.resolve();
        return deferred.promise();
    };

    this.create = function(size) {
        return $.ajax({
            url: url + "/group", 
            method: "POST", 
            data: JSON.stringify({size: size}),
            contentType: "application/json"
        });
    };

    this.getCharacters = function() {
        return $.ajax({
            url: url + "/characters",
            method: "GET"
        });
    };

    this.updateCharacters = function(group, player, characters) {
        return $.ajax({
            url: url + "/group/" + group.id + "/characters",
            method: "POST",
            data: JSON.stringify({player_id: player.id, characters: characters}),
            contentType: "application/json"
        });
    };

    this.join = function(group_id) {
        return $.ajax({
            url: url + "/group/" + group_id + "/join", 
            method: "POST"
        });
    };

    this.ready = function(player) {
        return $.ajax({
            url: url + "/group/" + player.group_id + "/ready", 
            method: "POST", 
            data: JSON.stringify({player_id: player.id, name: player.name, photo: ''}),
            contentType: "application/json"
        });
    };

    this.startVote = function(group_id, player_id, knights) {
        return $.ajax({
            url: url + "/group/" + group_id + "/start_vote",
            method: "POST",
            data: JSON.stringify({player_id: player_id, knights: knights}),
            contentType: "application/json"
        });
    };

    // vote: boolean
    this.vote = function(group_id, player_id, vote) {
      return $.ajax({
          url: url + "/group/" + group_id + "/vote",
          method: "POST",
          data: JSON.stringify({player_id: player_id, vote: vote}),
          contentType: "application/json"
      }) ;
    };

    this.startQuest = function(group_id, player_id) {
      return $.ajax({
          url: url + "/group/" + group_id + "/start_quest",
          method: "POST",
          data: JSON.stringify({player_id: player_id}),
          contentType: "application/json"
      })
    };

    this.endTurn = function(group_id, player_id) {
        return $.ajax({
            url: url + "/group/" + group_id + "/end_turn",
            method: "POST",
            data: JSON.stringify({player_id: player_id}),
            contentType: "application/json"
        })
    };

    this.status = function(player_id) {
        return $.ajax({
            url: url + "/status",
            method: "GET",
            data: {player_id: player_id}
        });
    };

    this.quit = function(player_id) {
        return $.ajax({
            url: url + "/player/" + player_id,
            method: "DELETE"
        });
    };

    this.questResult = function(group_id, player_id, questResult) {
        return $.ajax({
            url: url + "/group/" + group_id + '/submit_quest',
            method: "POST",
            data: JSON.stringify({player_id: player_id, quest_result: questResult}),
            contentType: "application/json"
        });
    }

    this.toString = function() {
        return "Avalon service @ " + url;
    };
}