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
    var query = "INSERT INTO favorito (id, descricao) VALUES (?,?)";
    // console.log(query);
    $cordovaSQLite.execute(db, query, [produto.id, produto.descricao]).then(function(res) {
      // console.log("INSERT ID -> " + res.insertId);
    }, function(err) {
      // console.error(err);
    });
  };
  
})

.controller('FavoritoCtrl', function($scope, $cordovaSQLite) {
  $scope.atualizar = function() {
    var query = "SELECT * FROM favorito ORDER BY descricao";
    $cordovaSQLite.execute(db, query).then(function(res) {
      if(res.rows.length > 0) {
        var itemsColl = [];
        for(var i = 0; i < res.rows.length; i++) {
          itemsColl[i] = res.rows.item(i);
        }
        $scope.favoritos = itemsColl; 
        // console.log($scope.favoritos);
      } else {
        console.log("Nenhum favorito.");
      }
    }, function(err) {
      console.error(err);
    });
  };
  
  $scope.atualizar();
  
  $scope.removerFavorito = function(id) {
    var query = "DELETE FROM favorito WHERE id = ?";
    console.log(query);
    console.log(id);
    $cordovaSQLite.execute(db, query, [id]).then(function(res) {
      console.log("REMOVE ID -> " + res.insertId);
      $scope.atualizar();
    }, function(err) {
      console.error(err);
    });
  };
  
})

.controller('MarcaCtrl', function($scope, $stateParams, Marcas) {
  Marcas.all($stateParams.produtoId).then(function(marcas){
    $scope.marcas = marcas.data;
  });
  
  Marcas.getProduto($stateParams.produtoId).then(function(produto) {
    $scope.produtoSelecionado = produto.data;
  });
  
});