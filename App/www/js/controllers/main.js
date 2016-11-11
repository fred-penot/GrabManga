angular.module('starter.controllers',
    ['starter.services.common', 'starter.services.security', 'starter.services.japscan', 'starter.index',
      'starter.login', 'starter.manga.search', 'starter.manga.search.list', 'starter.manga.search.advanced',
      'starter.manga.download', 'starter.manga.archive'])
.controller('AppCtrl', function($scope, $state, $ionicHistory, $ionicLoading, wsSecurity, serviceCommon) {
  $ionicLoading.show({template: "chargement..."}).then(function(){});
  wsSecurity.checkAuth().then(function(data) {
    if ( data.statut ) {
      $ionicLoading.hide().then(function(){});
      $ionicHistory.nextViewOptions({
        disableBack: true
      });
      $state.go('app.index');
    }
  });
  $scope.goHome = function() {
    open('app.index');
  };
  $scope.goMangaSearch = function() {
    open('app.mangaSearch');
  };
  $scope.goMangaDownload = function() {
    try {
      var scopeMangaDownloadCtrl = angular.element(document.getElementById("mangaDownloadCtrl")).scope();
      scopeMangaDownloadCtrl.refresh();
    } catch(err) {}
    open('app.mangaDownload');
  };
  $scope.goMangaArchive = function() {
    try {
      var scopeMangaArchiveCtrl = angular.element(document.getElementById("mangaArchiveCtrl")).scope();
      scopeMangaArchiveCtrl.refresh();
    } catch(err) {}
    open('app.mangaArchive');
  };
  function open(roadName) {
    if ( ! serviceCommon.getConnect() ) {
      serviceCommon.logout();
    } else {
      $ionicHistory.nextViewOptions({
        disableBack: true
      });
      $state.go(roadName);
    }
  }
});