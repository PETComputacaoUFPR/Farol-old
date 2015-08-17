farol.config(['$stateProvider', function ($stateProvider){
    $stateProvider
    .state('moderacao', {
        abstract: true,
        url: '/moderacao',
        templateUrl: 'templates/moderacao.html',
        controller: 'ModeracaoCtrl',
        data: {
            requireLogin: true
        }
    });
}])

.controller('ModeracaoCtrl', ['$scope', '$rootScope', 'TokenHandler', function($scope, $rootScope, TokenHandler) {
    
}]);
