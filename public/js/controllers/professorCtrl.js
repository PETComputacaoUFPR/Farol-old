farol.config(['$stateProvider', function ($stateProvider){
    $stateProvider
    .state('moderacao.professor',{
        url: '/professores',
        templateUrl: 'templates/moderacao/professores.html',
        controller: 'ProfessorCtrl'
    });
}])

.controller('ProfessorCtrl', ['$scope', '$http', 'Professor', function ($scope, $http, Professor){
    $scope.professores = [];
    atualizarProfessores();
    $scope.novoProfessor = new Professor();

    $scope.save = function(professor){
        professor.$save(function() {
            atualizarProfessores();
            swal("Cadastrado!", "Professor " + professor.nome + " foi cadastrado com sucesso", "success");
            professor.nome = "";
        }, function(err) {
            console.log(err);
            swal("Erro!", "Não foi possível salvar " + professor.nome, "error");
        });
    };

    $scope.delete = function(professor){
        swal({
            title: "Deseja remover " + professor.nome + "?",
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
                professor.$delete(function() {
                    atualizarProfessores();
                    swal("Deletado", professor.nome + " foi deletado com sucesso.", "success");
                }, function(err) {
                    console.log(err);
                    swal("Erro!", "Não foi possível deletar " + professor.nome, "error")
                });
            }
        });
    };

    $scope.edit = function(professor){
        // Restaura o valor antigo caso perca foco ou seja cancelado
        if(professor.editing){
            professor.nome = professor.nomeAntigo;
        }else{
            professor.nomeAntigo = professor.nome;
        }
        professor.editing = !professor.editing;
    };

    $scope.update = function(professor){
        // Se o "novo" nome for igual ao antigo, retornamos
        // Isso poupa o servidor (mas deveria ser trabalho dele fazer isso)
        if(professor.nome === professor.nomeAntigo){
            professor.editing = false;
            return;
        }
        professor.$update(function() {
            swal("Alterado!", "Alterado " + professor.nome + " com sucesso.", "success");
        }, function(err) {
            console.log(err);
            swal("Erro!", "Não foi possível alterar " + professor.nome, "error")
        });
        professor.editing = false;
    };

    function atualizarProfessores(){
        $scope.professores = Professor.query();
    }
}]);
