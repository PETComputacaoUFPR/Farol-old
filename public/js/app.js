var farol = angular.module('farol', [
    'ui.router',
    'ui.keypress',
    'ngResource'
])

.constant('API', {
    'URL': 'https://porto-api.herokuapp.com',
    'ID': 'farol',
    'SECRET': 'KeepItSecret'
})

.config(['$urlRouterProvider', '$httpProvider', function ($urlRouterProvider, $httpProvider) {
    $urlRouterProvider.otherwise('/home');

    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}])

.run(['$rootScope', '$state', 'TokenHandler', function($rootScope, $state, TokenHandler) {
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
        var requireLogin = toState.data.requireLogin;

        if(typeof $rootScope.currentUser === 'undefined') {
            TokenHandler.getMe()
            .success(function(data) {
                $rootScope.currentUser = data;
            })
            .error(function(data) {
                if(requireLogin) {
                    event.preventDefault();
                    $rootScope.currentUser = 'not logged';
                    console.log(toState);
                    console.log(toParams);
                    return $state.go('login');
                }
            })
        }
    })
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
