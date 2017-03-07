'use strict';

/**
 * @ngdoc function
 * @name finalassignmentApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the finalassignmentApp
 */
angular.module('finalassignmentApp')
  .controller('navCtrl', function ($rootScope,$scope, quizMetrics) {

    $scope.quizMetrics = quizMetrics;
  

 


    
});