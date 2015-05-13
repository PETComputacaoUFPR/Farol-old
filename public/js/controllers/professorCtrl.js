angular.module('farol.moderacao.professor', ['ui.router'])

.config(['$stateProvider', function ($stateProvider){
    $stateProvider
    .state('moderacao.professor',{
        url: '/professores',
        templateUrl: 'templates/moderacao/professores.html',
        controller: 'ProfessorCtrl'
    });
}])

.controller('ProfessorCtrl', ['$scope', '$http', function ($scope, $http){
    $scope.professores = [];
    atualizarProfessores();
    
    function atualizarProfessores(){
        $http.get('http://pet.inf.ufpr.br/farol/api/v1/professores')
        .success(function (data, status){
            $scope.professores = data;
        });
    }
}]);