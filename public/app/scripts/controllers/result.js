'use strict';

/**
 * @ngdoc function
 * @name finalassignmentApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the finalassignmentApp
 */
angular.module('finalassignmentApp')
  .controller('resultCtrl', function ($scope, quizMetrics) {
    $scope.quizMetrics = quizMetrics;
    $scope.activeQuestion = 0;
    $scope.getAnswerClass = function (index){
      if (index === quizMetrics.quizData[$scope.activeQuestion].correctanswer){
        return "bg-success"
      }
      else if (index === quizMetrics.quizData[$scope.activeQuestion].selected)
        return "bg-danger"

    }
    $scope.setActiveQuestion = function(index){
        $scope.activeQuestion = index;



    }
    $scope.calculatePerc = function (){
      return quizMetrics.numCorrect / quizMetrics.quizData.length * 100;

    }
    $scope.reset = function (){
    quizMetrics.changeState("result", false);
    quizMetrics.numCorrect = 0;
 
    for(var i = 0; i < quizMetrics.quizData.length; i++){
        var data = quizMetrics.quizData[i]; //binding the current question to data to keep code clean
 
        data.selected = null;
        data.correct = null;
    }
    }
    
  	
    
  });