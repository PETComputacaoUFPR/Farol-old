farol.config(['$stateProvider', function ($stateProvider){
    $stateProvider
    .state('moderacao.home',{
        url: '/home',
        templateUrl: 'templates/moderacao/home.html',
        controller: 'ModeracaoHomeCtrl'
    });
}])

.controller('ModeracaoHomeCtrl', ['$scope', 'Arquivo', function ($scope, Arquivo){
    $scope.pendentes = 0;

    $scope.pendentes = Arquivo.status({status: 'pendente'});

}]);
