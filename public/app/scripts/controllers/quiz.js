'use strict';

/* @ngdoc function
 * @name finalassignmentApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the finalassignmentApp
 */
angular.module('finalassignmentApp')
  .controller('quizCtrl', function ($scope, quizMetrics) {
  	$scope.quizMetrics = quizMetrics;
  	$scope.activeQuestion = 0;
  	$scope.showError = false;
  	$scope.finalise = false;

    var numQuestAnswered = 0;
  	$scope.questionAnswered = function(){
  		var quizLength = quizMetrics.quizData.length; 
       for(var x = 0; x < quizLength; x++){
  		if(quizMetrics.quizData[$scope.activeQuestion].selected !== null){
  			numQuestAnswered++;
  			if(numQuestAnswered >= quizLength){

  				for(var i = 0; i < quizLength; i++){
 
                 if(quizMetrics.quizData[i].selected === null){
                   $scope.setActiveQuestion(i);
                   return;
                 }
             }
             $scope.showError = false;
             $scope.finalise = true;
             return;

  				//finalize quiz
  			}

      }
    }
      $scope.setActiveQuestion();


  	}
  	$scope.setActiveQuestion = function(index){
  		if(index === undefined){
  			var breakOut = false;
  		    var quizLength = quizMetrics.quizData.length - 1; 	//random logic
  		    while(!breakOut){
  			$scope.activeQuestion = $scope.activeQuestion < quizLength ? ++$scope.activeQuestion:0;
  			if ($scope.activeQuestion === 0) {
  				$scope.showError = true;
  			}
  			if(quizMetrics.quizData[$scope.activeQuestion].selected === null){
  				breakOut = true;
  			}
  		}


  	}else{
  		$scope.activeQuestion = index;
  	}


  		



  	}
  	$scope.selectAnswer = function(index){
  		quizMetrics.quizData[$scope.activeQuestion].selected = index;

  	}
  	$scope.finaliseAnswers = function(){
  		$scope.finalise = false;
  		numQuestAnswered = 0;
  		$scope.activeQuestion = 0;
  		quizMetrics.markQuiz();
      quizMetrics.updateUser(function(){});
  		quizMetrics.changeState('quiz', false);
  		quizMetrics.changeState('result', true);



  	}


    
  });
