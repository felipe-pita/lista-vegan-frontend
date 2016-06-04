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
  
  $scope.isFavorito = function(produtoId) {
    console.log(Favoritos.isFavorito(produtoId));
    return Favoritos.isFavorito(produtoId);
  }
  
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
  
  $scope.removerFavorito = function(id) {
    Favoritos.remover(id);
    $scope.atualizar();
  };
  
})

.controller('FavoritoCtrl', function($scope, Favoritos, MarcasOff, Marcas) {
  $scope.atualizar = function() {
    Favoritos.all().then(function(favoritos) {
      $scope.favoritos = favoritos;
    })
  };
  
  //similar ao addFavorito do ProdutoCtrl
  $scope.update = function() {
    console.log($scope.favoritos.length);
    var produto = $scope.favoritos;
    for(var i = 0; i < $scope.favoritos.length; i++){
      // MarcasOff.addFavorito(produto);
      console.log(produto[i].id);
      var id = produto[i].id;
      Marcas.all(id).then(function(marcas){
        var marca = marcas.data;
        console.log(marca.length);
        for(var j = 0; j < marca.length; j++){
          MarcasOff.addMarca(marca[j]);
          console.log(id);
          MarcasOff.addRelacao([id, marca[j].marca.id, marca[j].observacao]);
        }
      });
    }
    $scope.$broadcast('scroll.refreshComplete');
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