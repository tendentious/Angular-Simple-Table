angular.module("angular-simple-table",[])
    .directive('simpleTable',['$filter','$compile','filterFilter', function($filter,$compile,filterFilter) {
        window.TableSettings = function (data){
            this.data = data || null;
            this.reverseSort = false;
            this.orderField = null;

            this.itemsPerPage = 25;
            this.searchFields = {};
            var currentPage = 1;
            var filteredData = null;
            this.getCurrentPage = function(){return currentPage;};
            this.setCurrentPage = function(nr){currentPage = nr;};
            this.getTotalPagesArray = function(){
                if(filteredData){
                    return new Array(Math.ceil(filteredData.length/this.itemsPerPage))};
            };
            this.getTotalPages = function(){
                if(filteredData){
                    return Math.ceil(filteredData.length/this.itemsPerPage)
                }
            };
            this.getFilteredData = function(){
                //convert to array
                if(!(this.data instanceof Array) && typeof this.data === 'object' && this.data !== null){
                    var keys = Object.keys(this.data)
                    filteredData = this.data
                    filteredData = keys.map(function (key) {
                        return filteredData[key]; });
                }else{
                    filteredData = this.data;
                }

                //searchBy
                if(Object.keys(this.searchFields).length){
                    var result = [];
                    for (var property in this.searchFields) {
                        if (this.searchFields.hasOwnProperty(property)) {
                            //search for each field
                            if(property.indexOf('.') === -1)
                            {
                                var filtered = simpleSearch(this.searchFields[property],property,filteredData);

                            }else{
                                var filtered = subArraySearch(this.searchFields[property],property,filteredData);
                            }
                            filtered.forEach(function(elem,index,arr){
                                result.push(elem);
                            });

                        }
                    };
                    filteredData = remove_duplicates(result);
                }
                //orderBy
                if(typeof this.orderField == 'string'){
                    filteredData = $filter('orderBy')(filteredData, this.orderField.toLowerCase(), this.reverseSort);
                }
                if(filteredData && this.data ){
                    //filter Current Page and Number of Items Per Page
                    var startIndex = (currentPage - 1) * this.itemsPerPage;
                    //avoid non-existent page
                    if(startIndex > filteredData.length){
                        this.setCurrentPage(1);
                    }
                    return filteredData.slice(startIndex,startIndex + this.itemsPerPage);
                }else{
                    filteredData = this.data;
                }

            };

            function simpleSearch(text,field,data){
                var searched = [];
                var index = field || '$';
                searched[index] = text;
                var result = $filter('filter')(data, searched, false);
                return result;
            };
            function subArraySearch(text,field,data){
                var properties = field.split(".");
                var searchedField = [];
                searchedField[properties[1]] = text ;
                var result = [];
                data.forEach(function(elem,index,arr){
                    var filtered = $filter('filter')(elem[properties[0]],searchedField, false);
                    if(filtered.length > 0){
                        result.push(filteredData[index])
                    }
                });
                return result;
            };
            function remove_duplicates(objectsArray) {
                var usedObjects = {};

                for (var i=objectsArray.length - 1;i>=0;i--) {
                    var so = JSON.stringify(objectsArray[i]);

                    if (usedObjects[so]) {
                        objectsArray.splice(i, 1);

                    } else {
                        usedObjects[so] = true;
                    }
                }

                return objectsArray;

            }

            this.search = function(text,field){
                currentPage = 1;
                this.orderField = null;
                this.searchFields = {};
                //search by one field
                if(arguments.length<2){
                    var field = arguments[1] || '$';
                    this.searchFields[field] = arguments[0];
                }else{  //search by multiple fields

                    for (var i = 1; i < arguments.length; i++) {
                        var field = arguments[i];
                        this.searchFields[field] = arguments[0];
                    }
                }
                console.log(this.searchFields);
            };
            this.orderBy = function(field,noReverseToggle){
                this.orderField = field;
                if(!noReverseToggle){
                    this.reverseSort = !this.reverseSort;
                }
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
                                    var title = allTds[item].getAttribute("title") || '';
                                    th.innerHTML = '<a href="javascript:void(0)" ng-click="'+simpleTable+'.orderBy(\''+dataSort+'\')" >'+
                                        title + '&nbsp;&nbsp;<span ng-show="' + simpleTable+'.orderField == \''+dataSort+'\'"><span ng-show="!'+simpleTable+'.reverseSort">&#9650;</span><span ng-show="'+simpleTable+'.reverseSort">&#9660;</span></span></a>' ;
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
