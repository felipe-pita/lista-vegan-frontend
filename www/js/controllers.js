angular.module('starter.controllers', [])

.controller('CategoriaCtrl', function($scope, Categorias) {
  // $scope.categorias = Categorias.all();
  Categorias.all().then(function(categorias){
    $scope.categorias = categorias.data;
    // console.log($scope.categorias);
  });
  // console.log($scope.categorias);
})

.controller('ProdutoCtrl', function($scope, $stateParams, Produtos){
  Produtos.get($stateParams.categoriaId).then(function(produtos){
    $scope.produtos = produtos.data;
  });
})

.controller('MarcaCtrl', function($scope, $stateParams, Marcas){
  Marcas.get($stateParams.produtoId).then(function(marcas){
    $scope.marcas = marcas.data;
  });
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
});
