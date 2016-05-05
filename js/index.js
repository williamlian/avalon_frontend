var app = {
    APP_NAME: 'Avalon',
    COOKIE_ID: 'Avalon-Player-Id',
    REFRESH_PEROID: 1500,

    service: null,
    player_id: 0,
    refresher: 0,

    getPlayerId: function() {
        var name = app.COOKIE_ID + "=";
        var ca = document.cookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length,c.length);
            }
        }
        return null;
    },

    savePlayerId: function(id) {
        cookie = app.COOKIE_ID + "=" + id;
        app.player_id = id;
        console.log('setting cookie: ' + cookie);
        document.cookie = cookie;
    }
};

(function() {

    // Application Constructor
    this.initialize = function() {
        var self = this;
        window.refresher = null;
        app.service = new AvalonService();
        app.service.initialize("http://avalon.williamlian.com/api/").done(self.bindEvents());
        console.log('initializing service');
    };

    // global react call
    this.getStatus = function() {
        app.player_id = app.getPlayerId();
        console.log('saved player id = ' + app.player_id);
        app.service.status(app.player_id).done(function(response) {
            console.log('status response: ' + JSON.stringify(response));
            if(response.success) {
                if (response.group == null) {
                    console.log('player does not in game');
                    window.location = '#home';
                } else if (response.group.status == 'created' && response.player.is_admin) {
                    console.log('owner rejoin to ready mode');
                    window.location = '#character';
                } else if (response.group.status == 'open') {
                    if (response.player.status == 'created') {
                        console.log('group open user not ready');
                        window.location = '#ready';
                    } else {
                        console.log('group open user ready');
                        window.location = '#game';
                    }
                } else if(response.group.status == 'voting') {
                    console.log('group in voting mode');
                    window.location = '#vote'
                } else if(response.group.status == 'started') {
                    console.log('game started');
                    window.location = '#game';
                } else if (response.group.status == 'quest') {
                    console.log('group is doing quest');
                    window.location = '#game';
                } else {
                    console.log('player status unknown');
                    window.clearInterval(window.refresher);
                    window.location = '#home';
                }
            } else {
                window.alert("Error: " + response.message);
            }
        })
    };

    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents = function() {
        var self = this;
        console.log('service initialized, service=' + app.service)
        document.addEventListener('deviceready', function(){
            self.onDeviceReady();
        }, false);
    };
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady = function() {
        this._initApp();
        this._initTemplates();
        this._initRouter();
        this.getStatus();
    };

    _initApp = function() {
        window.isMobile = function() {
            var check = false;
            (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
            return check;
        }
        try {
            StatusBar.overlaysWebView( false );
            StatusBar.backgroundColorByHexString('#ffffff');
            StatusBar.styleDefault();
        }
        catch(err) {
            console.log(err.message);
        }
        if (navigator.notification) {
            window.alert = function (message) {
                navigator.notification.alert(
                    message,
                    null,
                    app.APP_NAME,
                    'OK'
                );
            };
        }
        FastClick.attach(document.body);
        
        console.log('init app done')
    };

    _initTemplates = function() {
        HomeView.prototype.template = Handlebars.compile($("#home-tpl").html());
        ReadyView.prototype.template = Handlebars.compile($("#ready-tpl").html());
        CharacterView.prototype.template = Handlebars.compile($("#character-tpl").html());
        GameView.prototype.template = Handlebars.compile($("#game-tpl").html());
        KingView.prototype.template = Handlebars.compile($("#king-tpl").html());
        VoteView.prototype.template = Handlebars.compile($("#vote-tpl").html());
        QuestView.prototype.template = Handlebars.compile($("#quest-tpl").html());

        HomeView.prototype.newTemplate = Handlebars.compile($("#new-subtpl").html());
        HomeView.prototype.joinTemplate = Handlebars.compile($("#join-subtpl").html());
    };

    _initRouter = function() {
        router.addRoute('home', function() {
            $('body').html(new HomeView().$el);
        });
        router.addRoute('character', function() {
            $('body').html(new CharacterView().$el);
        });
        router.addRoute('ready', function() {
            $('body').html(new ReadyView().$el);
        });
        router.addRoute('game', function() {
            $('body').html(new GameView().$el);
        });
        router.addRoute('king', function() {
            $('body').html(new KingView().$el);
        });
        router.addRoute('vote', function() {
            $('body').html(new VoteView().$el);
        });
        router.addRoute('quest', function() {
            $('body').html(new QuestView().$el);
        });

        router.start();
    };



    this.initialize();
}());
