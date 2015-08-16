farol.config(['$stateProvider', function ($stateProvider){
    $stateProvider
    .state('moderacao.usuario',{
        url: '/usuarios',
        templateUrl: 'templates/moderacao/usuarios.html',
        controller: 'UsuarioCtrl'
    });
}])

.controller('UsuarioCtrl', ['$scope', '$http', function ($scope, $http){
    $scope.uploads = [];
    atualizarUsuarios();

    function atualizarUsuarios(){
        $http.get('http://pet.inf.ufpr.br/farol/api/v1/u/')
        .success(function (data, status){
            $scope.usuarios = data;
        });
    }
}]);
