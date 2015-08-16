farol.config(['$stateProvider', function ($stateProvider){
    $stateProvider
    .state('moderacao.home',{
        url: '/home',
        templateUrl: 'templates/moderacao/home.html',
        controller: 'ModeracaoHomeCtrl'
    });
}])

.controller('ModeracaoHomeCtrl', ['$scope', '$http', function ($scope, $http){
    $scope.pendentes = 0;

    $http.get('http://pet.inf.ufpr.br/farol/api/v1/arquivos/status/pendente')
    .success(function (data, status){
        $scope.pendentes = data.length;
    });

}]);
