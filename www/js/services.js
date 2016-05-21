angular.module('starter.services', [])

.factory('Categorias', function($http) {

  return {
    all: function() {
      return $http.get('http://veganize-kkteste.rhcloud.com/api/categoria?format=json');
      // return $http.get('categoria.json');
    }
  };
  
})

.factory('Produtos', function($http) {
  return {
    get: function(id) {
      return $http.get('http://veganize-kkteste.rhcloud.com/categoria/' + id +'/?format=json');
      // return $http.get('categoria3.json');
    }
  }
})

.factory('Marcas', function($http){
  return {
    get: function(id) {
      return $http.get('http://veganize-kkteste.rhcloud.com/produto/' + id +'/?format=json');
      // return $http.get('produto5.json');
    }
  }
});
