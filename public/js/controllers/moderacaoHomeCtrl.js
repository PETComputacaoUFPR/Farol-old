angular.module('farol.moderacao.home', ['ui.router'])

.config(['$stateProvider', function ($stateProvider){
    $stateProvider
    .state('moderacao.home',{
        url: '/home',
        templateUrl: 'templates/moderacao/home.html',
        controller: 'ModeracaoHomeCtrl'
    });
}])

.controller('ModeracaoHomeCtrl', ['$scope', '$http', function ($scope, $http){
    $scope.pendentes = 2;
}]);