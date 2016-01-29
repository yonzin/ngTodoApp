'use strict';

app.service('todoService',  ['$rootScope', function ($rootScope) {
    var service = {
        awesomeFct: function() {
            //console.log($rootScope);
        }
    };

    return service;
}]);

app.provider('todoProvider', [function () {
        var provider =
        {
            rootScope: null,
            todos: [],
            find: function (id) {
                var todo = {};
                angular.forEach(provider.todos, function (value, key) {
                    if (id = value.id) {
                        todo = value;
                    }
                    return todo;
                });
            },

            get: function () {
                return this.todos;
            },

            add: function (newTodo) {
                var max = null;
                angular.forEach(provider.todos, function (value, key) {

                    if (max === null || max.id < value.id) {
                        max = value;
                    }
                });
                newTodo.id = newTodo.id || max.id + 1;
                newTodo.completed = false;
                provider.todos.push(newTodo);
                //console.log(provider.rootScope);
                provider.rootScope.$broadcast( 'todos.update' );
            },

            remove: function (toDelete) {
                var index = provider.todos.indexOf(toDelete);
                if (index > -1) {
                    provider.todos.splice(index, 1);
                    provider.rootScope.$broadcast( 'todos.update' );
                }
            },

            update: function (todo) {
                angular.forEach(provider.todos, function (value, key) {
                    if (todo.id == value.id) {
                        console.log("update", value, key);
                        provider.todos[key] = todo;
                        provider.rootScope.$broadcast( 'todos.update' );
                        return;
                    }
                });
            },
        };
        this.$get = ['$injector', '$http', '$q', function ($injector, $http, $q) {
            provider.rootScope = $injector.get('$rootScope');

            var deferred = $q.defer();
            $http.get('data/todos.json').success(function(data) {
                provider.todos = data;
                deferred.resolve(provider);
            });
            return deferred.promise;
        }];
    }]
);

