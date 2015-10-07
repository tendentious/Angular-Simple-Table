angular.module("myApp",["angular-simple-table"]).

    controller('main-controller',["$scope",'$timeout',function($scope,$timeout){
        $scope.users = [
            {"id":1,"name":"John","country":"Romania","age":22},
            {"id":2,"name":"Mary","country":"Germany","age":24},
            {"id":3,"name":"Alex","country":"France","age":34},
            {"id":4,"name":"Frank","country":"U.S.A.","age":65},
            {"id":5,"name":"Mario","country":"Italy","age":40}
        ];

            $scope.test = [{"first":1,"second":2,"third":3},
            {"first":41,"second":42,"third":43},
            {"first":21,"second":22,"third":23}
                ];

        //$timeout(function(){
        //    $scope.myTableSettings2.setCurrentPage(2);
        //    $scope.$digest();
        //},2000);
        //setInterval(function(){
        //    console.log("interval");
        //    if($scope.myTableSettings.data == false){
        //        $scope.myTableSettings.data = $scope.test;
        //        $scope.myTableSettings2.data = $scope.users;
        //        $scope.$digest();}
        //    else{
        //        $scope.myTableSettings.data = false;
        //        $scope.myTableSettings2.data = false;
        //        $scope.$digest();
        //    }
        //},1000);
        console.log("main");
        $scope.myTableSettings = new TableSettings($scope.test);
        $scope.myTableSettings2 = new TableSettings($scope.users);
        $scope.myTableSettings2.setItemsPerPage(3);
        $scope.myTableSettings2.setCurrentPage(1);
        //$scope.myTableSettings = new TableSettings(1);
        //$scope.myTableSettings2 = new TableSettings(2);

    }]);