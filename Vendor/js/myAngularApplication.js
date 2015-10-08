angular.module("myApp",["angular-simple-table"]).

    controller('main-controller',["$scope",function($scope){
        $scope.users = [
            {"id":1,"name":"John","country":"Romania","age":22},
            {"id":2,"name":"Mary","country":"Germany","age":24},
            {"id":3,"name":"Alex","country":"France","age":34},
            {"id":4,"name":"Frank","country":"U.S.A.","age":65},
            {"id":5,"name":"Mario","country":"Italy","age":40},
            {"id":6,"name":"Henry","country":"U.K.","age":65},
            {"id":7,"name":"Jaque","country":"France","age":52},
            {"id":8,"name":"Karl","country":"Austria","age":53},
            {"id":9,"name":"Abdul","country":"Iraq","age":63},
            {"id":10,"name":"Igor","country":"Russia","age":33},
            {"id":11,"name":"Jugo","country":"Spain","age":28}
        ];


        $scope.myTableSettings = new TableSettings($scope.users);
        $scope.myTableSettings.itemsPerPage = 3;

        $scope.selectOptions = [1,3,5,10];

    }]);