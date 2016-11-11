angular.module('starter.manga.archive', [ 'starter.services.common', 'starter.services.japscan'])
    .controller('MangaArchiveCtrl', function($scope, $cordovaFileTransfer, $timeout,
                                             serviceCommon, wsJapscan) {
        var lastIndex = -1;
        var noHistory = '';
        refresh();
        $scope.refresh = function () {
            refresh();
        };
        function refresh() {
            noHistory = '';
            lastIndex = -1;
            $scope.infoDownload = '';
            $scope.progressval = 0;
            $scope.showMessage = false;
            wsJapscan.utilsJapscanGetHistoryManga().then(function(data){
                if ( data.statut ) {
                    $scope.histories = data.data.history;
                    noHistory = '';
                    $scope.showMessage = false;
                    if ( Object.keys( data.data.history ).length == 0 ) {
                        noHistory = 'Aucune archive.';
                        $scope.showMessage = true;
                    }
                    $scope.noHistory = noHistory;
                }
            });
        }
        $scope.downloadArchive = function(index, archive) {
            var totalFileSize = $scope.histories[index].size;
            var url = 'http://88.190.12.151:9199/utils/api/japscan/link/download/manga/'+serviceCommon.getToken()+'/'+archive.tome_id+'/'+archive.chapter_id;
            var title = archive.manga_name.replace(/:/g, '.') + '_' + archive.title.replace(/:/g, '.') + '.pdf';
            try {
                var targetPath = cordova.file.externalRootDirectory + '/Download/' + title.replace(/ /g, '.');
                try {
                    var trustHosts = true;
                    var options = {};
                    if ( lastIndex >= 0 ) {
                        $scope.histories[lastIndex].isDownload = false;
                        $scope.histories[lastIndex].show = false;
                        $scope.histories[lastIndex].finish = true;
                        $scope.histories[lastIndex].download_success = false;
                        $scope.histories[lastIndex].download_error = false;
                    }
                    lastIndex = index;
                    $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
                        .then(function(result) {
                            $scope.histories[lastIndex].download_success = true;
                            serviceCommon.toast('Le manga a été déposé dans votre dossier de téléchargement !');
                            launchNotification();
                        }, function(err) {
                            $scope.histories[lastIndex].download_error = true;
                            $scope.histories[lastIndex].finish = true
                        }, function (progress) {
                            $timeout(function () {
                                $scope.histories[index].isDownload = true;
                                $scope.histories[index].show = true;
                                $scope.histories[lastIndex].finish = false;
                                $scope.progressval = parseInt((progress.loaded / totalFileSize) * 100);
                                if ( $scope.progressval >= 96 ) {
                                    $scope.progressval = 100;
                                }
                            });
                        });
                } catch(err) {
                    serviceCommon.toast('Erreur lors du transfert !');
                }
            } catch(err) {
                var downloadLink = angular.element('<a></a>');
                downloadLink.attr('href',url);
                downloadLink.attr('target','_blank');
                downloadLink[0].click();
            }
        };
        $scope.deleteHistory = function(historyId) {
            wsJapscan.utilsJapscanDeleteHistoryManga(historyId).then(function(data){
                if ( data.statut ) {
                    $scope.histories = data.data.history;
                    noHistory = '';
                    $scope.showMessage = false;
                    if ( Object.keys( data.data.history ).length == 0 ) {
                        noHistory = 'Aucune archive.';
                        $scope.showMessage = true;
                    }
                    $scope.noHistory = noHistory;
                }
            });
        };
        function launchNotification() {
            //
        }
    });