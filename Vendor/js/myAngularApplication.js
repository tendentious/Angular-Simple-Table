angular.module("myApp",["angular-simple-table"]).

    controller('main-controller',["$scope",function($scope){
        $scope.users = [{"name":"John","country":"Romania","age":22},
            {"name":"Mary","country":"Germany","age":24},
            {"name":"Alex","country":"France","age":34},
            {"name":"Frank","country":"U.S.","age":65},
            {"name":"Mario","country":"Italy","age":40}
        ];
        $scope.test = [{"first":1,"second":2,"third":3},
            {"first":41,"second":42,"third":43},
            {"first":21,"second":22,"third":23}
        ];
        console.log("main");
    }]);