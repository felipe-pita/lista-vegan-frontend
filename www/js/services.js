angular.module('starter.services', [])

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
