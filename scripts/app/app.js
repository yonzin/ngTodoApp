'use strict';
var dependencies = [
    'ngAnimate',
    'ngRoute',
    'ng'
];
angular.module('todoApp', [
            'ngAnimate',
            'ngRoute',
            'ng'
        ])
        .config(function ($routeProvider) {
            var routeConfig = {
                templateUrl: 'scripts/app/views/main.html'
            };

            $routeProvider
                .when('/', routeConfig)
                .when('/:status', routeConfig)
                .otherwise({
                    redirectTo: '/'
                });
        })
        .directive("addTodoPanel", function () {
            return {
                restrict: 'E',
                templateUrl: 'scripts/app/views/addTodo.html',
                controller: 'addTodoController',
                controllerAs: 'addTodoCtrl'
            };
        })
        .directive("listTodoPanel", function () {
            return {
                restrict: 'E',
                templateUrl: 'scripts/app/views/listTodoPanel.html',
                controller: 'MainController',
                controllerAs: 'todoCtrl'
            };
        })
    ;
