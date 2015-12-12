angular.module("myApp",["angular-simple-table"]).

    controller('main-controller',["$scope",function($scope){
        $scope.users = [
            {id:1,name:"John",country:"Sweden",age:22,description:[{hair_color:"black",eye_color:"blue"}]},
            {id:2,name:"Mary",country:"Germany",age:24,description:[{hair_color:"red",eye_color:"green"}]},
            {id:3,name:"Alex",country:"France",age:34,description:[{hair_color:"blonde",eye_color:"black"}]},
            {id:4,name:"Frank",country:"U.S.A.",age:65,description:[{hair_color:"black",eye_color:"black"}]},
            {id:5,name:"Mario",country:"Italy",age:40,description:[{hair_color:"black",eye_color:"black"}]},
            {id:6,name:"Henry",country:"U.K.",age:65,description:[{hair_color:"blonde",eye_color:"blue"}]},
            {id:7,name:"Jaque",country:"France",age:52,description:[{hair_color:"black",eye_color:"black"}]},
            {id:8,name:"Jane",country:"Austria",age:53,description:[{hair_color:"red",eye_color:"blue"}]},
            {id:9,name:"Abdul",country:"Iraq",age:63,description:[{hair_color:"black",eye_color:"black"}]},
            {id:10,name:"Vladimir",country:"Russia",age:33,description:[{hair_color:"black",eye_color:"black"}]},
            {id:11,name:"Jugo",country:"Spain",age:28,description:[{hair_color:"grey",eye_color:"green"}]}
        ];


        $scope.myTableSettings = new TableSettings($scope.users);
        $scope.myTableSettings.setRows(3);

        $scope.selectOptions = [1,3,5,10];

    }]);