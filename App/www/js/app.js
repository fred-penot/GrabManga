angular.module('starter', ['ionic', 'ngCordova', 'starter.controllers'])

    .run(function($ionicPlatform) {
      $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
          // org.apache.cordova.statusbar required
          StatusBar.styleDefault();
        }
      });
    })

    .config(function($stateProvider, $urlRouterProvider, localStorageServiceProvider) {
      localStorageServiceProvider
          .setPrefix('grabManga');
      $stateProvider
          .state('app', {
            url: '/app',
            abstract: true,
            templateUrl: 'templates/menu.html',
            controller: 'AppCtrl'
          })
          .state('app.main', {
            url: '/main',
            views: {
              'menuContent': {
                controller: 'AppCtrl'
              }
            }
          })
          .state('app.index', {
            url: '/index',
            views: {
              'menuContent': {
                templateUrl: 'templates/index.html',
                controller: 'IndexCtrl'
              }
            }
          })
          .state('app.login', {
            url: '/login',
            views: {
              'menuContent': {
                templateUrl: 'templates/login.html',
                controller: 'LoginCtrl'
              }
            }
          })
          .state('app.mangaSearch', {
            url: '/manga/search',
            views: {
              'menuContent': {
                templateUrl: 'templates/manga/search/index.html',
                controller: 'MangaSearchCtrl'
              }
            }
          })
          .state('app.mangaDownload', {
            url: '/manga/download',
            views: {
              'menuContent': {
                templateUrl: 'templates/manga/download.html',
                controller: 'MangaDownloadCtrl'
              }
            }
          })
          .state('app.mangaArchive', {
            url: '/manga/archive',
            views: {
              'menuContent': {
                templateUrl: 'templates/manga/archive.html',
                controller: 'MangaArchiveCtrl'
              }
            }
          })
      // if none of the above states are matched, use this as the fallback
      $urlRouterProvider.otherwise('/app/main');
    });