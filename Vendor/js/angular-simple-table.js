angular.module("angular-simple-table",[])

.directive('simpleTable',['$filter','$compile', function($filter,$compile) {
    window.TableSettings = function (data){
        this.data = data;
        this.reverseSort = false;
        this.orderField = null;
        var search = {};
        var itemsPerPage = 25;
        var currentPage = 1;
        var filteredData = data;
        this.setItemsPerPage = function(limit){ itemsPerPage = limit; };
        this.getItemsPerPage = function(){return itemsPerPage;};
        this.getCurrentPage = function(){return currentPage;};
        this.setCurrentPage = function(nr){currentPage = nr;};
        this.getTotalPagesArray = function(){return new Array(Math.ceil(data.length/itemsPerPage))};
        this.getTotalPages = function(){return Math.ceil(filteredData.length/itemsPerPage)};
        this.getFilteredData = function(){
            //filter Current Page and Number of Items Per Page
            var startIndex = (currentPage - 1) * itemsPerPage;
            return filteredData.slice(startIndex,startIndex + itemsPerPage);
        };
        this.searchBy = function (text,field){
            //removes ordering filter and resets page to 1
            currentPage = 1;
            this.orderField = false;
            var name = field || '$';
            search[name] =   text ;
            filteredData = $filter('filter')(this.data, search, false);
        }
        this.orderBy = function(field){
            this.orderField = field;
            this.reverseSort = !this.reverseSort;
            filteredData = $filter('orderBy')(filteredData, field.toLowerCase(), this.reverseSort);
        };
    };

    var link = function(scope, iElement, iAttrs,nullController, transclude){
            $compile(iElement);
        //assign the table to directive's isolated scope
        var table = document.querySelectorAll('[data-table-settings]');
        var tableSettings = iAttrs['tableSettings'];
        for(var item in table){
            if(table.hasOwnProperty(item)){
                var currentItem = table[item];
                if(iAttrs['tableSettings'] === currentItem.getAttribute("data-table-settings") && currentItem.tagName === "TABLE"){
                    scope.table = table[item];
                };
            }
        }
        //add thead
        iElement.prepend(document.createElement("tHead"));

        //watch for data change
        scope.$watch(
            function(){
                var row = scope.table.children[1].children[0];
                return row;
            },
            function(newValue,oldValue){
                //if table rows appear for the first time
                if(typeof newValue !== 'undefined'){
                    var row = newValue;

                     //select tr from thead
                    var headRow = scope.table.children[0];
                    headRow.innerHTML='';
                    var allTds = row.children;
                    var tr = document.createElement("tr");
                    for(var item in allTds){
                        if(allTds.hasOwnProperty(item)){
                            var th = document.createElement("th");

                            var dataSort = allTds[item].getAttribute("data-sort-by");
                            if(dataSort){
                                var title = allTds[item].getAttribute("data-sort-by");
                                th.innerHTML = '<a href="javascript:void(0)" ng-click="'+tableSettings+'.orderBy(\''+title+'\')" >'+
                                //th.innerHTML = '<a href="javascript:void(0)" ng-click="log()" >'+
                                    title + '&nbsp;&nbsp;<span ng-show="' + tableSettings+'.orderField == \''+title+'\'"><span ng-show="!'+tableSettings+'.reverseSort">&#9650;</span><span ng-show="'+tableSettings+'.reverseSort">&#9660;</span></span></a>' ;
                            }else{
                                th.innerHTML = allTds[item].getAttribute("title");
                            }

                            tr.appendChild(th);
                        }
                    }
                    //compiled the data to the parent scope
                    var compiled = $compile(tr)(scope.$parent);
                    headRow.appendChild(compiled[0]);
                    //$compile(iElement);
                }
        });
    };

    return {
        scope:{
                tableSettings: "&"
        },
        //priority:1001,
        restrict: 'EA',
        template: '',
        link: link,
    };
}]);
