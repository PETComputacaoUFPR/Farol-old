angular.module('farol.moderacao', [
    'ui.router',
    'farol.moderacao.materia'
]).
config(['$stateProvider', function ($stateProvider){
    $stateProvider
    .state('moderacao', {
        abstract: true,
        url: '/moderacao',
        templateUrl: 'templates/moderacao.html'
    })
    .state('moderacao.home', {
        url: '/home',
        templateUrl: 'templates/moderacao/home.html'
    });
}]);