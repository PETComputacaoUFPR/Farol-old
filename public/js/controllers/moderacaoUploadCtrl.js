farol.config(['$stateProvider', function ($stateProvider){
    $stateProvider
    .state('moderacao.upload',{
        url: '/uploads',
        templateUrl: 'templates/moderacao/uploads.html',
        controller: 'UploadCtrl'
    });
}])

.controller('UploadCtrl', ['$scope', '$http', function ($scope, $http){
    $scope.uploads = [];
    atualizarUploads();

    function atualizarUploads(){
        $http.get('http://pet.inf.ufpr.br/farol/api/v1/arquivos/status/pendente')
        .success(function (data, status){
            $scope.uploads = data;
        });
    }
}]);
