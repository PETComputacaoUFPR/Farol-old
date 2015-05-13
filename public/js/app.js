angular.module('farol', [
    'ui.router',
    'farol.home',
    'farol.search',
    'farol.moderacao'
])

.config(['$urlRouterProvider', '$httpProvider', function ($urlRouterProvider, $httpProvider) {
    $urlRouterProvider.otherwise('/home');
    
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);