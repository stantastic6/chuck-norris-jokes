angular.module('jokes.services', [])

.factory('Jokes', function($http, $q, $ionicLoading) {
  //Get Chuck Norris fact from ICNDB
  var jokes = []
  
    return {
      getJoke: function() {
        var deferred = $q.defer();
        
        $ionicLoading.show({ template: 'Loading... '});
        
        var joke = $http.get("http://api.icndb.com/jokes/random")
          .success(function(data){
            $ionicLoading.hide()
            deferred.resolve(data);
          })
          .error(function(data){
            console.log("Error with ICNDB call");
            $ionicLoading.hide()
            deferred.reject(data);
          });
        return deferred.promise;
      },
      
      jokeHistory: function() {
        return jokes;
      },
      
      addJoke: function(joke) {
        //Remove the oldest joke from history if
        //There are more than 10

        if (jokes.length == 10){
          jokes.shift(); 
        }
        jokes.push(joke);
      }
    }
    
});
