angular.module("angular-simple-table",[])
.directive('simpleTable',['$filter','$compile', function($filter,$compile) {
    window.TableSettings = function (data){
        this.data = data || null;
        this.reverseSort = false;
        this.orderField = null;
        var search = {};
        this.itemsPerPage = 25;
        var currentPage = 1;
        var filteredData = null;
        this.getCurrentPage = function(){return currentPage;};
        this.setCurrentPage = function(nr){currentPage = nr;};
        this.getTotalPagesArray = function(){
            if(filteredData){
                return new Array(Math.ceil(filteredData.length/this.itemsPerPage))};
            }
        this.getTotalPages = function(){
            if(filteredData){
                return Math.ceil(filteredData.length/this.itemsPerPage)
            }
        };
        this.getFilteredData = function(){
            if(filteredData && this.data ){
                //filter Current Page and Number of Items Per Page
                var startIndex = (currentPage - 1) * this.itemsPerPage;
                return filteredData.slice(startIndex,startIndex + this.itemsPerPage);
            }else{
                filteredData = this.data;
            }

        };
        this.searchBy = function (text,field){
            //removes ordering filter and resets page to 1
            currentPage = 1;
            this.orderField = false;
            var name = field || '$';
            search[name] =   text ;
            filteredData = $filter('filter')(this.data, search, false);
        }
        this.orderBy = function(field,alternateReverse){
            this.orderField = field;
            var keepReverseState = alternateReverse || false;
            if(!keepReverseState){
                this.reverseSort = !this.reverseSort;
            }
            filteredData = $filter('orderBy')(filteredData, field.toLowerCase(), this.reverseSort);
        };
    };


    var link = function(scope, iElement, iAttrs){
            $compile(iElement);
        //assign the table to directive's isolated scope
        var table = document.querySelectorAll('[simple-table]');
        var simpleTable = iAttrs['simpleTable'];
        for(var item in table){
            if(table.hasOwnProperty(item)){
                var currentItem = table[item];
                if(iAttrs['simpleTable'] === currentItem.getAttribute("simple-table") && currentItem.tagName === "TABLE"){
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
                    //add th to thead
                    for(var item in allTds){
                        if(allTds.hasOwnProperty(item)){
                            var th = document.createElement("th");

                            var dataSort = allTds[item].getAttribute("data-sort-by");
                            if(dataSort){
                                var title = allTds[item].getAttribute("title");
                                th.innerHTML = '<a href="javascript:void(0)" ng-click="'+simpleTable+'.orderBy(\''+title+'\')" >'+
                                title + '&nbsp;&nbsp;<span ng-show="' + simpleTable+'.orderField == \''+title+'\'"><span ng-show="!'+simpleTable+'.reverseSort">&#9650;</span><span ng-show="'+simpleTable+'.reverseSort">&#9660;</span></span></a>' ;
                            }else{
                                th.innerHTML = allTds[item].getAttribute("title");
                            }

                            tr.appendChild(th);
                        }
                    }
                    //compiled the data to the parent scope
                    var compiled = $compile(tr)(scope.$parent);
                    headRow.appendChild(compiled[0]);
                }
        });
    };

    return {
        scope:{
                simpleTable: "&"
        },
        restrict: 'EA',
        template: '',
        link: link,
    };
}]);
