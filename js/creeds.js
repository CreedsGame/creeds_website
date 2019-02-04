var creeds = angular.module('creeds', ['ngRoute', 'ngStorage']);

creeds.config(['$routeProvider', '$locationProvider', function AppConfig($routeProvider, $locationProvider)
{
    "use strict";
    $routeProvider
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'homeController'
        })
        // .when('/battle/:battleId', {
        //     templateUrl: 'views/battle.html',
        //     controller: 'battleController'
        // })
        .otherwise({
            redirectTo: '/'
        }
    );
}]);

creeds.constant('config', '');