'use strict';

/**
 * @ngdoc function
 * @name finalassignmentApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the finalassignmentApp
 */
angular.module('finalassignmentApp')
  .controller('formCtrl', function ($rootScope,$scope, quizMetrics) {
    $scope.formInfo = {},
    $scope.loginInfo = {},

    
 
    $scope.showForm = false;
    quizMetrics.formData = $scope.formInfo;
     quizMetrics.loginData = $scope.loginInfo;
     
    $scope.getFile = function(file){
    console.log(file.file);
    var fileReader = new FileReader();
    fileReader.onload = function(event){
    var uri = event.target.result;
    quizMetrics.formData.imageStrings = uri;

    }
    fileReader.readAsDataURL(file.file)
    

    } 
    $scope.register = function(){
      formValidate();
      if($scope.validate){
        quizMetrics.addUser(function(){});
      }

    }
    $scope.login = function(){
      $scope.validate = true;
    if (!$scope.loginInfo.username) {
        $scope.emailRequired = 'Email Required';
         $scope.validate = false;
      }
    if (!$scope.loginInfo.password) {
        $scope.passRequired = 'Password Required';
         $scope.validate = false;
      }

      if($scope.validate){
        quizMetrics.loginUser(function(){
          console.log(quizMetrics.loggeduser.score);
     
        quizMetrics.showList=true ;
        $scope.showForm = true;
        quizMetrics.hideParallax=true;
        quizMetrics.showNav = true;
        
        });
    

      }




    }


    var formValidate = function(){
    $scope.validate = true;
     $scope.nameRequired = '';
   
    
 
     $scope.emailRequired = '';
     $scope.passRequired = '';


      if (!$scope.formInfo.username) {
        $scope.nameRequired = 'Name Required';
        $scope.validate = false;
      }

    if (!$scope.formInfo.email) {
        $scope.emailRequired = 'Email Required';
         $scope.validate = false;
      }
    if (!$scope.formInfo.password) {
        $scope.passRequired = 'Password Required';
         $scope.validate = false;
      }



      if($scope.validate){
        quizMetrics.showList=true ;
        $scope.showForm = true;
        quizMetrics.hideParallax=true;
        quizMetrics.showNav = true;

}

}
    
});