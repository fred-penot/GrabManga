angular.module('starter.manga.search', [])
    .controller('MangaSearchCtrl', function($scope) {
        $scope.tabTitle = "Recherche / Liste";
        $scope.showTabSearchList = true;
        $scope.showTabSearchAdvanced = false;

        $scope.showTabMangaSearchList = function() {
            $scope.tabTitle = "Recherche / Liste";
            $scope.showTabSearchList = true;
            $scope.showTabSearchAdvanced = false;
        };

        $scope.showTabMangaSearchAdvanced = function() {
            $scope.tabTitle = "Recherche / Avancée";
            $scope.showTabSearchList = false;
            $scope.showTabSearchAdvanced = true;
        };
    });