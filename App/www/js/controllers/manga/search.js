angular.module('starter.manga.search', ['ion-autocomplete', 'starter.services.common', 'starter.services.japscan'])
    .controller('MangaSearchCtrl', function($scope, $ionicPopup, serviceCommon, wsJapscan) {
        var mangaResult, synopsis, lastChapter, lastTome;
        init();
        function init() {
            mangaResult = [];
            synopsis = '';
            lastChapter = 0;
            lastTome = 0;
            $scope.searchData = {title: '', chapter: 0, tome: 0};
            $scope.tomes = [];
            $scope.chapters = [];
            $scope.synopsisExist = false;
            $scope.tomeOrChapterSelect = false;
        }
        $scope.querySearch = function (query, isInitializing) {
            if ( !isInitializing && query.length > 2 ) {
                wsJapscan.utilsJapscanFindManga(query).then(function(data){
                    if ( data.statut ) {
                        mangaResult = data.data.mangas;
                    }
                });
            }
            return mangaResult;
        };
        $scope.selectTitle = function (title) {
            init();
            $scope.searchData.title = title.item.title;
            wsJapscan.utilsJapscanGetInfoManga(title.item.id).then(function(data){
                if ( data.statut ) {
                    if ( data.data.info.synopsis ) {
                        synopsis = data.data.info.synopsis;
                    } else {
                        synopsis = 'Aucune description';
                    }
                    $scope.synopsisExist = true;
                }
            });
            wsJapscan.utilsJapscanFindMangaChapterList(title.item.id).then(function(data){
                if ( data.statut ) {
                    $scope.chapters = data.data.chapters;
                }
            });
            wsJapscan.utilsJapscanFindMangaTomeList(title.item.id).then(function(data){
                if ( data.statut ) {
                    $scope.tomes = data.data.tomes;
                }
            });
            title = null;
            mangaResult = [];
        };
        $scope.showSynopsis = function() {
            $ionicPopup.alert({
                title: 'Synopsis',
                template: synopsis,
                buttons: [
                    {
                        text: 'Fermer',
                        type: 'button-assertive'
                    }
                ]
            });
        };
        $scope.selectTome = function() {
            $scope.tomeOrChapterSelect = true;
            $scope.typeGenerateInfo = ' le tome';
            if ( $scope.searchData.chapter == 0 || lastTome != $scope.searchData.tome) {
                $scope.chapters = [];
                wsJapscan.utilsJapscanFindMangaChapterTomeList($scope.searchData.tome).then(function(data){
                    if ( data.statut ) {
                        $scope.chapters = data.data.chapters;
                    }
                });
            }
            lastTome = $scope.searchData.tome;
        };
        $scope.selectChapter = function() {
            $scope.tomeOrChapterSelect = true;
            $scope.typeGenerateInfo = ' le chapitre';
            if ( $scope.searchData.tome == 0 ) {
                $scope.tomes = [];
                wsJapscan.utilsJapscanFindMangaTomeChapterList($scope.searchData.chapter).then(function(data){
                    if ( data.statut ) {
                        $scope.tomes = data.data.tomes;
                    }
                });
            }
            lastChapter = $scope.searchData.chapter;
        };
        $scope.doGenerate = function() {
            if ( $scope.searchData.tome > 0 || $scope.searchData.chapter > 0 ) {
                if ( wsJapscan.utilsJapscanGenerateManga($scope.searchData.tome, $scope.searchData.chapter) ) {
                    $scope.tomeOrChapterSelect = false;
                    serviceCommon.toast('Le titre a été ajouté aux téléchargements !');
                } else {
                    serviceCommon.toast('Erreur lors du lancement du téléchargement !');
                }
            } else {
                serviceCommon.toast('Veuillez sélectionner un tome ou un chapitre !');
            }
        };
    });