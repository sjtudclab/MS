var routingDemoApp = angular.module('MSWeb', [ 'ui.router',
		'ui.bootstrap','examManage'])



routingDemoApp.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider.state('index', {
		url : '/index',
		views : {
			'' : {
				templateUrl : 'tpls/examManage/examManage.html'
			},
			'navi@index' : {
				templateUrl : 'tpls/examManage/navbar.html'
			},
			'tab1@index' : {
				templateUrl : 'tpls/examManage/tab/examImport.html'
			},
			'tab2@index' : {
				templateUrl : 'tpls/examManage/tab/tab2.html'
			},
			'stu1@index' : {
				templateUrl : 'tpls/examManage/tab/stuImport.html'
				
			},
			'stu2@index' : {
				templateUrl : 'tpls/examManage/tab/stuInput.html'
			},
			'room1@index' : {
				templateUrl : 'tpls/examManage/tab/roomImport.html'
			},
			'room2@index' : {
				templateUrl : 'tpls/examManage/tab/roomInput.html'
			},
			'stuExam1@index' : {
				templateUrl : 'tpls/examManage/tab/stuExam.html'
			},
			'stuRoom1@index' : {
				templateUrl : 'tpls/examManage/tab/stuRoom.html'
			},
			'setSystem1@index' : {
				templateUrl : 'tpls/examManage/tab/setSystem.html'
			}
			
		}
	})

	$urlRouterProvider.otherwise('/index');
});
