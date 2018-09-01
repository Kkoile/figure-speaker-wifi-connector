
function getAvailableNetworks(callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            callback(JSON.parse(xmlHttp.responseText));
        }
    }
    xmlHttp.open("GET", "/availableNetworks", true);
    xmlHttp.send(null);
}

function connectToNetwork(oNetwork) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            alert("Successfully connected to network. You can close this window now!");
        } else if(xmlHttp.readyState == 4 && xmlHttp.status == 400) {
            alert("Could not connect to network");
        }
    }
    xmlHttp.open("POST", "/connectToNetwork", true);
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    xmlHttp.send(JSON.stringify(oNetwork));
}

function askForPasswordAndConnectToNetwork(oNetwork) {
    var sPassword = prompt("Please enter the password of the network");
    if (sPassword) {
        oNetwork.password = sPassword;
        connectToNetwork(oNetwork);
    }
}

getAvailableNetworks(function(aNetworks) {
    var oList = document.getElementById('available-networks');
    aNetworks.forEach(function(oNetwork) {
        var oEntry = document.createElement('li');
        oEntry.appendChild(document.createTextNode(oNetwork.ssid));
        var oButton = document.createElement("button");
        oButton.appendChild(document.createTextNode("Connect"));
        oButton.addEventListener("click", askForPasswordAndConnectToNetwork.bind(this, oNetwork));
        oEntry.appendChild(oButton);
        oList.appendChild(oEntry);
    })
});