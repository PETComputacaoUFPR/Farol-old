angular.module('farol.moderacao.materia', ['ui.router'])

.config(['$stateProvider', function ($stateProvider){
    $stateProvider
    .state('moderacao.materia',{
        url: '/materias',
        templateUrl: 'templates/moderacao/materias.html',
        controller: 'MateriaCtrl'
    });
}])

.controller('MateriaCtrl', ['$scope', '$http', function ($scope, $http){
    $scope.materias = [];
    
    $http.get('http://pet.inf.ufpr.br/farol/api/v1/materias')
    .success(function (data, status){
        $scope.materias = data;
    });
}]);