tests = {}
tests.ready = 0;
tests.isReady = 2;

tests.nothing = 0;
tests.inspectorFound = 1;
tests.topicFound = 2;

tests.distribute = function() 
{
    tests.ready++;
    if (tests.ready < tests.isReady)
        return;
    
    for (var devName in developers.list) {
        developer = developers.list[devName];
        developer.testCount = 0;
        developer.correctTestCount = 0;
        developer.worstTests = [];
    }
    
    for (var builderName in builders.results) {
        testPath = builders.results[builderName][builderName].tests;      
        tests.analyse(testPath, "", builderName);
    }
    
    table.createTable();
}   

tests.analyse = function(node, prevDirName, builderName) 
{
    if (!(node instanceof Object))
        return;
    
    if (typeof(node.results) != "undefined") {
        if (typeof(responsibility.tests[prevDirName]) == "undefined")
            return;
        tests.addResults(node.results, prevDirName, builderName);
        return;
    }
    
    for (var link in node) {
        tests.analyse(node[link], prevDirName + "/" + link, builderName);
    }
}

tests.addResults = function(results, testName, builderName) {
    
    for (var i = 0; i < responsibility.tests[testName].length; i++) {
        
        var devName = responsibility.tests[testName][i];
        
        if (typeof(developers.list[devName]) == "undefined")
            continue;
    
        var successCount = 0;
        var allCount = 0;

        var developer = developers.list[devName];   
        for (var j = 0; j < results.length; j++) {

            if (results[j][1] == "X" || results[j][1] == "W" || results[j][1] == "N" || results[j][1] == "Y")
                continue;

            if (results[j][1] == "P")
                successCount += results[j][0];
            allCount += results[j][0];
        }
        developer.correctTestCount += successCount;
        developer.testCount += allCount;

        if (allCount == 0)
            return;
        var testKarma = 1 - successCount / allCount;
        tests.addWorstTest(developer, testKarma, testName, builderName);
    }
}

tests.addWorstTest = function(developer, testKarma, testName, builderName) {
    
    var test = {karma: testKarma, name: testName.substring(1, testName.length), builder: builderName};
    
    var isInserted = false;
    
    for (var i = 0; i < developer.worstTests.length; i++) {
        if (developer.worstTests[i].karma < testKarma) {
            developer.worstTests.splice(i, 0, test); 
            isInserted = true;
            if (developer.worstTests.length > 10)
                developer.worstTests.splice(10, 1);
            break;
        }
    }
    
    if (developer.worstTests.length < 10 && !isInserted) {
        developer.worstTests.push(test);
    }
        
}
