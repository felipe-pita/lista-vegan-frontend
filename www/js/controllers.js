angular.module('starter.controllers', [])

.controller('CategoriaCtrl', function($scope, Categorias) {
  Categorias.all().then(function(categorias){
    $scope.categorias = categorias.data;
    console.log($scope.categorias);
  });
})

.controller('ProdutoCtrl', function($scope, $cordovaSQLite, $stateParams, Produtos, Marcas) {
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

.controller('MarcaOffCtrl', function($scope, $stateParams, $cordovaSQLite, Marcas, $cordovaNetwork) {
  // if($cordovaNetwork.isOffline()) {
    
  var query = "SELECT * FROM relacao WHERE idFavorito = ?";
  console.log(query + $stateParams.produtoId);
  $cordovaSQLite.execute(db, query, [$stateParams.produtoId]).then(function(res) {
    var lista = [];
    if(res.rows.length > 0) {
      var itemsColl = [];
      for(var i = 0; i < res.rows.length; i++) {
        itemsColl[i] = res.rows.item(i);
        console.log(itemsColl[i].toString());
      }
      var aux = itemsColl;        
      for(var i = 0; i < aux.length; i++){
        var query = "SELECT * FROM marca WHERE id = ?";
        console.log(query + aux[i].idMarca);
        $cordovaSQLite.execute(db, query, [aux[i].idMarca]).then(function(result) {
          if(res.rows.length > 0) {
            lista[i] = result.rows.item(0);
          }
        }, function(err) {
          console.log(err);
        });
      }
      $scope.marcas = lista;
    } else {
      console.log("Nenhum favorito.");
    }
  }, function(err) {
    
  });
  
  

  var query = "SELECT * FROM favorito WHERE id = ?";
  $cordovaSQLite.execute(db, query, [$stateParams.produtoId]).then(function(res) {
    $scope.produtoSelecionado = res.rows.item(0);
  }, function(err) {
  });
    
})

.controller('MarcaCtrl', function($scope, $stateParams, $cordovaSQLite, Marcas, $cordovaNetwork) {
  Marcas.all($stateParams.produtoId).then(function(marcas){
    $scope.marcas = marcas.data;
  });
  
  Marcas.getProduto($stateParams.produtoId).then(function(produto) {
    $scope.produtoSelecionado = produto.data;
  });
});