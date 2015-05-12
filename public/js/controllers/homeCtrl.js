'use strict';

angular.module('farol.home', ['ui.router'])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider
    .state('home', {
        url: '/home',
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl'
    })
}])

.controller('HomeCtrl', ['$scope', '$location', function ($scope, $location){
    
    $scope.buscar = function() {
        $location.path('/busca/' + $scope.query);
    };
}]);
