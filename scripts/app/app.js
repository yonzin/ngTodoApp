'use strict';
var dependencies = [
    'ngAnimate',
    'ngRoute',
    'ng'
];
var app = angular
        .module('todoApp', [
            'ngAnimate',
            'ngRoute',
            'ng'
        ])
        .config(function ($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'scripts/app/views/main.html'
                })
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
