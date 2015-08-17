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

.controller('LoginCtrl', ['$scope', '$location', '$rootScope', '$http', 'API', 'TokenHandler', '$window', 'Usuario',
function ($scope, $location, $rootScope, $http, API, TokenHandler, $window, Usuario) {
    $scope.newUser = new Usuario();

    $scope.login = function(usuario) {
        login(usuario);
    };

    $scope.register = function(usuario) {
        usuario.$save(function() {
            login(usuario);
        }, function(err) {
            console.log(err);
            var message = 'Não foi possível criar um novo usuário.';
            if (err.data.error == 'Validation error') {
                message += '\nSomente e-mails da UFPR são aceitos.';
            } else {
                message += '\n' + err.data.error;
            }
            swal("Erro!", message, "error");
        })
    };

    function login(usuario) {
        var payload = {
            grant_type: "password",
            client_id: API.ID,
            client_secret: API.SECRET,
            username: usuario.username,
            password: usuario.password
        };

        console.log(payload);

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
