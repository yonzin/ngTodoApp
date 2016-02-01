'use strict';

app.controller('MainController', ['$rootScope', '$scope', '$routeParams', 'todoProvider', 'todoService', function ($rootScope, $scope, $routeParams, todoProvider, todoService) {
    var controller = this;
    controller.todos = [];
    controller.editedTodo = null;

    todoService.awesomeFct();

    $scope.$on( 'todos.update', function( event ) {
        controller.todos = todoProvider.todos;
        console.log("event todos.update");
    });

    todoProvider.then(function (provider) {
        todoProvider = provider;
        controller.todos = todoProvider.todos;
    });

    controller.toggleCompleted = function(todo) {
        todoProvider.update(todo);
    };

    controller.removeTodo = function(todo) {
        console.log("remove", todo);
        todoProvider.remove(todo);
    };

    controller.editTodo = function(todo) {
        console.log('edit todo', todo);
        controller.editedTodo = todo;
    };

    controller.saveEdits = function(todo) {
        todoProvider.update(todo);
        controller.editedTodo = null;
    };

    controller.setFilter = function(option) {
        console.log(option);
        switch(option){
            case 'todo':
                controller.filterOptions = {completed: false};
                break;
            case 'done':
                controller.filterOptions = {completed: true};
                break;
            default:
            case 'all':
                controller.filterOptions = {};
                break;
        }
        controller.activeOption = option;
    };

    controller.setFilter($routeParams.status || 'all');

}]);

app.controller('addTodoController', ['todoProvider', '$scope', function (todoProvider, $scope) {
    var controller = this;
    this.newTodo= {};

    todoProvider.then(function (provider) {
        controller.todoProvider = provider;
    });

    this.addTodo = function(todo) {
        controller.todoProvider.add(todo);
        this.newTodo= {};
    };
}]);
