# Angular-Simple-Table
A simple table module with sorting and filters for general use. This project uses Angular JS v1.4.7 .

Working example on : http://plnkr.co/sJUFaBLVlfIFVhwBmAqC?p=info
  
  
  
## How to use

### Include
Simply include the module in your html file (normal or minified file from the Vendor/js folder) and add the dependency `angular-simple-table` in your application like this :

    angular.module("myApp",["angular-simple-table"])

### Setting the table
In your angular application .js file instantiate a new TableSettings Object([see the object properties and methods below](#table-settings)) and assign it to a scope variable. 
The data you wish to show in the table can be passed in the constructor or to the object's data property:
  
    $scope.myTableSettings = new TableSettings(myData);

or

    $scope.myTableSettings = new TableSettings();
    $scope.myTableSettings.setData(myData);

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

Note the attributes of the columns marked by the td elements in the ng-repeat directive.
The title attribute is the name of the column that will appear in the Table Head. 
The optional data-sort-by attribute is used to make the column sortable by clicking on the title.

### Paginator

To set up a paginator for the table you can copy the template from the public_html/index.html file. 
If you have limited data to display and do not plan to use a paginator make sure you use 'setRows()' method
with the number of rows you intend to show as argument (defaults to 25).

### Filters

You can set up filters by using the 'search' method of the TableSettings object:

    <input type="text" ng-model="mySearch" ng-change="myTableSettings.search(mySearch,'country','description.eye_color')" >

The first parameter is a string (model in our case) which holds the text to search for. From the second argument forth
you can pass any number of fields to search in (you can also search in subarrays one level deep).
For general search (search in all fields) pass only the first argument (search string):

    <input type="text" ng-model="generalSearch" ng-change="myTableSettings.search(generalSearch)" >

Note that the field arguments are case-sensitive strings.
 
## Table Settings

TableSettings object is used to pass settings to the table.

### Methods

    getReverseSort()
  
  Returns the a boolean specifying whether or not the order by field is done in reverse order.
  
    setReverseSort(boolean)
  
  Sets reverse sort field.

    getOrderField()

  Returns the of the field which is used to order the filtered data by.

    setOrderField(fieldName)

  Sets the field to order the data by.

    getPage()

  Returns the current page number.

    setPage(nr)

  Sets the current data to be displayed.

    getData()

  Returns the raw data displayed in the table (unfiltered, unordered).

    setData(data)

  Sets the data to be displayed in the table.
  
    getTotalPagesArray()
  
  Returns an array with length equal to total pages. Used in the paginator's ng-repeat directive.
  
    getTotalPages()
  
  Returns the number of pages.
  
    getFilteredData()
  
  Returns the data after it has been filtered, ordered, etc. This is used in the table's main ng-repeat directive.
  
    search(text,field...)
  
  Filters the data by param 'text'. One or more fields can be specified (as distinct arguments) to search through
  (you can even search in sub arrays one level deep). Specifying no field will search through all fields.
  The field parameter is case-sensitive so passing "Name" as value when the table data has "name" as property will result in no match 
  at all and no data display in the table.
  
    orderBy(field,keepReverseState)
  
  Used to order data by field. The field parameter sets the field to order data by and is case-sensitive. 
  Every call to the method toggles the property reverseSort and consequently the ordering from ascending to descending and reverse.
  The second boolean parameter is used to disable the toggling effect. Passing true for keepReverseState will result in keeping the ordering
  ascending or descending (according to property reverseSort) for the current method call.
  
