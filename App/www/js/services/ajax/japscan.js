'use strict';

/**
 * @ngdoc service
 * @name angularDomoApp.services.ajax.japscan
 * @description
 * # serviceAjaxJapscan
 * Factory in the angularDomoApp.
 */
angular.module('starter.services.japscan', ['starter.services.common'])
    .factory('wsJapscan', function ($http, serviceCommon) {
        var host = "http://88.190.12.151:9199";
        var errorMessage = 'Erreur de connexion au serveur !';
        return{
            utilsJapscanFindManga: function(search){
                try {
                    return $http.get(host+"/utils/api/japscan/get/manga/title/"+serviceCommon.getToken()+"/"+search)
                        .then(serviceCommon.checkApiReturn)
                        .then(serviceCommon.sendApiReturn);
                } catch(err) {
                    serviceCommon.toast(errorMessage);
                    return false;
                }
            },
            utilsJapscanFindMangaBeginBy: function(search){
                try {
                    return $http.get(host+"/utils/api/japscan/get/manga/title/begin/by/"+serviceCommon.getToken()+"/"+search)
                        .then(serviceCommon.checkApiReturn)
                        .then(serviceCommon.sendApiReturn);
                } catch(err) {
                    serviceCommon.toast(errorMessage);
                    return false;
                }
            },
            utilsJapscanGetInfoManga: function(mangaId){
                try {
                    return $http.get(host+"/utils/api/japscan/get/manga/info/"+serviceCommon.getToken()+"/"+mangaId)
                        .then(serviceCommon.checkApiReturn)
                        .then(serviceCommon.sendApiReturn);
                } catch(err) {
                    serviceCommon.toast(errorMessage);
                    return false;
                }
            },
            utilsJapscanFindMangaTomeList: function(mangaId){
                try {
                    return $http.get(host+"/utils/api/japscan/get/manga/tome/list/"+serviceCommon.getToken()+"/"+mangaId)
                        .then(serviceCommon.checkApiReturn)
                        .then(serviceCommon.sendApiReturn);
                } catch(err) {
                    serviceCommon.toast(errorMessage);
                    return false;
                }
            },
            utilsJapscanFindMangaChapterTomeList: function(tomeId){
                try {
                    return $http.get(host+"/utils/api/japscan/get/manga/tome/chapter/"+serviceCommon.getToken()+"/"+tomeId)
                        .then(serviceCommon.checkApiReturn)
                        .then(serviceCommon.sendApiReturn);
                } catch(err) {
                    serviceCommon.toast(errorMessage);
                    return false;
                }
            },
            utilsJapscanFindMangaTomeChapterList: function(chapterId){
                try {
                    return $http.get(host+"/utils/api/japscan/get/manga/chapter/tome/"+serviceCommon.getToken()+"/"+chapterId)
                        .then(serviceCommon.checkApiReturn)
                        .then(serviceCommon.sendApiReturn);
                } catch(err) {
                    serviceCommon.toast(errorMessage);
                    return false;
                }
            },
            utilsJapscanFindMangaChapterList: function(mangaId){
                try {
                    return $http.get(host+"/utils/api/japscan/get/manga/chapter/"+serviceCommon.getToken()+"/"+mangaId)
                        .then(serviceCommon.checkApiReturn)
                        .then(serviceCommon.sendApiReturn);
                } catch(err) {
                    serviceCommon.toast(errorMessage);
                    return false;
                }
            },
            utilsJapscanGenerateManga: function(tomeId, chapterId){
                try {
                    $http.get(host+"/utils/api/japscan/generate/manga/"+serviceCommon.getToken()+"/"+tomeId+"/"+chapterId);
                    return true;
                } catch(err) {
                    serviceCommon.toast(errorMessage);
                    return false;
                }
            },
            utilsJapscanCheckMangaByTitleAndTome: function(title, nbTome){
                try {
                    return $http.get(host+"/utils/api/japscan/check/tome/manga/"+serviceCommon.getToken()+"/"+title+"/"+nbTome)
                        .then(serviceCommon.checkApiReturn)
                        .then(serviceCommon.sendApiReturn);
                } catch(err) {
                    serviceCommon.toast(errorMessage);
                    return false;
                }
            },
            utilsJapscanCheckArchiveManga: function(tomeId, chapterId){
                try {
                    return $http.get(host+"/utils/api/japscan/check/archive/manga/"+serviceCommon.getToken()+"/"+tomeId+"/"+chapterId)
                        .then(serviceCommon.checkApiReturn)
                        .then(serviceCommon.sendApiReturn);
                } catch(err) {
                    serviceCommon.toast(errorMessage);
                    return false;
                }
            },
            utilsJapscanGenerateMangaByTitleAndTome: function(title, nbTome){
                try {
                    $http.get(host+"/utils/api/japscan/generate/tome/manga/"+serviceCommon.getToken()+"/"+title+"/"+nbTome);
                    return true;
                } catch(err) {
                    serviceCommon.toast(errorMessage);
                    return false;
                }
            },
            utilsJapscanGetInfoDownloadManga: function(tomeId, chapterId){
                try {
                    return $http.get(host+"/utils/api/japscan/info/download/manga/"+serviceCommon.getToken()+"/"+tomeId+"/"+chapterId)
                        .then(serviceCommon.checkApiReturn)
                        .then(serviceCommon.sendApiReturn);
                } catch(err) {
                    serviceCommon.toast(errorMessage);
                    return false;
                }
            },
            utilsJapscanGetLinkDownloadManga: function(tomeId, chapterId){
                try {
                    return $http.get(host+"/utils/api/japscan/link/download/manga/"+serviceCommon.getToken()+"/"+tomeId+"/"+chapterId)
                        .then(serviceCommon.checkApiReturn)
                        .then(serviceCommon.sendApiReturn);
                } catch(err) {
                    serviceCommon.toast(errorMessage);
                    return false;
                }
            },
            utilsJapscanGetCurrentDownloadManga: function(){
                try {
                    return $http.get(host+"/utils/api/japscan/get/current/download/manga/"+serviceCommon.getToken())
                        .then(serviceCommon.checkApiReturn)
                        .then(serviceCommon.sendApiReturn);
                } catch(err) {
                    serviceCommon.toast(errorMessage);
                    return false;
                }
            },
            utilsJapscanDeleteDownloadManga: function(downloadId){
                try {
                    return $http.get(host+"/utils/api/japscan/delete/history/download/manga/"+serviceCommon.getToken()+"/"+downloadId)
                        .then(serviceCommon.checkApiReturn)
                        .then(serviceCommon.sendApiReturn);
                } catch(err) {
                    serviceCommon.toast(errorMessage);
                    return false;
                }
            },
            utilsJapscanGetHistoryManga: function(){
                try {
                    return $http.get(host+"/utils/api/japscan/get/history/download/manga/"+serviceCommon.getToken())
                        .then(serviceCommon.checkApiReturn)
                        .then(serviceCommon.sendApiReturn);
                } catch(err) {
                    serviceCommon.toast(errorMessage);
                    return false;
                }
            },
            utilsJapscanDeleteHistoryManga: function(historyId){
                try {
                    return $http.get(host+"/utils/api/japscan/delete/history/download/manga/"+serviceCommon.getToken()+"/"+historyId)
                        .then(serviceCommon.checkApiReturn)
                        .then(serviceCommon.sendApiReturn);
                } catch(err) {
                    serviceCommon.toast(errorMessage);
                    return false;
                }
            },
            utilsJapscanGenerate: function(token, url, tomeMin, tomeMax, pageMin, pageMax){
                try {
                    var data = $.param({
                        token: token,
                        url: url,
                        tomeMin: tomeMin,
                        tomeMax: tomeMax,
                        pageMin: pageMin,
                        pageMax: pageMax
                    });
                    var config = {
                        headers : {
                            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                        }
                    }
                    return $http.post(host+"/utils/api/japscan/generate", data, config);
                } catch(err) {
                    serviceCommon.toast(errorMessage);
                    return false;
                }
            }
        }
    });