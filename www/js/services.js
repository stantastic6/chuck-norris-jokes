angular.module('jokes.services', [])

.factory('Jokes', function($http, $q) {
  //Get Chuck Norris fact from ICNDB
  var jokes = []
  
    return {
      getJoke: function() {
        var deferred = $q.defer();
  
        var joke = $http.get("http://api.icndb.com/jokes/random")
          .success(function(data){
            deferred.resolve(data);
          })
          .error(function(data){
            console.log("Error with ICNDB call");
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
