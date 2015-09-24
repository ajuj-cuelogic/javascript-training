//@Author AJu John


var scotchTodo = angular.module('scotchTodo', []);

function mainController($scope, $http) {
    $scope.formData = {};

    // when landing on the page, get all todos and show them
    $http.get('/api/todos')
        .success(function(data) {
            $scope.todos = [];
            $scope.todosCompleted = [];
            //loop to divide data in two objects according to the status
            for(var i = 0; i<data.length; i++)
            {
                if(data[i].status == true)
                    $scope.todosCompleted.push(data[i]);
                else
                    $scope.todos.push(data[i]);
            }
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // when submitting the add form, send the text to the node API
    $scope.createTodo = function() {
        $http.post('/api/todos', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.todos = [];
                $scope.todosCompleted = [];
                //loop to divide data in two objects according to the status
                for(var i = 0; i<data.length; i++)
                {
                    if(data[i].status == true)
                        $scope.todosCompleted.push(data[i]);
                    else
                        $scope.todos.push(data[i]);
                }
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

// update status of a todo by _id
    $scope.updateTodo = function(id,status) {
        $http.put('/api/todos',{todo_id:id, status:status})
            .success(function(data) {
                $scope.todos = [];
                $scope.todosCompleted = [];
                //loop to divide data in two objects according to the status
                for(var i = 0; i<data.length; i++)
                {
                    if(data[i].status == true)
                        $scope.todosCompleted.push(data[i]);
                    else
                        $scope.todos.push(data[i]);
                }
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };


    // delete a todo by _id
    $scope.deleteTodo = function(id) {
        $http.delete('/api/todos/' + id)
            .success(function(data) {
                $scope.todos = [];
                $scope.todosCompleted = [];
                //loop to divide data in two objects according to the status
                for(var i = 0; i<data.length; i++)
                {
                    if(data[i].status == true)
                        $scope.todosCompleted.push(data[i]);
                    else
                        $scope.todos.push(data[i]);
                }
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

}