angular.module("angular-simple-table",[])

.directive('simpleTable',['$filter', function($filter) {
    window.TableSettings = function (data){
        this.data = data;
        var itemsPerPage = 25;
        var currentPage = 1;
        this.setItemsPerPage = function(limit){ itemsPerPage = limit; };
        this.getItemsPerPage = function(){return itemsPerPage;};
        this.getCurrentPage = function(){return currentPage;};
        this.setCurrentPage = function(nr){currentPage = nr;};
        this.setData = function(data){ this.data = data; };
        this.getData = function(){
            var filteredData = data;
            //filter Current Page and Number of Items Per Page
            var startIndex = (currentPage - 1) * itemsPerPage;
            filteredData = filteredData.slice(startIndex,startIndex + itemsPerPage);
            return filteredData;
        };
    };

    var link = function($scope, iElement, iAttrs,nullController, transclude){
        //assign the table to directive's isolated scope
        var table = document.querySelectorAll('[data-table-settings]');
        for(var item in table){
            if(table.hasOwnProperty(item)){
                var currentItem = table[item];
                if(iAttrs['tableSettings'] === currentItem.getAttribute("data-table-settings") && currentItem.tagName === "TABLE"){
                    $scope.table = table[item];
                };
            }
        }
        //add thead
        iElement.prepend(document.createElement("tHead"));

        //watch for data change
        $scope.$watch(
            function(){
                var row = $scope.table.children[1].children[0];
                return row;
            },
            function(newValue,oldValue){
                //if table rows appear for the first time
                if(typeof newValue !== 'undefined'){
                    var row = newValue;

                     //select tr from thead
                    var headRow = $scope.table.children[0];
                    headRow.innerHTML='';
                    allTd = row.children;
                    var tr = document.createElement("tr");
                    for(var item in allTd){
                        if(allTd.hasOwnProperty(item)){
                            var th = document.createElement("th");
                            th.innerHTML = allTd[item].getAttribute("title");
                            tr.appendChild(th);
                        }
                    }
                    headRow.appendChild(tr);
                }
        });
    };

    return {
        scope:{
                tableSettings: "&"
        },
        priority:1001,
        restrict: 'EA',
        template: '',
        link: link,
    };
}]);
