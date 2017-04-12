'use strict';

angular.module('profileMash',['ui.router','ngResource'])
  .config(function($stateProvider,$urlRouterProvider) {

    $stateProvider

      .state('app',{
        url:'/',
        views: {
          'content': {
            templateUrl : 'views/home.html'
          }
        }
      })

      .state('app.profile',{
        url:'profile',
        views: {
          'content@' : {
            templateUrl : 'views/profile.html',
            controller : 'ProfileController'
          }
        }
      });

    $urlRouterProvider.otherwise('/');

  })
;
