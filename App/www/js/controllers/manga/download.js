angular.module('starter.manga.download', ['starter.services.japscan'])
    .controller('MangaDownloadCtrl', function($scope, $interval, $ionicModal, wsJapscan) {
        var noDownload = '';
        var chapterId = 0;
        var tomeId = 0;
        $scope.pourcentDownload = 0;
        $scope.showMessage = false;
        refresh();
        $scope.refresh = function () {
            refresh();
        };
        $scope.progressDecode = function(pageMax, currentPageDecode) {
            $scope.pourcentDownload = parseInt((currentPageDecode / pageMax) * 100);
            return parseInt( 100 - ((currentPageDecode / pageMax) * 100));
        };
        $scope.deleteDownload = function(downloadId) {
            wsJapscan.utilsJapscanDeleteDownloadManga(downloadId).then(function(data){
                if ( data.statut ) {
                    refresh();
                }
            });
        };
        function refresh() {
            wsJapscan.utilsJapscanGetCurrentDownloadManga().then(function(data){
                if ( data.statut ) {
                    $scope.downloads = data.data.download;
                    $scope.showMessage = false;
                    noDownload = '';
                    if ( Object.keys( data.data.download ).length > 0 ) {
                        chapterId = data.data.download[0].chapter_id;
                        tomeId = data.data.download[0].tome_id;
                        $interval(function() {
                            getDownloadInfoManga();
                        }, 2000, 0, true);
                    } else {
                        $interval.cancel();
                        $scope.showMessage = true;
                        noDownload = 'Aucun Téléchargement en cours';
                    }
                    $scope.noDownload = noDownload;
                }
            });
        }
        function getDownloadInfoManga() {
            if ( chapterId > 0 || tomeId > 0 ) {
                wsJapscan.utilsJapscanGetInfoDownloadManga(tomeId, chapterId).then(function(data){
                    if ( data.statut ) {
                        if ( data.data.info ) {
                            $scope.downloads[0].max_page = data.data.info.max_page;
                            $scope.downloads[0].current_page_decode = data.data.info.current_page_decode;
                        } else {
                            chapterId = 0;
                            tomeId = 0;
                            refresh();
                        }
                    }
                });
            }
        }
    });