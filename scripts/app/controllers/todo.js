'use strict';

app.controller('MainController', ['$scope', 'todoProvider', function ($scope, todoProvider) {
    var controller = this;
    $scope.todos = [];
    $scope.editedTodo = null;
    $scope.activeOption = 'all';

    //$scope.$on( 'todos.update', function( event ) {
    //    $scope.todos = controller.todoProvider.todos;
    //});

    todoProvider.then(function (provider) {
        $scope.todoProvider = provider;
        $scope.todos = $scope.todoProvider.todos;
    });

    $scope.toggleCompleted = function(todo) {
        $scope.todoProvider.update(todo);
    };

    $scope.removeTodo = function(todo) {
        console.log("remove", todo);
        $scope.todoProvider.remove(todo);
    };

    $scope.editTodo = function(todo) {
        console.log('edit todo', todo);
        $scope.editedTodo = todo;
    };

    $scope.saveEdits = function(todo) {
        $scope.todoProvider.update(todo);
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
