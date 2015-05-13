angular.module('farol.moderacao.upload', ['ui.router'])

.config(['$stateProvider', function ($stateProvider){
    $stateProvider
    .state('moderacao.upload',{
        url: '/uploads',
        templateUrl: 'templates/moderacao/uploads.html',
        controller: 'UploadCtrl'
    });
}])

.controller('UploadCtrl', ['$scope', '$http', function ($scope, $http){
    
}]);