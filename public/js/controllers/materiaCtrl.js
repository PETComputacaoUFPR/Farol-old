farol.config(['$stateProvider', function ($stateProvider){
    $stateProvider
    .state('moderacao.materia',{
        url: '/materias',
        templateUrl: 'templates/moderacao/materias.html',
        controller: 'MateriaCtrl'
    });
}])

.controller('MateriaCtrl', ['$scope', '$http', 'Materia', function ($scope, $http, Materia){
    $scope.materias = [];
    atualizarMaterias();
    $scope.novaMateria = new Materia();

    $scope.save = function(materia){
        materia.$save(function() {
            atualizarMaterias();
            swal("Cadastrada!", "A matéria " + materia.nome + " foi cadastrada com sucesso", "success");
            $scope.novaMateria.codigo = "";
            $scope.novaMateria.nome = "";
        }, function(err) {
            console.log(err);
            swal("Erro!", err, "error");
        });
    };

    $scope.delete = function(materia){
        swal({
            title: "Deseja remover " + materia.nome + "?",
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
                materia.$delete(function() {
                    atualizarMaterias();
                    swal("Deletado", "A matéria" + materia.nome + " foi deletada com sucesso.", "success");
                }, function(err) {
                    console.log(err);
                    swal("Erro!", err, "error");
                });
            }
        });
    };

    $scope.edit = function(materia){
        // Restaura o valor antigo caso perca foco ou seja cancelado
        if(materia.editing){
            materia.nome = materia.nomeAntigo;
        }else{
            materia.nomeAntigo = materia.nome;
        }
        materia.editing = !materia.editing;
    };

    $scope.update = function(materia){
        // Se o "novo" nome for igual ao antigo, retornamos
        // Isso poupa o servidor (mas deveria ser trabalho dele fazer isso?)
        if(materia.nome === materia.nomeAntigo){
            materia.editing = false;
            return;
        }
        console.log("Atualizando a matéria com código: " + materia.codigo);
        materia.$update(function() {
            swal("Alterado!", "A matéria " + materia.nome + " foi alterada com sucesso", "success");
        }, function(err) {
            console.log(err);
            swal("Erro!", err, "error");
        });
        materia.editing = false;
    };

    function atualizarMaterias(){
        $scope.materias = Materia.query();
    }
}]);
