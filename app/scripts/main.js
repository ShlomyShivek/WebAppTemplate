//http://blog.inlineblock.com/blog/2013/06/06/using-requirejs-with-angular/

'use strict';

require.config({
    baseUrl:'scripts',
    paths:{
        text:'lib/require/text',
        jquery: 'http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min',
        jqueryUI: 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min',
        jqueryCookie: 'lib/jquery/jquery.cookie.js',
        wizard: 'lib/jwizard/jquery.jWizard.min.js',
        angular: 'https://ajax.googleapis.com/ajax/libs/angularjs/1.2.26/angular.min',
        ngRoute: 'http://ajax.googleapis.com/ajax/libs/angularjs/1.2.4/angular-route.min',
        bootstrap: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min'
    },
    shim:{
        'angular':{
            exports: 'angular'
        },
        'ngRoute': ['angular'],
        'jqueryUI': ['jquery'],
        'jwizard': ['jqueryUI'],
        'bootstrap': ['jquery'] //states that bootstrap depends on first loading the jQuery
    },
    priority:[
        'angular'
    ],
    urlArgs:'v=0.9'
});

require([
    'angular',
    'ngRoute',
    'text',
    'app',
    'jquery',
    'routes',
    'bootstrap'
], function (angular) {
    //This function will be called when all the dependencies
    //listed above are loaded. Note that this function could
    //be called before the page is loaded.
    //This callback is optional.

    $(document).ready(function () {
        angular.bootstrap(document, ['myApp']);
    });
});