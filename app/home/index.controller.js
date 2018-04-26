(function () {
    'use strict';
		var myApp = angular.module('app', []);
		myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
			console.log("I am in controller");
			$scope.todo=[];
			$scope.lastnumber='';

		var refresh = function() {
			$http.get('/contentfibonaci').success(function(response) {
				$scope.context = response;
			});
		};
		refresh();		
			
		function buildUrl(url, parameters){
		  var qs = ""
		  for(var key in parameters) {
				var value = parameters[key]
				qs += encodeURIComponent(key) + "=" + encodeURIComponent(value) + "&"
		  }
		  if (qs.length > 0){
				qs = qs.substring(0, qs.length-1)
				url = url + "?" + qs
		  }
		  return url
		}
		$scope.addContact = function() {
			try{ 
			  var tim =new Date(Date.parse(Date())).toString();
			  var pos = tim.indexOf('GMT');
			  var time = tim.substring(0,pos);
			  $scope.todo.push('Time request => '+time+'Send on server:'+$scope.contact.n);
			  $http.post('/boockwetelo', $scope.contact).success(function(response) {
				$scope.todo.push('Time respond => '+time+'Answer server:  '+response);
				if (response!='-'){
					$scope.lastnumber=response;
				}
			  });
			}catch(err){
				console.log('empty fild');
			}
		};
		
		$scope.deselect = function() {
		  	var count = '-';
			var url = "/boockwetelo/"
			var parameters = {
				count: count		  
			}
			var urlsend = buildUrl(url, parameters)
			$.ajax({
				url: urlsend,
				type: "POST",
				data: {"count":count
				},
				cache: false,
				success: function(response){
					console.log('Обнулили последовательность');
				}
			})
			var tim =new Date(Date.parse(Date())).toString();
			var pos = tim.indexOf('GMT');
			var time = tim.substring(0,pos);
			$scope.todo.push('Time request => '+time+'Send on server:  -');
		}		
	}]);﻿
})();