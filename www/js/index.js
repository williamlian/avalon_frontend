/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    APP_NAME: 'Avalon',

    service: null,

    homeView: null,

    // Application Constructor
    initialize: function() {
        this.service = new AvalonService();
        this.service.initialize().done(this.bindEvents());
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
    },

    _initApp: function() {
        // navigator.StatusBar.overlaysWebView( false );
        // navigator.StatusBar.backgroundColorByHexString('#ffffff');
        // navigator.StatusBar.styleDefault();
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
    },

    _initTemplates: function() {
        HomeView.prototype.template = Handlebars.compile($("#home-tpl").html());
        ReadyView.prototype.template = Handlebars.compile($("#ready-tpl").html());
        CharacterView.prototype.template = Handlebars.compile($("#character-tpl").html());
    },

    _initRouter: function() {
        var self = this;
        router.addRoute('', function() {
            $('body').html(new HomeView(self.service).render().$el);
        });
        router.start();
    },
};
