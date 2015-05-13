angular.module('farol.moderacao.usuario', ['ui.router'])

.config(['$stateProvider', function ($stateProvider){
    $stateProvider
    .state('moderacao.usuario',{
        url: '/usuarios',
        templateUrl: 'templates/moderacao/usuarios.html',
        controller: 'UsuarioCtrl'
    });
}])

.controller('UsuarioCtrl', ['$scope', '$http', function ($scope, $http){
    
}]);