angular.module('jokes.controllers', [])

.controller('HomeCtrl', function($scope, $cordovaDeviceMotion, Jokes) {

  Jokes.getJoke().then(function(data){
    $scope.joke = data.value.joke;
    Jokes.addJoke($scope.joke);
  });

  $scope.newJoke = function(){
    Jokes.getJoke().then(function(data){
      $scope.joke = data.value.joke;
      Jokes.addJoke($scope.joke);
    });
  }

  document.addEventListener("deviceready", function() {
    shake.startWatch(onShake);
  });

  var onShake = function() {
    $scope.newJoke();
  }
})

.controller('HistoryCtrl', function($scope, Jokes, $ionicModal) {
  $scope.jokes = Jokes.jokeHistory();

  $scope.clicker = function(joke) {
    console.log(joke);
  };
})