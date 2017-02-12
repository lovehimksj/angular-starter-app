'use strict';
var app = angular.module('demoApp', ['ngRoute','gm']);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/home', {
            templateUrl : '/app/layouts/appLayout/mainActivity.html',
            controller: 'mainActivityCtrl'
        }).otherwise({
        redirectTo : '/home'
        // controller : 'homeCtrl'
    });
}]);

/*** Created by himanshumaheshwari on 10/01/17.*/
