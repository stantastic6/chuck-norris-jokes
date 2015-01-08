angular.module('jokes.controllers', ['ionic'])

.controller('HomeCtrl', function($scope, $cordovaDeviceMotion, Jokes) {

  Jokes.getJoke().then(function(data){
    $scope.joke = data.value.joke;
    Jokes.addJoke($scope.joke);
  });

  $scope.newJoke = function(){
    Jokes.getJoke().then(function(data){
      //Assign joke to be displayed and add it to joke history
      $scope.joke = data.value.joke;
      Jokes.addJoke($scope.joke);
    }); 

    $scope.$broadcast('scroll.refreshComplete');
  }

  document.addEventListener("deviceready", function() {
    shake.startWatch(onShake);
  });

  var onShake = function() {
    $scope.newJoke();
  }
})

.controller('HistoryCtrl', function($scope, Jokes, $ionicPopup) {
  $scope.jokes = Jokes.jokeHistory();

  $scope.clicker = function(joke) {
    var alertPopup = $ionicPopup.alert({
      template: joke
    });
  };
})