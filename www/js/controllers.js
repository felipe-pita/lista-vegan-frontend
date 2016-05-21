angular.module('starter.controllers', [])

.controller('CategoriaCtrl', function($scope, Categorias) {
  Categorias.all().then(function(categorias){
    $scope.categorias = categorias.data;
  });
  
})

.controller('ProdutoCtrl', function($scope, $stateParams, Produtos){
  Produtos.all($stateParams.categoriaId).then(function(produtos) {
    $scope.produtos = produtos.data;
  });
  
  Produtos.get($stateParams.categoriaId).then(function(categoria) {
    $scope.categoriaSelecionada = categoria.data;
  });
  
})

.controller('MarcaCtrl', function($scope, $stateParams, Marcas){
  Marcas.all($stateParams.produtoId).then(function(marcas){
    $scope.marcas = marcas.data;
  });
  
  Marcas.get($stateParams.produtoId).then(function(produto) {
    $scope.produtoSelecionado = produto.data;
  });
  
});