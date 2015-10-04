angular.module("angular-simple-table",[])
//	.directive('ngSparkline',function(){
//            console.log(1);
////        var link = function(scope, iElement, iAttrs, ctrl){
////            console.log(1);
////        };
//
//return {
//    restrict: 'A',
//    template: '<div class="sparkline"></div>'
//  };
//        return{
////            transclude:true,
////            link:link,
//            restrict:'EA',
//            scope:true
//        };
//    });

    .directive('simpleTable', function($compile) {
        var link = function(scope, iElement, iAttrs,nullController, transclude){
            transclude(function(clone){
                iElement.append(clone);
            });
        };

        return {
            transclude:true,
            scope:true,
            restrict: 'EA',
            template: '<div class="sparkline"></div>',
            link: link
        };
    });