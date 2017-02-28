'use strict';

/**
 * @ngdoc function
 * @name finalassignmentApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the finalassignmentApp
 */
angular.module('finalassignmentApp')
  .controller('mainCtrl', function ($scope, quizMetrics) {
    $scope.quizMetrics = quizMetrics;
 


    
});