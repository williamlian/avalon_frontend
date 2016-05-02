var app = {
    APP_NAME: 'Avalon',
    COOKIE_ID: 'Avalon-Player-Id',

    service: null,
    player_id: 0,
    refresher: 0,

    // global react call
    getStatus: function() {
        this.player_id = this.getPlayerId();
        console.log('saved player id = ' + this.player_id);
        this.service.status(this.player_id).done(function(response) {
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
    },

    // Application Constructor
    initialize: function() {
        window.refresher = null;
        this.service = new AvalonService();
        this.service.initialize("http://192.168.0.110:3000").done(this.bindEvents());
        console.log('initializing service');
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        console.log('service initialized, service=' + this.service)
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app._initApp();
        app._initTemplates();
        app._initRouter();
        app.getStatus();
    },

    _initApp: function() {
        console.log("init app, status bar = " + navigator.StatusBar)
        console.log("init app, window alert = " + navigator.notification)
        if (navigator.StatusBar) {
            navigator.StatusBar.overlaysWebView( false );
            navigator.StatusBar.backgroundColorByHexString('#ffffff');
            navigator.StatusBar.styleDefault();
            console.log('status bar set')
        }
        if (navigator.notification) {
            window.alert = function (message) {
                navigator.notification.alert(
                    message,
                    null,
                    APP_NAME,
                    'OK'
                );
            };
        }
        FastClick.attach(document.body);
        console.log('init app done')
    },

    _initTemplates: function() {
        HomeView.prototype.template = Handlebars.compile($("#home-tpl").html());
        ReadyView.prototype.template = Handlebars.compile($("#ready-tpl").html());
        CharacterView.prototype.template = Handlebars.compile($("#character-tpl").html());
        GameView.prototype.template = Handlebars.compile($("#game-tpl").html());
        KingView.prototype.template = Handlebars.compile($("#king-tpl").html());
        VoteView.prototype.template = Handlebars.compile($("#vote-tpl").html());
        QuestView.prototype.template = Handlebars.compile($("#quest-tpl").html());

        HomeView.prototype.newTemplate = Handlebars.compile($("#new-subtpl").html());
        HomeView.prototype.joinTemplate = Handlebars.compile($("#join-subtpl").html());
    },

    _initRouter: function() {
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
    },

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
    },
};
