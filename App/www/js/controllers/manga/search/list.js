angular.module('starter.manga.search.list', ['starter.services.common', 'starter.services.japscan'])
    .controller('MangaSearchListCtrl', function($scope, $ionicModal, serviceCommon, wsJapscan) {
        var mangasList = [];
        var lastChapter = 0;
        var lastTome = 0;

        $scope.paginatorAlpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P'
            , 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

        $scope.showMangaList = function (pageAlpha) {
            $scope.paginatorAlpha.currentPageAlpha = pageAlpha;
            wsJapscan.utilsJapscanFindMangaBeginBy(pageAlpha).then(function(data){
                if ( data.statut ) {
                    mangasList = data.data.mangas;
                    $scope.pager = {};
                    setPage(1);
                }
            });
        };

        $scope.setPage = function (page) {
            setPage(page);
        };

        $ionicModal.fromTemplateUrl('templates/manga/search/more.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.moreWindow = modal;
        });

        $scope.showMangaMore = function (item) {
            lastChapter = 0;
            lastTome = 0;
            $scope.searchData = {title: '', chapter: 0, tome: 0};
            $scope.tomes = [];
            $scope.chapters = [];
            $scope.tomeOrChapterSelect = false;
            $scope.title = item.title;
            wsJapscan.utilsJapscanGetInfoManga(item.id).then(function(data){
                if ( data.statut ) {
                    if ( data.data.info.synopsis ) {
                        $scope.synopsis = data.data.info.synopsis;
                    } else {
                        $scope.synopsis = 'Aucune description';
                    }
                }
            });
            wsJapscan.utilsJapscanFindMangaChapterList(item.id).then(function(data){
                if ( data.statut ) {
                    $scope.chapters = data.data.chapters;
                }
            });
            wsJapscan.utilsJapscanFindMangaTomeList(item.id).then(function(data){
                if ( data.statut ) {
                    $scope.tomes = data.data.tomes;
                }
            });
            $scope.moreWindow.show();
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
                wsJapscan.utilsJapscanCheckArchiveManga($scope.searchData.tome, $scope.searchData.chapter).then(function(data){
                    if ( data.statut ) {
                        if ( data.data.check ) {
                            if ( wsJapscan.utilsJapscanGenerateManga($scope.searchData.tome, $scope.searchData.chapter) ) {
                                $scope.tomeOrChapterSelect = false;
                                serviceCommon.toast('Le titre a été ajouté aux téléchargements !');
                            } else {
                                serviceCommon.toast('Erreur lors du lancement du téléchargement !');
                            }
                        } else {
                            serviceCommon.toast('Ce titre existe déjà dans vos archives !');
                        }
                    }
                });
            } else {
                serviceCommon.toast('Veuillez sélectionner un tome ou un chapitre !');
            }
        };

        $scope.closeMore = function() {
            $scope.moreWindow.hide();
        };

        function setPage(page) {
            // get pager object from service
            $scope.pager = serviceCommon.paginator(mangasList.length, page);

            // get current page of items
            $scope.items = mangasList.slice($scope.pager.startIndex, $scope.pager.endIndex + 1);
        }
    }).directive('tabsearchlistmangaTemplate', function() {
    return {
        templateUrl: 'templates/manga/search/list.html'
    };
});