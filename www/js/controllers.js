angular.module('jokes.controllers', [])

.controller('HomeCtrl', function($scope, $cordovaDeviceMotion, $cordovaNetwork, $ionicPopup, Jokes) {
  
  document.addEventListener("deviceready", function () {
    shake.startWatch(onShake); 
  }, true);
  
  $scope.newJoke = function(){
    document.addEventListener("deviceready", function() {
    
    if ($cordovaNetwork.isOnline()) {        
      Jokes.getJoke().then(function(data){
      //Assign joke to be displayed and add it to joke history
      $scope.joke = data.value.joke;
      Jokes.addJoke($scope.joke);
    })
    
    }else{
        //No network connection
        var alertPopup = $ionicPopup.alert({
          title: 'No Network Connection',
          template: 'You must be connected to a network to bask in the greatness of Chuck.'
        })
      }
  }, false);

    $scope.$broadcast('scroll.refreshComplete'); 
 }

  var onShake = function() {
    // New Joke when device gets a shake
    $scope.newJoke();
  }
  
  $scope.newJoke();
})


// History Controller
.controller('HistoryCtrl', function($scope, Jokes, $ionicPopup) {
  $scope.jokes = Jokes.jokeHistory();

  $scope.clicker = function(joke) {
    var alertPopup = $ionicPopup.alert({
      template: joke
    });
  };
})