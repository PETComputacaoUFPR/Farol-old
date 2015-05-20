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
    
    $scope.delete = function(codigo){
        $http.delete('http://pet.inf.ufpr.br/farol/api/v1/materias/' + codigo)
        .success(function (data, status){
            atualizarMaterias();
            alert("Deletado " + codigo);
        })
        .error(function (data){
            console.log(data);
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
            alert("Alterado " + materia.nome);
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