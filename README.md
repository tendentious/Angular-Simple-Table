# Angular-Simple-Table
A simple table module with sorting and filters for general use. This project uses Angular JS v1.4.7 .

Working example on : http://plnkr.co/sJUFaBLVlfIFVhwBmAqC?p=info
  
  
  
## How to use

### Include
Simple include the module in your html file the angular-simple-table normal or minified file and add the dependency `angular-simple-table` in your application like here :

    angular.module("myApp",["angular-simple-table"])

### Setting the table
In your angular application .js file instantiate a new TableSettings Object([see the object properties and methods below](#table-settings)) and assign it to a scope variable. 
The data you wish to show in the table can be passed in the constructor or to the object's data property:
  
    $scope.myTableSettings = new TableSettings(myData);

or

    $scope.myTableSettings = new TableSettings();
    $scope.myTableSettings.data = myData;

In your html file add the attribute simple-table to the table you wish to bind with the angular directive.
The value of this attribute should be the name of the scope variable that holds the table settings:

    <table simple-table="myTableSettings"></table>

For the table content loop through the filtered data of the table settings variable:

    <tr ng-repeat="person in myTableSettings.getFilteredData() track by $index">
        <td title="#" data-sort-by="Id">
            {{person.id}}
        </td>
        <td title="Name" data-sort-by="Name">
            {{person.name}}
        </td>
        <td  title='Country' data-sort-by="Country">
            {{person.country}}
        </td>
        <!--not sortable-->
        <td title='Age'>
            {{person.age}}
        </td>
  </tr>

Note the attributes of the columns maked by the td elements in the ng-repeat directive. 
The title attribute is the name of the column that will appear in the Table Head. 
The optional data-sort-by attribute is used to make the column sortable by clicking on the title.

### Paginator

To set up a paginator for the table you can copy the template from the public_html/index.html file. 
If you have limited data to display and do not plan to use a paginator make sure the 'itemsPerPage' property 
of the TableSettings object is set to value at least as high as the number of rows you intend to show.

### Filters

You can set up a number of filters by using the 'searchBy' method of the TableSettings object:

    <input type="text" id="sgeneral" ng-model="mySearch" ng-change="myTableSettings.searchBy(mySearch)" >

for a general filter or :

    <input type="text" ng-model="nameSearch" ng-change="myTableSettings.searchBy(nameSearch, 'name')" >

for a specific property search in the table data. Note that the second parameter is a string and is case-sensitive.
 
## Table Settings

TableSettings object is used to pass settings to the table.

### Properties

    TableSettings.data   | Array
  
  The data to be displayed in the table.
  
    TableSettings.reverseSort   | Boolean
  
  Makes the filter reverse the order of the data( this boolean is only used in the orderBy method).
  
    TableSettings.orderField | String
  
  Automatically assigned by orderBy() method. Keeps track of the currently used field as order filter.
  
    TableSettings.itemsPerPage | Number

  Limits the number of rows displayed on every page.
  
### Methods

    TableSettings.getCurrentPage()
  
  Returns the current page number.
  
    TableSettings.setCurrentPage(nr)
  
  Sets the current page to be displayed.
  
    TableSettings.getTotalPagesArray()
  
  Returns an array with length equal to total pages. Used in the paginator's ng-repeat directive.
  
    TableSettings.getTotalPages()
  
  Returns the number of pages.
  
    TableSettings.getFilteredData()
  
  Returns the data after it has been filtered, ordered, etc. This is used in the table's main ng-repeat directive.
  
    TableSettings.searchBy(text,field)
  
  Filters the data by param 'text'. If parameter field is set the filter will only run through the data property named by field.
  The field parameter is case-sensitive so passing "Name" as value when the table data has "name" as property will result in no match 
  at all and no data display in the table.
  
    TableSettings.orderBy(field,noReverse)
  
  Used to order data by field. The field parameter sets the field to order data by and is case-sensitive. 
  Every call to the method toggles the property reverseSort and consequently the ordering order from ascending to descending and reverse.
  The second boolean parameter is used to disable the toggling effect. Passing true for noReverse will result in keeping the ordering 
  ascending or descending (according to property TableSettings.reverseSort) for the current method call.
  
