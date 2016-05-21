angular.module('starter.services', [])

.factory('Categorias', function($http) {

  return {
    all: function() {
      return $http.get('http://veganize-kkteste.rhcloud.com/api/categoria?format=json');
      // return $http.get('categoria.json'); //debug
    }
  }
  
})

.factory('Produtos', function($http) {
  return {
    all: function(categoriaId) {
      return $http.get('http://veganize-kkteste.rhcloud.com/categoria/' + categoriaId +'/?format=json');
      // return $http.get('categoria3.json'); //debug
    },
    get: function(categoriaId) {
      return $http.get('http://veganize-kkteste.rhcloud.com/api/categoria/' + categoriaId +'?format=json');
    }
  }
})

.factory('Marcas', function($http){
  return {
    all: function(produtoId) {
      return $http.get('http://veganize-kkteste.rhcloud.com/produto/' + produtoId +'/?format=json');
      // return $http.get('produto5.json'); //debug
    },
    get: function(produtoId) {
      return $http.get('http://veganize-kkteste.rhcloud.com/api/produto/' + produtoId +'?format=json');
    }
  }
});
