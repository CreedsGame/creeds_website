// Define module
var creeds = angular.module('creeds', ['ngRoute', 'ngStorage']);

// Define routes
creeds.config(['$routeProvider', '$locationProvider', function AppConfig($routeProvider, $locationProvider)
{
    "use strict";
    $routeProvider
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'homeController'
        })
        .when('/:characterName', {
            templateUrl: 'views/character.html',
            controller: 'characterController'
        })
        .when('/battle/:battleId', {
            templateUrl: 'views/battle.html',
            controller: 'battleController'
        })
        .otherwise({
            redirectTo: '/'
        }
    );
}]);

// API configuration
creeds.constant('apiConfig',
    {
        "baseUrl": "http://localhost/creeds_api/v1/",
        "character": "character",
        "battle": "battle",
        "login": "login"
    }
);

// Website configuration
creeds.constant('webConfig',
    {
        "baseUrl": "http://localhost/",
        "subdomainUrl": ".creeds.ml"
    }
);