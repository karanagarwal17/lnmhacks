'use strict';

angular.module('profileMash')
  .constant("baseUrl","http://localhost:8080/")
  .service('profileFactory',['$resource','baseUrl',function($resource, baseUrl){
    this.getInfo = function(){
      return $resource(baseUrl + "scraper",null,{
        'create' : {method : 'POST'} 
      });
    };
  }]);
