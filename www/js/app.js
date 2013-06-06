/*
 * JBoss, Home of Professional Open Source
 * Copyright 2013, Red Hat, Inc. and/or its affiliates, and individual
 * contributors by the @authors tag. See the copyright.txt in the
 * distribution for a full listing of individual contributors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/*
Core JavaScript functionality for the application.  Performs the required
Restful calls, validates return values, and populates the member table.
 */
var employeePipe  = AeroGear.Pipeline([{
        name: "employees",
        settings: {
            baseURL: "http://10.193.20.199/aerogear/",
            endpoint: "get_data_simple.php"
        }
    }
 ]).pipes.employees;

var dm = AeroGear.DataManager("employeesStore");
EmployeesStore = dm.stores["employeesStore"];


/* Builds the updated table for the member list */
function buildEmployeeRows() {
    return _.template( $( "#employees-tmpl" ).html(), {"employees": EmployeesStore.read()});
}

/* Uses JAX-RS GET to retrieve current member list */
function updateEmployeeTable(pageElm, queryStr) {
	employeePipe.read({
        success: function( data ) {
        	EmployeesStore.save( data , true);
            pageElm.html( buildEmployeeRows() );
            pageElm.listview( "refresh" );
            pageElm.trigger( "updatelayout");
        },
        error: function(jqXHR, textStatus) {
        	console.log("error: " + textStatus);
        },
        query: {
            query: queryStr,
            clienttype: "html5"
        },
        jsonp: true
    });
}

// will soon use data manager to handle these calls, initially every query goes to server
function updateDialog(queryStr) {
	employeePipe.read({
        success: function( data ) {
        	$.each(data, function(i, empl){
        		$.each(empl, function(j, inf){
	        		if(j == "cn")
	    				$("#info-aside #employee_info #name").html(inf);
	        		if(j == "rhatlocation")
	    				$("#info-aside #employee_info #location").html(inf);
	        		if(j == "mail")
	    				$("#info-aside #employee_info #email").html(inf);
        		});
        	});
        	
        },
        error: function(jqXHR, textStatus) {
        	console.log("error: " + textStatus);
        },
        query: {
            query: queryStr,
            clienttype: "html5"
        },
        jsonp: true
    });
}