

define([
    'app',
    'controllers/helloWorldCtrl'
    /* ,'{pathToControllerFile}' */],
    function (mainApp) {

        return mainApp.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/helloWorld', { controller: 'HelloWorldCtrl', templateUrl: '/templates/helloWorld.html' });
        /*$routeProvider.when('/{url}', { controller: '{controllerName}', templateUrl: '/partials/{templateName}.html' });*/
        $routeProvider.otherwise({ redirectTo: '/helloWorld' });
    }]);
});