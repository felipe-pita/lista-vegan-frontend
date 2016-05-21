angular.module('starter.controllers', [])

.controller('CategoriaCtrl', function($scope, Categorias) {
  // $scope.categorias = Categorias.all(); //não consegui fazer funcionar dessa forma, como estava no exemplo.
  Categorias.all().then(function(categorias){
    $scope.categorias = categorias.data;
    // console.log($scope.categorias); //debug
  });
  // console.log($scope.categorias); //debug
})

.controller('ProdutoCtrl', function($scope, $stateParams, Produtos){
  Produtos.get($stateParams.categoriaId).then(function(produtos){
    $scope.produtos = produtos.data;
  });
})

.controller('MarcaCtrl', function($scope, $stateParams, Marcas){
  Marcas.get($stateParams.produtoId).then(function(marcas){
    $scope.marcas = marcas.data;
  });
})
// mantido para referência posterior
// .controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
//   $scope.chat = Chats.get($stateParams.chatId);
// });
