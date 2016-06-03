angular.module('starter.services', [])


//https://gist.github.com/lykmapipo/6451623a54ef9b957a5c
.factory('DBA', function($cordovaSQLite, $q, $ionicPlatform) {
  var self = this;

  // Handle query's and potential errors
  self.query = function (query, parameters) {
    parameters = parameters || [];
    var q = $q.defer();

    $ionicPlatform.ready(function () {
      $cordovaSQLite.execute(db, query, parameters)
        .then(function (result) {
          q.resolve(result);
        }, function (error) {
          console.warn('I found an error');
          console.warn(error);
          q.reject(error);
        });
    });
    return q.promise;
  }

  // Proces a result set
  self.getAll = function(result) {
    var output = [];

    for (var i = 0; i < result.rows.length; i++) {
      output.push(result.rows.item(i));
    }
    return output;
  }

  // Proces a single result
  self.getById = function(result) {
    var output = null;
    output = angular.copy(result.rows.item(0));
    return output;
  }

  return self;
})

.factory('Categorias', function($http) {
  return {
    all: function() {
      return $http.get('http://veganize-kkteste.rhcloud.com/api/categoria?format=json');
    }
  }
})

.factory('Produtos', function($http) {
  return {
    all: function(categoriaId) {
      return $http.get('http://veganize-kkteste.rhcloud.com/categoria/' + categoriaId +'/?format=json');
    },
    
    getCategoria: function(categoriaId) {
      return $http.get('http://veganize-kkteste.rhcloud.com/api/categoria/' + categoriaId +'?format=json');
    }
  }
})

.factory('Favoritos', function(DBA) {
  return {
    all: function() {
      return DBA.query("SELECT * FROM favorito ORDER BY descricao").then(function(result) {
        return DBA.getAll(result);
      })
    },
    
    remover: function(favoritoId) {
      var parameters = [favoritoId];
      return DBA.query("DELETE FROM favorito WHERE id = ?", parameters);
    }
  }
})

.factory('MarcasOff', function(DBA){
  return {
    all: function(produtoId) {
      var parameters = [produtoId];
      return DBA.query("SELECT * FROM marca, relacao WHERE idFavorito = ? and marca.id = relacao.idMarca ORDER BY marca.descricao", parameters).then(function(result) {
        return DBA.getAll(result);
      });
    },
    
    getProduto: function(produtoId) {
      var parameters = [produtoId];
      return DBA.query("SELECT * FROM favorito WHERE id = ?", parameters).then(function(result) {
        return DBA.getById(result);
      });
    }
  }
})

.factory('Marcas', function($http){
  return {
    all: function(produtoId) {
      return $http.get('http://veganize-kkteste.rhcloud.com/produto/' + produtoId +'/?format=json');
    },
    
    getProduto: function(produtoId) {
      return $http.get('http://veganize-kkteste.rhcloud.com/api/produto/' + produtoId +'?format=json');
    }
  }
});
