angular.module('farol', [
    'ui.router',
    'ui.keypress',
    'farol.home',
    'farol.search',
    'farol.moderacao'
])

.config(['$urlRouterProvider', '$httpProvider', function ($urlRouterProvider, $httpProvider) {
    $urlRouterProvider.otherwise('/home');
    
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}])

.directive('showFocus', function($timeout) {
  return function(scope, element, attrs) {
    scope.$watch(attrs.showFocus, 
      function (newValue) { 
        $timeout(function() {
            newValue && element[0].focus();
        });
      },true);
  };    
});