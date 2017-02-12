'use strict';

app.factory('storageService', ['$rootScope', function($rootScope){

      return{
            get : function(key){
               return localStorage.getItem(key);
            },

            // save : function(key, data){
            //     localStorage.setItem(key, JSON.stringify(data));
            //     // localStorage.setItem(key, data);
            // },
            save : function(key, data){
            // localStorage.setItem(key, JSON.stringify(data));
            // localStorage.setItem(key, data);
                localStorage.setItem(key, JSON.stringify(data,
                  function(key, value) {
                      if( key === "$$hashKey" ) {
                          return undefined;
                      }
                      return value;
                  })
                );
            },
            remove : function(key){
                localStorage.removeItem(key);
            },
            clearAll : function(){
                localStorage.clear();
            }
      };
}]);

app.factory('cacheService', ['storageService', function(storageService){

      return{
              getData : function(key){
                  return storageService.get(key);
              },

              setData : function(key, data){
                  storageService.save(key, data);
              },

              removeData : function(key){
                  storageService.remove(key);
              },
              clearData : function (){
                  storageService.clearAll();
              }
      };
}]);