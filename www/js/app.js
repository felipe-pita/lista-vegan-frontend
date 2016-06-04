// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var db = null;

angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova'])

// Para analisar
.run(function($ionicPlatform, $cordovaSQLite, $cordovaStatusbar) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    // if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      //StatusBar.styleDefault();
    // }
    $cordovaStatusbar.styleHex('#2A8365');
    db = $cordovaSQLite.openDB("my.db");
    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS favorito (id integer primary key, descricao text, observacao text)");
    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS marca (id integer primary key, descricao text, observacao text)");
    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS relacao(idFavorito integer, idMarca integer, observacao text, PRIMARY KEY(idFavorito, idMarca))");
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  // $ionicConfigProvider.tabs.position('bottom');
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:
  .state('tab.categoria', {
    url: '/categoria',
    views: {
      'tab-categoria': {
        templateUrl: 'templates/tab-categorias.html',
        controller: 'CategoriaCtrl'
      }
    }
  })

  .state('tab.produtos', {
    url: '/produtos/:categoriaId',
    views: {
      'tab-produtos': {
        templateUrl: 'templates/tab-produtos.html',
        controller: 'ProdutoCtrl'
      }
    }
  })
    
  .state('tab.favoritos', {
    url: '/favoritos',
    cache: false,
    views: {
      'tab-favoritos': {
        templateUrl: 'templates/tab-favoritos.html',
        controller: 'FavoritoCtrl'
      }
    }
  })
    
  .state('tab.marcasoff', {
    url: '/marcasoff/:produtoId',
    views: {
      'tab-marcasoff': {
        templateUrl: 'templates/tab-marcasoff.html',
        controller: 'MarcaOffCtrl'
      }
    }
  })

  .state('tab.marcas', {
    url: '/marcas/:produtoId',
    views: {
      'tab-marcas': {
        templateUrl: 'templates/tab-marcas.html',
        controller: 'MarcaCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/categoria');

});
