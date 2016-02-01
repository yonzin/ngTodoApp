'use strict';

app.controller('MainController', ['$rootScope', '$scope', '$routeParams', 'todoProvider', 'todoService', function ($rootScope, $scope, $routeParams, todoProvider, todoService) {
    var controller = this;
    $scope.todos = [];
    $scope.editedTodo = null;

    todoService.awesomeFct();

    $scope.$on( 'todos.update', function( event ) {
        $scope.todos = todoProvider.todos;
        console.log("event todos.update");
    });

    todoProvider.then(function (provider) {
        todoProvider = provider;
        $scope.todos = todoProvider.todos;
    });

    $scope.toggleCompleted = function(todo) {
        todoProvider.update(todo);
    };

    $scope.removeTodo = function(todo) {
        console.log("remove", todo);
        todoProvider.remove(todo);
    };

    $scope.editTodo = function(todo) {
        console.log('edit todo', todo);
        $scope.editedTodo = todo;
    };

    $scope.saveEdits = function(todo) {
        todoProvider.update(todo);
        $scope.editedTodo = null;
    };

    $scope.setFilter = function(option) {
        console.log(option);
        switch(option){
            case 'todo':
                $scope.filterOptions = {completed: false};
                break;
            case 'done':
                $scope.filterOptions = {completed: true};
                break;
            default:
            case 'all':
                $scope.filterOptions = {};
                break;
        }
        $scope.activeOption = option;
    };

    $scope.setFilter($routeParams.status || 'all');

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
