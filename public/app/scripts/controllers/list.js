'use strict';

/**
 * @ngdoc function
 * @name finalassignmentApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the finalassignmentApp
 */
angular.module('finalassignmentApp')
  .controller('listCtrl', function ($scope, quizMetrics) {
  	$scope.quizMetrics = quizMetrics;
    quizMetrics.getListData(function(){
        $scope.data = quizMetrics.listData;
    });
    
  	$scope.activeQuiz={}
  	$scope.search = "";
  



  	$scope.changeQuiz = function(index){
  		$scope.activeQuiz=index;
    }
    $scope.activateQuiz = function(listInfo){
      quizMetrics.quizType = listInfo.type;
      
      quizMetrics.changeTopic(listInfo);
      quizMetrics.showList = false;
    	quizMetrics.changeState("quiz", true);


      


    }
    
  });


