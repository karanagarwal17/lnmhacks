'use strict';

angular.module('profileMash')

.controller('ProfileController',['$scope','$stateParams','profileFactory',function($scope,$stateParams,profileFactory){
  $scope.showProfile = false;
  $scope.profileMessage = "Loading.....";
}]);
