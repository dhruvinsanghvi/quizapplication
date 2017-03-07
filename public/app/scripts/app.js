'use strict';

/**
 * @ngdoc overview
 * @name finalassignmentApp
 * @description
 * # finalassignmentApp
 *
 * Main module of the application.
 */
angular
  .module('finalassignmentApp', ['flow','timer'])
 
  .factory('quizMetrics', ['$http', function($http){
    var quizObj ={
        activeQuiz:false,
        resultActive:false,
        showList:false,
        hideParallax:false,
        showNav:false,
        showContainer:true,
        listData:[],
        quizData:[],
        numCorrect:0,
        formData:{},
        loginData:{},
        loggeduser:{},
        quizType:"",
       
     
        

        getListData:function(callback){
             
         $http.get('/api/list')
           .then(function(response) {
          quizObj.listData = response.data;
          quizObj.sidebarScore={};
          angular.forEach(quizObj.listData, function (value, key){
             quizObj.sidebarScore[value.type]= 10;

          });
          console.log(quizObj.listData);
          callback(quizObj.listData);
    });

       

        },
       getuserData:function(callback){
             
         $http.get('/api/users')
           .then(function(response) {
            quizObj.formData = response.data;
            

         
          callback(quizObj.formData);
    });

       
},
        loginUser:function(callback){
             $http.post('/api/login', quizObj.loginData).then(function(response){
                quizObj.loggeduser = response.data; 
        
 
                      angular.forEach(quizObj.loggeduser.score, function (value, key){
                  var k = Object.keys(value)[0];
             quizObj.sidebarScore[k]= value[k];

          });
            callback(response.data);
            quizObj.getuserData(function(){});



          });

 },
    updateUser:function(callback){
        quizObj.loggeduser.score.push({[quizObj.quizType]:quizObj.numCorrect});

        var id = quizObj.loggeduser._id;
             $http.put('/api/users/'+id, quizObj.loggeduser).then(function(response){
                quizObj.loggeduser = response.data; 
            callback(response.data);
           



          });

 },

        addUser:function(callback){
          $http.post('/api/users', quizObj.formData).then(function(response){
            quizObj.formData.userId = response.data.userId;
            callback();



          })

        },

        changeState:function(metric, state){
          if(metric == 'quiz'){
             quizObj.activeQuiz = state;

          }
          else if(metric === 'result'){
            quizObj.resultActive = state;

          }
          else{
            return false;
          }
         

        },
        changeTopic:function(index){
             for (var i = 0; i < quizBrain.length; i++){
                  if(index.type === quizBrain[i].topic){
                      quizObj.quizData.push(quizBrain[i]);
                      console.log(quizObj.quizData);

                  }
                  


             }


          


        },

        markQuiz:function(){
          for (var i = 0; i < quizObj.quizData.length; i++) {
            if(quizObj.quizData[i].selected === quizObj.quizData[i].correctanswer){
              quizObj.quizData[i].correct = true;
              quizObj.numCorrect ++;

              }
              else{
                quizObj.quizData[i].correct = false;
              }



              };

        }
    };

    return quizObj;

}]);
  var correctAnswers = [1, 2, 3, 0, 2, 0, 3, 2, 0, 3];

   

  var quizBrain = [
        {
            type: "image",
            topic: "html",
            text: "Which of the following browser supports HTML5 in its latest version?",
            possibilities: [
                {
                    answer: "https://support.apple.com/library/content/dam/edam/applecare/images/en_US/mac_apps/safari/yosemite-safai_icon.png"
                },
                {
                    answer: "https://lh3.googleusercontent.com/nYhPnY2I-e9rpqnid9u9aAODz4C04OycEGxqHG5vxFnA35OGmLMrrUmhM9eaHKJ7liB-=w300"
                },
                {
                    answer: "https://www.mozilla.org/media/img/firefox/firefox-256.e2c1fc556816.jpg"
                },
                {
                    answer: "https://debluebird.files.wordpress.com/2010/12/logo1.gif"
                }
            ],
            selected: null,
            correct: null,
            correctanswer:2
        },
        {
            type: "text",
            topic: "html",
            text: "Which of the following is correct about Web form 2.0 in HTML5?",
            possibilities: [
                {
                    answer: "Web Forms 2.0 is an extension to the forms features found in HTML4."
                },
                {
                    answer: "Form elements and attributes in HTML5 provide a greater degree of semantic mark-up than HTML4."
                },
                {
                    answer: "Form elements and attributes in HTML5 remove a great deal of the need for tedious scripting and styling that was required in HTML4."
                },
                {
                    answer: "All of the above"
                }
            ],
            selected: null,
            correct: null,
            correctanswer:3
        },
        {
            type: "text",
            topic: "html",
            text: "Which of the following input control accepts only numerical value in Web Form 2.0?",
            possibilities: [
                {
                    answer: "week"
                },
                {
                    answer: "time"
                },
                {
                    answer: "number"
                },
                {
                    answer: "range"
                }
            ],
            selected: null,
            correct: null,
            correctanswer:2

        },
        {
            type: "text",
            topic: "html",
            text: "Which of the following is true about Cookies?",
            possibilities: [
                {
                    answer: "Cookies are included with every HTTP request, thereby slowing down your web application by transmitting the same data."
                },
                {
                    answer: "Cookies are included with every HTTP request, thereby sending data unencrypted over the internet."
                },
                {
                    answer: "Cookies are limited to about 4 KB of data . Not enough to store required data."
                },
                {
                    answer: "All of the above"
                }
            ],
            selected: null,
            correct: null,
            correctanswer:3
        },
        {
            type: "text",
            topic: "html",
            text: "When a session storage data gets deleted in HTML5?'",
            possibilities: [
                {
                    answer: "The Session Storage Data would be deleted by the browsers immediately after the session gets terminated."
                },
                {
                    answer: "If you want to clear all settings, you need to call localStorage.clear() method."
                },
                {
                    answer: "both of the above"
                },
                {
                    answer: "none of the above"
                }
            ],
            selected: null,
            correct: null,
             correctanswer:0
        },
        {
            type: "text",
            topic: "html",
            text: "Which of the following is correct about geolocation api in HTML5?",
            possibilities: [
                {
                    answer: "The geolocation APIs work with a new property of the global navigator object."
                },
                {
                    answer: "The geolocation object is a service object that allows widgets to retrieve information about the geographic location of the device."
                },
                {
                    answer: "both of the above"
                },
                {
                    answer: "none of the above"
                }
            ],
            selected: null,
            correct: null,
            correctanswer:2
        },
        {
            type: "text",
            topic: "html",
            text: "Which of the following attribute specifies a keyboard shortcut to access an element in HTML5?",
            possibilities: [
                {
                    answer: "accesskey"
                },
                {
                    answer: "key"
                },
                {
                    answer: "contextmenu"
                },
                {
                    answer: "contextkey"
                }
            ],
            selected: null,
            correct: null,
             correctanswer:0
        },
        {
            type: "text",
            topic: "html",
            text: "Which of the following attribute triggers event before the document is printed?",
            possibilities: [
                {
                    answer: "onbeforeprint"
                },
                {
                    answer: "onafterprint"
                },
                {
                    answer: "onprint"
                },
                {
                    answer: "beforeprint"
                }
            ],
            selected: null,
            correct: null,
             correctanswer:0
        },
        {
            type: "text",
            topic: "html",
            text: "Which of the following attribute triggers event when media has reach the end?",
            possibilities: [
                {
                    answer: "ondrop"
                },
                {
                    answer: "ondurationchange"
                },
                {
                    answer: "onemptied"
                },
                {
                    answer: "onedned"
                }
            ],
            selected: null,
            correct: null,
             correctanswer:2
        },
        {
            type: "text",
            topic: "html",
            text: "Which of the following attribute triggers events when a form gets user input?",
            possibilities: [
                {
                    answer: "onchange"
                },
                {
                    answer: "onedit"
                },
                {
                    answer: "oneformchange"
                },
                {
                    answer: "onforminput"
                }
            ],
            selected: null,
            correct: null,
            correctanswer:3
        },
        {
            type: "text",
            topic: "css3",
            text: "Which of the following selector matches the name of any element type?",
            possibilities: [
                {
                    answer: "The Type Selector"
                },
                {
                    answer: "The Universal Selector"
                },
                {
                    answer: "The Descendant Selector"
                },
                {
                    answer: " The Class Selector"
                }
            ],
            selected: null,
            correct: null,
            correctanswer:3
        },
        {
            type: "text",
            topic: "css3",
            text: "Which of the following input control accepts only numerical value in Web Form 2.0?",
            possibilities: [
                {
                    answer: "%"
                },
                {
                    answer: "cm"
                },
                {
                    answer: "em"
                },
                {
                    answer: "ex"
                }
            ],
            selected: null,
            correct: null,
            correctanswer:3
        },
        {
            type: "text",
            topic: "css3",
            text: "Which of the following is correct about Hex Code format of CSS colors?",
            possibilities: [
                {
                    answer: "The first two digits(RR) represent a red value."
                },
                {
                    answer: "The next two are a green value(GG)."
                },
                {
                    answer: "The last are the blue value(BB)."
                },
                {
                    answer: "All of the above."
                }
            ],
            selected: null,
            correct: null,
            correctanswer:2
        },
        {
            type: "text",
            topic: "css3",
            text: "Which of the following property is used to set the background image of an element?",
            possibilities: [
                {
                    answer: "background-color"
                },
                {
                    answer: "background-image"
                },
                {
                    answer: "background-repeat"
                },
                {
                    answer: "background-position"
                }
            ],
            selected: null,
            correct: null,
             correctanswer:1
        },
        {
            type: "text",
            topic: "css3",
            text: "Which of the following property is used to add or subtract space between the words of a sentence?",
            possibilities: [
                {
                    answer: "colors"
                },
                {
                    answer: "direction"
                },
                {
                    answer: "letter-spacing"
                },
                {
                    answer: "word-spacing"
                }
            ],
            selected: null,
            correct: null,
             correctanswer:2
        },
        {
            type: "text",
            topic: "css3",
            text: "Which of the following property is used to set the height of an image?",
            possibilities: [
                {
                    answer: "border"
                },
                {
                    answer: "height"
                },
                {
                    answer: "width"
                },
                {
                    answer: "moz-opticity"
                }
            ],
            selected: null,
            correct: null,
             correctanswer:1
        },
        {
            type: "text",
            topic: "css3",
            text: "Which of the following property of a table element specifies the width that should appear between table cells?",
            possibilities: [
                {
                    answer: ":border-collapse"
                },
                {
                    answer: ":border-spacing"
                },
                {
                    answer: ":caption-side"
                },
                {
                    answer: ":empty-cells"
                }
            ],
            selected: null,
            correct: null,
            correctanswer:1
        },
        {
            type: "text",
            topic: "css3",
            text: "Which of the following property changes the width of top border?",
            possibilities: [
                {
                    answer: ":border-bottom-width"
                },
                {
                    answer: ":border-top-width"
                },
                {
                    answer: ":border-left-width"
                },
                {
                    answer: ":border-right-width"
                }
            ],
            selected: null,
            correct: null,
            correctanswer:1
        },
        {
            type: "text",
            topic: "css3",
            text: "Which of the following property serves as shorthand for the marker properties?",
            possibilities: [
                {
                    answer: " list-style-type"
                },
                {
                    answer: "list-style-position"
                },
                {
                    answer: "list-style-image"
                },
                {
                    answer: "list-style"
                }
            ],
            selected: null,
            correct: null,
             correctanswer:2
        },
        {
            type: "text",
            topic: "css3",
            text: "Which of the following value of cursor shows it as the 'I' bar?",
            possibilities: [
                {
                    answer: "crosshair"
                },
                {
                    answer: "default"
                },
                {
                    answer: "pointer"
                },
                {
                    answer: "move"
                }
            ],
            selected: null,
            correct: null,
             correctanswer:1
        },
        {
            type: "text",
            topic: "PHP",//https://www.tutorialspoint.com/php/php_online_quiz.htm
            text: "Which of the following is correct about PHP?",
            possibilities: [
                {
                    answer: "PHP can access cookies variables and set cookies."
                },
                {
                    answer: "Using PHP, you can restrict users to access some pages of your website."
                },
                {
                    answer: "It can encrypt data."
                },
                {
                    answer: "All of the above."
                }
            ],
            selected: null,
            correct: null,
             correctanswer:3
        },
        {
            type: "text",
            topic: "PHP",
            text: "Which of the following is correct about determine the 'truth' of any value not already of the Boolean type?",
            possibilities: [
                {
                    answer: "If the value is a number, it is false if exactly equal to zero and true otherwise."
                },
                {
                    answer: "If the value is a string, it is false if the string is empty (has zero characters) or is the string '0', and is true otherwise."
                },
                {
                    answer: "Values of type NULL are always false."
                },
                {
                    answer: "All of the above."
                }
            ],
            selected: null,
            correct: null,
             correctanswer:3
        },
        {
            type: "text",
            topic: "PHP",
            text: "Which of the following is correct about NULL?",
            possibilities: [
                {
                    answer: "A variable that has been assigned NULL evaluates to FALSE in a Boolean context."
                },
                {
                    answer: " A variable that has been assigned NULL returns FALSE when tested with IsSet() function."
                },
                {
                    answer: "Both of the above."
                },
                {
                    answer: "None of the above."
                }
            ],
            selected: null,
            correct: null,
             correctanswer:2
        },
        {
            type: "text",
            topic: "PHP",
            text: "Which of the following function is used to get length of a string?",
            possibilities: [
                {
                    answer: "size()"
                },
                {
                    answer: "strlen()"
                },
                {
                    answer: "length"
                },
                {
                    answer: "None of the above."
                }
            ],
            selected: null,
            correct: null,
            correctanswer:2
        },
        {
            type: "text",
            topic: "PHP",
            text: "Which of the following function sorts an array in reverse order?",
            possibilities: [
                {
                    answer: "RSORT()"
                },
                {
                    answer: "sort()"
                },
                {
                    answer: "suffle()"
                },
                {
                    answer: "reset()"
                }
            ],
            selected: null,
            correct: null,
             correctanswer:0
        },
        {
            type: "text",
            topic: "PHP",
            text: "Which of the following function checks if a specified value exists in an array?",
            possibilities: [
                {
                    answer: "extract()"
                },
                {
                    answer: "in_array()"
                },
                {
                    answer: "key()"
                },
                {
                    answer: "krsort()"
                }
            ],
            selected: null,
            correct: null,
             correctanswer:3
        },
        {
            type: "text",
            topic: "PHP",
            text: "Which of the following is used to create a session?",
            possibilities: [
                {
                    answer: "session_start() function"
                },
                {
                    answer: "$_SESSION[]"
                },
                {
                    answer: "isset() function"
                },
                {
                    answer: "session_destroy() function"
                }
            ],
            selected: null,
            correct: null,
             correctanswer:3
        },
        {
            type: "text",
            topic: "PHP",
            text: "Which of the following provides the error code associated with this file upload?",
            possibilities: [
                {
                    answer: "$_FILES['file']['error']"
                },
                {
                    answer: "$_FILES['file']['name']"
                },
                {
                    answer: "$_FILES['file']['size']"
                },
                {
                    answer: "$_FILES['file']['type']"
                }
            ],
            selected: null,
            correct: null
        },
        {
            type: "text",
            topic: "PHP",
            text: "Which of the following method of Exception class returns formated string of trace?",
            possibilities: [
                {
                    answer: "getMessage()"
                },
                {
                    answer: "getCode()"
                },
                {
                    answer: "getString"
                },
                {
                    answer: "getTraceAsString()"
                }
            ],
            selected: null,
            correct: null,
             correctanswer:3
        },
        {
            type: "text",
            topic: "PHP",
            text: "Which of the following method acts as a constructor function in a PHP class?",
            possibilities: [
                {
                    answer: "class_name()"
                },
                {
                    answer: "__construct"
                },
                {
                    answer: "constructor"
                },
                {
                    answer: "None of the above."
                }
            ],
            selected: null,
            correct: null,
             correctanswer:3
        },
        {
            type: "text",
            topic: "ios",//http://www.ios-blog.co.uk/quiz?question=10
            text: "Which of the following structures has both computed and stored properties?",
            possibilities: [
                {
                    answer: "struct Rect { var origin = CGPointZero var center: CGPoint { get { // } set { // } } }"
                },
                {
                    answer: "struct Rect { var center: CGPoint { get { // } set { // } } }"
                },
                {
                    answer: "struct Rect { let origin = CGPointZero }"
                },
                {
                    answer: "struct Rect { var origin = CGPointZero var center: CGPointMake(0,0) }"
                }
            ],
            selected: null,
            correct: null,
            correctanswer:3
        },
        {
            type: "text",
            topic: "ios",
            text: "Which one of the below functions definitions is wrong considering Swift language?",
            possibilities: [
                {
                    answer: "func haveChar(#string: String, character: Character) -> (Bool)"
                },
                {
                    answer: "func mean(numbers: Double...) -> Double"
                },
                {
                    answer: "func minMax(array: [Int]) -> (min: Int, max: Int)?"
                },
                {
                    answer: "func minMax(array: [Int]) -> (min: Int?, max: Int?)"
                }
            ],
            selected: null,
            correct: null,
             correctanswer:3
        },
        {
            type: "text",
            topic: "ios",
            text: "Which keyword do you use to declare enumeration?",
            possibilities: [
                {
                    answer: "var"
                },
                {
                    answer: "let"
                },
                {
                    answer: "enum"
                },
                {
                    answer: "e(num)"
                }
            ],
            selected: null,
            correct: null,
            correctanswer:2
        },
        {
            type: "text",
            topic: "ios",
            text: "Which of the following declares a mutable array in Swift?",
            possibilities: [
                {
                    answer: "let x = [Int]()"
                },
                {
                    answer: " var x = [Int]"
                },
                {
                    answer: "var x = [Int]()"
                },
                {
                    answer: "let x = [Int]"
                }
            ],
            selected: null,
            correct: null,
            correctanswer:3
        },
        {
            type: "text",
            topic: "ios",
            text: "Which of these is an appropriate syntax for declaring a function that takes an argument of a generic type?",
            possibilities: [
                {
                    answer: "generic func genericFunction(argument: T) { "
                },
                {
                    answer: "func genericFunction<T>(argument) { }"
                },
                {
                    answer: "func genericFunction(argument: T<Generic>) { }"
                },
                {
                    answer: "func genericFunction<T>(argument: T) { }"
                }
            ],
            selected: null,
            correct: null,
            correctanswer:3
        },
       
        {
            type: "text",
            topic: "ios",
            text: "Which of these is not a valid property declaration in Swift?",
            possibilities: [
                {
                    answer: "final let x = 0"
                },
                {
                    answer: " final lazy let x = 0"
                },
                {
                    answer: "final lazy var x = 0"
                },
                {
                    answer: "final var x = 0"
                }
            ],
            selected: null,
            correct: null,
            correctanswer:3
        },
        {
            type: "text",
            topic: "ios",
            text: "All Swift classes must inherit from which root class?",
            possibilities: [
                {
                    answer: "Not Required"
                },
                {
                    answer: "NSObject"
                },
                {
                    answer: "NSRootObject"
                },
                {
                    answer: "@ObjC"
                }
            ],
            selected: null,
            correct: null,
            correctanswer:0
        },
        {
            type: "text",
            topic: "ios",
            text: "Which of the following statements could be used to determine if a given variable is of String type?",
            possibilities: [
                {
                    answer: "if unknownVariable is String { }"
                },
                {
                    answer: "if unkownVariable: String { }"
                },
                {
                    answer: "if unkownVariable = String() { }"
                },
                {
                    answer: "if unkownVariable <> String[] { }"
                }
            ],
            selected: null,
            correct: null,
            correctanswer:2
        },
        {
            type: "text",
            topic: "ios",
            text: "What would be used for safe casting and to return nil if failed?",
            possibilities: [
                {
                    answer: "as?"
                },
                {
                    answer: "as!"
                },
                {
                    answer: "!as?"
                },
                {
                    answer: "!as!"
                }
            ],
            selected: null,
            correct: null,
            correctanswer:3
        },
        {
            type: "text",
            topic: "Android",
            text: "What is a context in android ?",
            possibilities: [
                {
                    answer: "It is an interface to store global information about an application"
                },
                {
                    answer: "It is used to create new components."
                },
                {
                    answer: "Android has two contexts, those are getContext() and getApplicationContext()"
                },
                {
                    answer: "All of Above"
                }
            ],
            selected: null,
            correct: null,
             correctanswer:2
        },
        {
            type: "text",
            topic: "Android",
            text: "How to move services to foreground in android?",
            possibilities: [
                {
                    answer: "Services always work in Foreground only"
                },
                {
                    answer: "No,We can't do this query"
                },
                {
                    answer: "Using startService(Intent intent)"
                },
                {
                    answer: "startFordgroud(int id, Notification notification)."
                }
            ],
            selected: null,
            correct: null,
            correctanswer:3
        },
        {
            type: "text",
            topic: "Android",
            text: "What is the difference between services and thread in android?",
            possibilities: [
                {
                    answer: "Services performs functionalities in the background. By default services run on main thread only"
                },
                {
                    answer: "Thread and services are having same functionalities."
                },
                {
                    answer: "Thread works on services"
                },
                {
                    answer: "None of the above"
                }
            ],
            selected: null,
            correct: null,
            correctanswer:3
        },
        {
            type: "text",
            topic: "Android",
            text: "How to access the context in android content provider?",
            possibilities: [
                {
                    answer: "Using getContext() in onCreate()"
                },
                {
                    answer: "Using intent()"
                },
                {
                    answer: "Using getApplicationContext() at anywhere in an application"
                },
                {
                    answer: "A & C or A & B"
                }
            ],
            selected: null,
            correct: null,
            correctanswer:2
        },
        {
            type: "text",
            topic: "Android",
            text: "What is singleton class in android?",
            possibilities: [
                {
                    answer: "A class that can create only one object"
                },
                {
                    answer: "Anonymous class"
                },
                {
                    answer: "Java class"
                },
                {
                    answer: "Manifest file"
                }
            ],
            selected: null,
            correct: null,
             correctanswer:2
        },
        {
            type: "text",
            topic: "Android",
            text: "What is ADB in android?",
            possibilities: [
                {
                    answer: "Image tool"
                },
                {
                    answer: "Development tool"
                },
                {
                    answer: "Android Debug Bridge"
                },
                {
                    answer: "None of the above."
                }
            ],
            selected: null,
            correct: null,
             correctanswer:1
        },
        {
            type: "text",//https://www.tutorialspoint.com/android/android_online_quiz.htm
            topic: "Android",
            text: "What is the package name of HTTP client in android?",
            possibilities: [
                {
                    answer: "com.json"
                },
                {
                    answer: "org.apache.http.client"
                },
                {
                    answer: "com.android.JSON"
                },
                {
                    answer: "org.json"
                }
            ],
            selected: null,
            correct: null,
             correctanswer:2
        },
        
        {
            type: "text",
            topic: "Android",
            text: "Is it possible activity without UI in android?",
            possibilities: [
                {
                    answer: "No, it's not possible"
                },
                {
                    answer: "Yes,it's possible"
                },
                {
                    answer: " We can't say"
                },
                {
                    answer: "None of the above"
                }
            ],
            selected: null,
            correct: null,
             correctanswer:2
        },
        {
            type: "text",
            topic: "Android",
            text: "What is anchor view?",
            possibilities: [
                {
                    answer: " Same as list view"
                },
                {
                    answer: "provides the information on respective relative positions"
                },
                {
                    answer: "Same as relative layout"
                },
                {
                    answer: "None of the above"
                }
            ],
            selected: null,
            correct: null,
             correctanswer:3
        },
        {
            type: "text",
            topic: "python",//https://www.tutorialspoint.com/python/python_online_quiz.htm
            text: "Which of the following is correct about Python?",
            possibilities: [
                {
                    answer: "It supports functional and structured programming methods as well as OOP."
                },
                {
                    answer: "It can be used as a scripting language or can be compiled to byte-code for building large applications."
                },
                {
                    answer: "It provides very high-level dynamic data types and supports dynamic type checking."
                },
                {
                    answer: "All of the above."
                }
            ],
            selected: null,
            correct: null,
             correctanswer:2
        },
        {
            type: "text",
            topic: "python",
            text: "What is the output of print str[0] if str = 'Hello World!'?",
            possibilities: [
                {
                    answer: "Hello World!"
                },
                {
                    answer: "H"
                },
                {
                    answer: "ello World"
                },
                {
                    answer: "None of above"
                }
            ],
            selected: null,
            correct: null,
             correctanswer:2
        },
        {
            type: "text",
            topic: "python",
            text: "What is the output of print tuple[0] if tuple = ( 'abcd', 786 , 2.23, 'john', 70.2 )?",
            possibilities: [
                {
                    answer: "( 'abcd', 786 , 2.23, 'john', 70.2 )"
                },
                {
                    answer: "abcd"
                },
                {
                    answer: "Error"
                },
                {
                    answer: "None of the above."
                }
            ],
            selected: null,
            correct: null,
             correctanswer:1
        },
        
        {
            type: "text",
            topic: "python",
            text: "Which of the following function convert a String to an object in python?",
            possibilities: [
                {
                    answer: "repr(x)"
                },
                {
                    answer: "eval(str)"
                },
                {
                    answer: "tuple(s)"
                },
                {
                    answer: "list(s)"
                }
            ],
            selected: null,
            correct: null,
             correctanswer:1
        },
        {
            type: "text",
            topic: "python",
            text: "Which of the following function convert a string to a frozen set in python?",
            possibilities: [
                {
                    answer: "set(x)"
                },
                {
                    answer: "dict(d)"
                },
                {
                    answer: "frozenset(s)"
                },
                {
                    answer: "chr(x)"
                }
            ],
            selected: null,
            correct: null,
             correctanswer:1
        },
        {
            type: "text",
            topic: "python",
            text: "Which of the following operator in python evaluates to true if it does not finds a variable in the specified sequence and false otherwise?",
            possibilities: [
                {
                    answer: "**"
                },
                {
                    answer: "//"
                },
                {
                    answer: "is"
                },
                {
                    answer: "Not in"
                }
            ],
            selected: null,
            correct: null,
             correctanswer:3
        },
        {
            type: "text",
            topic: "python",
            text: "Which of the following function checks in a string that all characters are in uppercase?",
            possibilities: [
                {
                    answer: " isupper()"
                },
                {
                    answer: "join(seq)"
                },
                {
                    answer: "len(string)"
                },
                {
                    answer: "ljust(width[, fillchar])"
                }
            ],
            selected: null,
            correct: null,
             correctanswer:0
        },
        {
            type: "text",
            topic: "python",
            text: "Which of the following function removes all leading whitespace in string?",
            possibilities: [
                {
                    answer: "lower()"
                },
                {
                    answer: "lstrip()"
                },
                {
                    answer: "max(str)"
                },
                {
                    answer: " min(str)"
                }
            ],
            selected: null,
            correct: null,
             correctanswer:1
        },
        {
            type: "text",
            topic: "python",
            text: "What is the output of len([1, 2, 3])?",
            possibilities: [
                {
                    answer: "1"
                },
                {
                    answer: "2"
                },
                {
                    answer: "3"
                },
                {
                    answer: "4"
                }
            ],
            selected: null,
            correct: null,
             correctanswer:2
        },
        {
            type: "text",
            topic: "python",
            text: "What is the following function removes last object from a list?",
            possibilities: [
                {
                    answer: "list.index(obj)"
                },
                {
                    answer: "list.insert(index, obj)"
                },
                {
                    answer: "list.pop(obj=list[-1])"
                },
                {
                    answer: "list.remove(obj)"
                }
            ],
            selected: null,
            correct: null,
             correctanswer:2
        },


    ];
    


 