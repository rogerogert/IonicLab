angular
  .module("starter")
  .controller("ListagemController", function($scope, CarroService) {
    $scope.listaDeCarros = "";

    CarroService.obterCarros().then(function(dados) {
      $scope.listaDeCarros = dados;
    });
  });

angular
  .module("starter")
  .controller("CarroEscolhidoController", function($stateParams, $scope) {
    $scope.carroEscolhido = angular.fromJson($stateParams.carro);
    $scope.listaDeAcessorios = [
      { nome: "Freio ABS", preco: 800 },
      { nome: "Ar-condicionado", preco: 1000 },
      { nome: "MP3 Player", preco: 500 }
    ];

    $scope.mudou = function(acessorio, isMarcado) {
      if (isMarcado) {
        $scope.carroEscolhido.preco =
          $scope.carroEscolhido.preco + acessorio.preco;
      } else {
        $scope.carroEscolhido.preco =
          $scope.carroEscolhido.preco - acessorio.preco;
      }
    };
  });

angular
  .module("starter")
  .controller("FinalizarPedidoController", function(
    $scope,
    $stateParams,
    $ionicPopup,
    $state,
    CarroService
  ) {
    $scope.carroFinalizado = angular.fromJson($stateParams.carro);

    $scope.pedido = {};

    $scope.finalizarPedido = function() {
      var pedidoFinalizado = {
        params: {
          carro: $scope.carroFinalizado.nome,
          preco: $scope.carroFinalizado.preco,
          nome: $scope.pedido.nome,
          endereco: $scope.pedido.endereco,
          email: $scope.pedido.email
        }
      };
      CarroService.salvarPedido(pedidoFinalizado).then(
        function(data) {
          $ionicPopup
            .alert({
              title: "Parabéns",
              template: "Você acaba de comprar um carro."
            })
            .then(function() {
              $state.go("listagem");
            });
        },
        function(erro) {
          $ionicPopup.alert({
            title: "Deu erro",
            template: "Campos obrigatórios"
          });
        }
      );
    };
  });
