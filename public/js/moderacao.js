angular.module('farol.moderacao', [
    'ui.router',
    'farol.moderacao.home',
    'farol.moderacao.materia',
    'farol.moderacao.professor',
    'farol.moderacao.upload',
    'farol.moderacao.usuario'
]).
config(['$stateProvider', function ($stateProvider){
    $stateProvider
    .state('moderacao', {
        abstract: true,
        url: '/moderacao',
        templateUrl: 'templates/moderacao.html'
    });
}]);