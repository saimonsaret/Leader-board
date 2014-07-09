var builders = builders || {};
builders.results = {}
builders.ready = 0;

function downloadBuilderData(url, param, success) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function(e) {
        if (xhr.readyState == 4) {
            if (xhr.status == 200)
                success(param, xhr);
        }
    }
    xhr.send();
}

function LOAD_BUILDBOT_DATA(builderData)
{
    builders.masters = {};
    builderData['masters'].forEach(function(master) {
        builders.masters[master.name] = new builders.BuilderMaster(master);
    });
    
    var names = builders.masters.ChromiumWebkit.tests["layout-tests"].builders;
    builders.names = names;
    
    builders.size = 0;
    for (i = 0; i < names.length; i++)
        if (i != 0 && names[i] != names[i - 1] && names[i].indexOf("Oilpan") == -1) {
            builders.getBuilderData(names[i]);
            builders.size++;
        }
}

builders.BuilderMaster = function(master_data)
{
    this.name = master_data.name;
    this.basePath = 'http://build.chromium.org/p/' + master_data.url_name;
    this.tests = master_data.tests;
}

builders.getBuilderData = function(builderName) 
{
    url = "https://test-results.appspot.com/testfile?builder=" + builderName + "&master=ChromiumWebkit&testtype=layout-tests&name=results-small.json";
    downloadBuilderData(url, builderName, builders.recieveBuilderData);
}

builders.recieveBuilderData = function(builderName, xhr) 
{
    var fileData = xhr.responseText;
    builders.results[builderName] = JSON.parse(fileData);
    builders.ready++;
    progressbar.addValue((1 / builders.size) * 100);
    if (builders.ready == builders.size) 
        tests.distribute();
}
 

