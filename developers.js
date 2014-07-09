var developers = {}

function downloadData(url, success) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function(e) {
        if (xhr.readyState == 4) {
            if (xhr.status == 200)
                success(xhr);
        }
    }
    xhr.send();
}

developers.getDevelopersList = function() {
    var url = "developers.json";
    downloadData(url, developers.recieveDevelopersList)
}

developers.list = {}
developers.recieveDevelopersList = function(xhr) {
    var fileData = xhr.responseText;
    developers.list = JSON.parse(fileData);
    responsibility.getTests();
}

