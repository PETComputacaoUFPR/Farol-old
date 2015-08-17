farol.config(['$stateProvider', function ($stateProvider){
    $stateProvider
    .state('moderacao.upload',{
        url: '/uploads',
        templateUrl: 'templates/moderacao/uploads.html',
        controller: 'UploadCtrl'
    });
}])

.controller('UploadCtrl', ['$scope', 'Arquivo', function ($scope, Arquivo){
    $scope.uploads = [];
    atualizarUploads();

    function atualizarUploads(){
        $scope.uploads = Arquivo.status({status: 'pendente'});
    }
}]);
