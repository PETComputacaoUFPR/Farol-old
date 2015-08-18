farol.config(['$stateProvider', function ($stateProvider){
    $stateProvider
    .state('conta',{
        url: '/conta',
        templateUrl: 'templates/conta.html',
        controller: 'ContaCtrl',
        data: {
            requireLogin: true
        }
    });
}])

.controller('ContaCtrl', ['$scope', 'Usuario', function ($scope, Usuario){
    $scope.me = Usuario.me();
}]);
