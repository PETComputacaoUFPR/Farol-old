angular.module('farol.moderacao.materia', ['ui.router', 'ui.keypress'])

.config(['$stateProvider', function ($stateProvider){
    $stateProvider
    .state('moderacao.materia',{
        url: '/materias',
        templateUrl: 'templates/moderacao/materias.html',
        controller: 'MateriaCtrl'
    });
}])

.controller('MateriaCtrl', ['$scope', '$http', function ($scope, $http){
    $scope.materias = [];
    atualizarMaterias();
    
    $scope.save = function(materia){
        $http.post('http://pet.inf.ufpr.br/farol/api/v1/materias/', materia)
        .success(function (data, status){
            atualizarMaterias();
            swal("Cadastrada!", "A matéria " + materia.nome + " foi cadastrado com sucesso", "success");
            materia.codigo = "";
            materia.nome = "";
        })
        .error(function (data, status){
            console.log(data);
            swal("Erro " + status, data.messages, "error");
        });
    };
    
    $scope.delete = function(materia){
        swal({
            title: "Deseja remover " + materia.nome + "?",
            type: "warning",
            showCancelButton: true,
            confirmButtonText: "Deletar",
            cancelButtonText: "Cancelar",
            closeOnConfirm: false
        },
        function(isConfirm){
            if(isConfirm){
                $http.delete('http://pet.inf.ufpr.br/farol/api/v1/materias/' + materia.codigo)
                .success(function (data, status){
                    atualizarMaterias();
                    //alert("Deletado " + materia.nome);
                    swal("Deletado", materia.nome + " foi deletado com sucesso.", "success");
                })
                .error(function (data, status){
                    console.log(data);
                    swal("Erro " + status, "Não foi possível deletar " + materia.nome, "error");
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
        // Isso poupa o servidor (mas deveria ser trabalho dele fazer isso)
        if(materia.nome === materia.nomeAntigo){
            materia.editing = false;
            return;
        }
        console.log("Atualizando a matéria com código: " + materia.codigo);
        $http.put('http://pet.inf.ufpr.br/farol/api/v1/materias/' + materia.codigo, {nome: materia.nome})
        .success(function (data, status){
            swal("Alterado!", "A matéria " + materia.nome + " foi alterada com sucesso", "success");
        })
        .error(function (data){
            console.log(data);
        });
        materia.editing = false;
    };
    
    function atualizarMaterias(){
        $http.get('http://pet.inf.ufpr.br/farol/api/v1/materias')
        .success(function (data, status){
            $scope.materias = data;
        });
    }
}]);