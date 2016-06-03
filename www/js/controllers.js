angular.module('starter.controllers', [])

.controller('CategoriaCtrl', function($scope, Categorias) {
  Categorias.all().then(function(categorias){
    $scope.categorias = categorias.data;
    console.log($scope.categorias);
  });
})

.controller('ProdutoCtrl', function($scope, $cordovaSQLite, $stateParams, Produtos) {
  Produtos.all($stateParams.categoriaId).then(function(produtos) {
    $scope.produtos = produtos.data;
  });
  
  Produtos.getCategoria($stateParams.categoriaId).then(function(categoria) {
    $scope.categoriaSelecionada = categoria.data;
  });
  
  // $scope.isFavorito = function(produto) {
  //   var query = "SELECT * FROM favorito WHERE id = ?";
  //   $cordovaSQLite.execute(db, query, [produto.id]).then(function(res) {
  //     if(res.rows.length > 0) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   });
  // }
  
  $scope.addFavorito = function(produto) {
    var query = "INSERT INTO favorito (id, descricao, observacao) VALUES (?, ?, ?)";
    // console.log(query);
    $cordovaSQLite.execute(db, query, [produto.id, produto.descricao, produto.observacao]).then(function(res) {
      console.log("INSERT ID -> " + res.insertId);

    }, function(err) {
      // console.error(err);
    });
    
    Marcas.all(produto.id).then(function(marcas){
    var marca = marcas.data;
    // for(var marca in marcas){
    for(var i = 0; i < marca.length; i++){
      var query = "INSERT INTO marca (id, descricao, observacao) VALUES (?, ?, ?)";
      console.log(query + marca[i].marca.id + marca[i].marca.descricao, marca[i].observacao);
      $cordovaSQLite.execute(db, query, [marca[i].marca.id, marca[i].marca.descricao, marca[i].observacao]).then(function(res) {
        
      }, function(err) {
        
      });
      var query = "INSERT INTO relacao (idFavorito, idMarca, observacao) VALUES (?, ?, ?)";
      console.log(query + produto.id + marca[i].marca.id + marca[i].observacao);
      
      var observacao;
      Marcas.getProduto(produto.id).then(function(produto) {
        observacao = produto.data.observacao;
      });
      $cordovaSQLite.execute(db, query, [produto.id, marca[i].marca.id, observacao]).then(function(res) {
          
      }, function(err) {
        
      });  
      
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