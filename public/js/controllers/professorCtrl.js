angular.module('farol.moderacao.professor', ['ui.router'])

.config(['$stateProvider', function ($stateProvider){
    $stateProvider
    .state('moderacao.professor',{
        url: '/professores',
        templateUrl: 'templates/moderacao/professores.html',
        controller: 'ProfessorCtrl'
    });
}])

.controller('ProfessorCtrl', ['$scope', '$http', function ($scope, $http){
    $scope.professores = [];
    atualizarProfessores();
    
    $scope.save = function(professor){
        console.log(professor);
        $http.post('http://pet.inf.ufpr.br/farol/api/v1/professores/', professor)
        .success(function (data, status){
            atualizarProfessores();
            swal("Cadastrado!", "Professor " + professor.nome + " foi cadastrado com sucesso", "success");
            professor.nome = "";
        })
        .error(function (data, status){
            console.log(data);
            swal("Erro " + status, data.messages, "error");
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
                $http.delete('http://pet.inf.ufpr.br/farol/api/v1/professores/' + professor.id)
                .success(function (data, status){
                    atualizarProfessores();
                    swal("Deletado", professor.nome + " foi deletado com sucesso.", "success");
                })
                .error(function (data, status){
                    console.log(data);
                    swal("Erro " + status, "Não foi possível deletar " + professor.nome, "error");
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
        console.log("Atualizando o professor com código: " + professor.id);
        $http.put('http://pet.inf.ufpr.br/farol/api/v1/professores/' + professor.id, {nome:professor.nome})
        .success(function (data, status){
            alert("Alterado " + professor.nome);
        })
        .error(function (data){
            professor.nome = professor.nomeAntigo;
            console.log(data);
            alert(data.messages);
        });
        professor.editing = false;
    };
    
    function atualizarProfessores(){
        $http.get('http://pet.inf.ufpr.br/farol/api/v1/professores')
        .success(function (data, status){
            $scope.professores = data;
        });
    }
}]);