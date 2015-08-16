farol.config(['$stateProvider', function ($stateProvider){
    $stateProvider
    .state('moderacao.usuario',{
        url: '/usuarios',
        templateUrl: 'templates/moderacao/usuarios.html',
        controller: 'UsuarioCtrl'
    });
}])

.controller('UsuarioCtrl', ['$scope', 'TokenHandler', 'Usuario', function ($scope, TokenHandler, Usuario){
    $scope.uploads = [];
    atualizarUsuarios();
    TokenHandler.getMe().success(function(data) {
        $scope.me = data;
    })

    $scope.block = function(usuario) {
        var block = usuario.bloqueado;
        var mensagem = "O usuário " + usuario.username + " foi ";
        mensagem += (block) ? "desbloqueado": "bloqueado" ;
        usuario.$block(function() {
            usuario.bloqueado = !block;
            swal("Sucesso", mensagem, "success");
        });
    };

    $scope.delete = function(usuario){
        swal({
            title: "Deseja remover " + usuario.nome + "?",
            type: "warning",
            showCancelButton: true,
            confirmButtonText: "Deletar",
            cancelButtonText: "Cancelar",
            closeOnConfirm: false,
            allowOutsideClick: false,
            allowEscapeKey: false
        },
        function(isConfirm){
            if(isConfirm){
                swal({
                    title: "Processando...",
                    type: "info",
                    showConfirmButton: false
                });
                usuario.$delete(function() {
                    atualizarUsuario();
                    swal("Deletado", "A matéria" + usuario.nome + " foi deletada com sucesso.", "success");
                }, function(err) {
                    console.log(err);
                    swal("Erro!", "Não foi possível deletar " + usuario.nome, "error");
                });
            }
        });
    };

    $scope.edit = function(usuario){
        // Restaura o valor antigo caso perca foco ou seja cancelado
        if(usuario.editing){
            usuario.nome = usuario.nomeAntigo;
        }else{
            usuario.nomeAntigo = usuario.nome;
        }
        usuario.editing = !usuario.editing;
    };

    $scope.update = function(usuario){
        // Se o "novo" nome for igual ao antigo, retornamos
        // Isso poupa o servidor (mas deveria ser trabalho dele fazer isso?)
        if(usuario.nome === usuario.nomeAntigo){
            usuario.editing = false;
            return;
        }
        usuario.$update(function() {
            swal("Alterado!", "A matéria " + usuario.nome + " foi alterada com sucesso", "success");
        }, function(err) {
            console.log(err);
            swal("Erro!", "Não foi possível atualizar " + usuario.nome, "error");
        });
        usuario.editing = false;
    };

    function atualizarUsuarios(){
        $scope.usuarios = Usuario.query();
    }
}]);
