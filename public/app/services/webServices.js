'use strict';

app.service('apiServices', function($http){
    return {
        getData : function (url,method,callBack) {
            $http({
                method: method,
                url: url,
                crossDomain: true
            }).then(function successCallback(response) {
                callBack(response);
                console.log(response);
                // this callback will be called asynchronously
                // when the response is available
            }, function errorCallback(response) {
                console.log(response);
            });
        }
    }
});
/*** Created by Himanshu-Machine on 19-11-2016.*/
