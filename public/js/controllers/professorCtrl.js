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
    
}]);