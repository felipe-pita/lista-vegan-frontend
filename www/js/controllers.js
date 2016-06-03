angular.module('starter.controllers', [])

.controller('CategoriaCtrl', function($scope, Categorias) {
  Categorias.all().then(function(categorias){
    $scope.categorias = categorias.data;
    console.log($scope.categorias);
  });
})

.controller('ProdutoCtrl', function($scope, $stateParams, Produtos, Marcas, MarcasOff, Favoritos) {
  Produtos.all($stateParams.categoriaId).then(function(produtos) {
    $scope.produtos = produtos.data;
  });
  
  Produtos.getCategoria($stateParams.categoriaId).then(function(categoria) {
    $scope.categoriaSelecionada = categoria.data;
  });
  
  // $scope.isFavorito = function(produtoId) {
  //   console.log(Favoritos.isFavorito(produtoId));
  //   return Favoritos.isFavorito(produtoId);
  // }
  
  $scope.addFavorito = function(produto) {
    MarcasOff.addFavorito(produto);
    Marcas.all(produto.id).then(function(marcas){
    var marca = marcas.data;
    for(var i = 0; i < marca.length; i++){
      MarcasOff.addMarca(marca[i]);
      MarcasOff.addRelacao([produto.id, marca[i].marca.id, marca[i].observacao]);
    }
  });
    
  };
  
})

.controller('FavoritoCtrl', function($scope, Favoritos) {
  $scope.atualizar = function() {
    Favoritos.all().then(function(favoritos) {
      $scope.favoritos = favoritos;
    })
  };
  
  $scope.atualizar();
  
  $scope.removerFavorito = function(id) {
    Favoritos.remover(id);
    $scope.atualizar();
  };
})

.controller('MarcaOffCtrl', function($scope, $stateParams, MarcasOff) {
  // if($cordovaNetwork.isOffline()) {
  
  MarcasOff.all($stateParams.produtoId).then(function(marcas) {
    $scope.marcas = marcas;
  });
  
  MarcasOff.getProduto($stateParams.produtoId).then(function(produtoSelecionado) {
    $scope.produtoSelecionado = produtoSelecionado;
  });
})

.controller('MarcaCtrl', function($scope, $stateParams, Marcas) {
  Marcas.all($stateParams.produtoId).then(function(marcas){
    $scope.marcas = marcas.data;
  });
  
  Marcas.getProduto($stateParams.produtoId).then(function(produto) {
    $scope.produtoSelecionado = produto.data;
  });
});