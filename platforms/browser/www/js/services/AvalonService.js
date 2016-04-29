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
            url: url + '/group', 
            method: 'POST', 
            data: {'size': size}
        });
    }
}