angular.module('farol', [
    'ui.router',
    'farol.home',
    'farol.search',
    'farol.moderacao'
]).
config(['$urlRouterProvider', function ($urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
}]);