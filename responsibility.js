responsibility = {}

responsibility.getTests = function()
{
    url = "responsibility";
    downloadData(url, responsibility.recieveTests);
}

responsibility.recieveTests = function(xhr)
{
    var fileData = xhr.responseText.split("\n");
    
    currentTest = "";
    responsibility.tests = {}
    
    for (var i = 0; i < fileData.length; i++) {
        if (currentTest == "") {
            currentTest = "/" + fileData[i];
            responsibility.tests[currentTest] = []
        } else if (fileData[i] == "###") {
            currentTest = "";
        } else {
            var name = emailParse(fileData[i]);
            if (name != "" && typeof(developers.list[name]) != "undefined" && responsibility.tests[currentTest].indexOf(name) == -1)
                responsibility.tests[currentTest].push(name);
        }
    }
    
    tests.distribute();
}

function emailParse(str) 
{
    parts = str.split("@");
    if (parts.length != 2)
        return "";
    return parts[0];
}