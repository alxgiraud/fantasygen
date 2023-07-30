/*global angular*/
var app = angular.module('generator', ['ngRoute', 'ngAnimate', 'ui.bootstrap', 'ui.bootstrap-slider']);


app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    'use strict';
    $routeProvider
        .when('/markovChain', {
            templateUrl: 'views/markovChain.html',
            controller: 'markovChainCtrl'
        })
        .when('/genericFantasy', {
            templateUrl: 'views/fantasyNames.html',
            controller: 'fantasyNamesCtrl'
        })
        .when('/fantasticSpecies', {
            templateUrl: 'views/fantasticSpecies.html',
            controller: 'fantasticSpeciesCtrl'
        })
        .when('/groups', {
            templateUrl: 'views/groupNames.html',
            controller: 'groupNamesCtrl'
        })
        .when('/taverns', {
            templateUrl: 'views/taverns.html',
            controller: 'tavernCtrl'
        })
        .otherwise({
            redirectTo: 'markovChain'
        });
}]);
