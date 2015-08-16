farol.config(['$stateProvider', function($stateProvider) {
    $stateProvider
    .state('home', {
        url: '/home',
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl',
        data: {
            requireLogin: false
        }
    })
}])

.controller('HomeCtrl', ['$scope', '$location', '$rootScope', 'TokenHandler', function ($scope, $location, $rootScope, TokenHandler) {
    $scope.currentUser = $rootScope.currentUser;
    TokenHandler.getMe()
    .success(function(data, status) {
        $scope.currentUser = data;
    })
    .error(function(data, status) {
        console.log(data);
    });

    $scope.buscar = function() {
        $location.path('/busca/' + $scope.query);
    };
}]);
