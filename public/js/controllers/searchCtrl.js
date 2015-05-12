'use strict';

angular.module('farol.search', ['ui.router'])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider
    .state('busca',{
        url: '/busca/:query',
        templateUrl: 'templates/search.html',
        controller: 'SearchCtrl'
    })
}])

.controller('SearchCtrl', ['$scope', '$location', '$stateParams', '$http', function ($scope, $location, $stateParams, $http){
    $scope.arquivos = [];
    $scope.query = $stateParams.query;
    
    if(!$scope.query){
        $location.path('/home/');
    }else{
        buscar($scope.query);
    }
    
    $scope.buscar = function() {
        buscar($scope.query);
    };
    
    function buscar(query) {
        $http.get('http://pet.inf.ufpr.br/farol/api/v1/search/%20' + query)
        .success(function (data,status, headers){
            $scope.arquivos = data;
        });
    }
}]);