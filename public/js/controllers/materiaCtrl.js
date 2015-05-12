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
    atualizaMaterias();
    
    
    $scope.delete = function(codigo){
        console.log("Deletando matéria com código: " + codigo);
        $http.delete('http://pet.inf.ufpr.br/farol/api/v1/materias/' + codigo)
        .success(function (data, status){
            atualizaMaterias();
            console.log(data);
        })
        .error(function (data){
            console.log(data);
        });
    }
    
    $scope.edit = function(codigo){
        console.log("Editando a matérica com código: " + codigo);
    }
    
    function atualizaMaterias(){
        $http.get('http://pet.inf.ufpr.br/farol/api/v1/materias')
        .success(function (data, status){
            $scope.materias = data;
        });
    }
}]);