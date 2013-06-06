/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
initialize: function() {
    this.bindEvents();
},
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
},
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
onDeviceReady: function() {
    app.receivedEvent('deviceready');
},
    // Update DOM on a Received Event
receivedEvent: function(id) {
    
    $( "#container" ).show();
    //Fetches the initial member data and populates the table using lodash templates
    //updateMemberTable();
    
    $( "#autocomplete" ).on( "listviewbeforefilter", function ( e, data ) {
                            var $ul = $( this ),
                            $input = $( data.input ),
                            value = $input.val(),
                            html = "";
                            $ul.html( "" );
                            if ( value && value.length > 2 ) {
                            $ul.html( "<li><div class='ui-loader'><span class='ui-icon ui-icon-loading'></span></div></li>" );
                            $ul.listview( "refresh" );
                            updateEmployeeTable($ul, $input.val());
                            }
                            });
    
    
    $.fn.serializeObject = function() {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function() {
               if (o[this.name]) {
               if (!o[this.name].push) {
               o[this.name] = [o[this.name]];
               }
               o[this.name].push(this.value || '');
               } else {
               o[this.name] = this.value || '';
               }
               });
        return o;
    };
    console.log('Received Event: ' + id);
}
};
