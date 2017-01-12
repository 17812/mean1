var app=angular.module('app',['ngRoute','ngResource']);

app.config(function($routeProvider,$locationProvider){

    //enable html5 mode
    $locationProvider.html5Mode(true);

    $routeProvider
        .when(
            '/', {templateUrl : 'partials/main', controller : 'mainController'});
});

app.controller('mainController',mainController);

function mainController($scope){
    $scope.message='Hello From Main Controller';
}