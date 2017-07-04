/**
 * An XMLHttpRequest has 5 different readystates that indicate info about the status of the request.
 * When readystate === 4, this means the server has finshed transferring its response to the browser
 */
var readyStateValues = {
    0: 'Xhr Client Created',
    1: 'Connection Established',
    2: 'Response Headers Received',
    3: 'Downloading responseText',
    4: 'Finished!'
};

function getJSON() {
    var xhr = createXMLHttpRequestObject(); // Step 1: determine which XMLHttpRequest Object to use

    //Step 2: attach an onreadystatechange callback to the xhr object.
    //        instead of onreadystatechange, onload could also be used.
    xhr.onreadystatechange = function() {
        // for demo purposes, put a new readystate row in the table
        var tableRow = createReadyStateRow(xhr.readyState);
        document.querySelector('tbody').appendChild(tableRow);
        if(xhr.readyState === 4) {
            console.log('request has completed');
            console.log(xhr.responseText);
            document.getElementById('json').classList.remove('hidden')
            document.getElementById('json').appendChild(
                document.createTextNode(xhr.responseText)
            )
            document.getElementById('explanation').classList.remove('hidden')
        }
    }

    document.querySelector('table').classList.remove('hidden')
    // state starts at 0, so append that row to begin
    var tableRow = createReadyStateRow(xhr.readyState);
    document.querySelector('tbody').appendChild(tableRow);

    // Step 3: make the request by calling open and send.
    //         open accepts 3 params: (requestMethodString, URLString, asyncBoolean)

    xhr.open('GET', 'https://jsonplaceholder.typicode.com/users/1', true);
    xhr.send();
}

/**
 * Step 1: determine which XMLHttpRequest Object to use
 *
 * IE has a different XMLHttpRequest Object than other modern browsers.
 *
 * This function checks first to see if IE's version is attached to window,
 * if so, it uses that to create the XMLHttpRequest object,
 * else, it uses the standard XMLHttpRequest object found in other browsers!
 */
function createXMLHttpRequestObject() {
    if (window.ActiveXObject) {
        // we're in IE! Use this to construct xhr request.
        return new ActiveXObject("Microsoft.XMLHTTP");
    } else {
        // we're not in IE! Hooray!
        return new XMLHttpRequest();
    }
}

// function for creating new table rows from scratch
function createReadyStateRow(readyState) {
    var tableRow = document.createElement('tr');
    var col1 = document.createElement('td');
    var col2 = document.createElement('td');

    // put texts in the right columns
    col1.appendChild(document.createTextNode(readyState));
    col2.appendChild(document.createTextNode(readyStateValues[readyState]));

    //append columns to tableRow
    tableRow.appendChild(col1);
    tableRow.appendChild(col2);

    return tableRow;
}