farol.config(['$stateProvider', function($stateProvider) {
    $stateProvider
    .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl',
        data: {
            requireLogin: false
        }
    })
}])

.controller('LoginCtrl', ['$scope', '$location', '$rootScope', '$http', 'API', 'TokenHandler', '$window', function ($scope, $location, $rootScope, $http, API, TokenHandler, $window) {

    $scope.login = function(user) {
        var payload = {
            grant_type: "password",
            client_id: API.ID,
            client_secret: API.SECRET,
            username: user.username,
            password: user.password
        };

        $http.post(API.URL + '/v1/oauth/token', payload)
        .success(function(data, status) {
            console.log(data);
            TokenHandler.set(data.access_token);
            $window.sessionStorage.refreshToken = data.refresh_token;
            swal("Sucesso " + status, data.messages, "success");
            TokenHandler.getMe()
            .success(function(data, status) {
                console.log(data);
                $rootScope.currentUser = data;
                $location.path('/home');
            })
            .error(function(data, status) {
                console.log(data);
            });
        })
        .error(function(data, status) {
            console.log(data);
            swal("Erro " + status, data.status, "error");
        });
    }
}]);
