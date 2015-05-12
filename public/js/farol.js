var farol = angular.module('farol', ['ui.router']);

farol.config(function ($stateProvider, $urlRouterProvider){
    $stateProvider
    .state('home', {
        url:'/home',
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl'
    })
    .state('search', {
        url: '/search/:query',
        templateUrl: 'templates/search.html',
        controller: 'SearchCtrl'
    });
    
    $urlRouterProvider.otherwise('/home');
});

farol.controller('HomeCtrl', function ($scope, $location){
    $scope.buscar = function() {
        $location.path('/search/' + $scope.query);
    };
});

farol.controller('SearchCtrl', function ($scope, $location, $stateParams, $http){
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
});