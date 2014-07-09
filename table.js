table = {}

function devComp(a, b) {
    return (b.karma - a.karma);
}

table.createTable = function() 
{
    
    list = [];
    for (var developer in developers.list) {
        developers.list[developer].login = developer;
        list.push(developers.list[developer]);
    }
    
    for (var i = 0; i < list.length; i++) {
        list[i].karma = (1 - list[i].correctTestCount / list[i].testCount) * 100;
    }
    
    list.sort(devComp);
    
    progressbar.remove();
    
    ratingTable = document.createElement("table");
    
    for (var i = 0; i < list.length; i++) {
        
        var line = document.createElement("tr");
        
        var rank  = document.createElement("td");
        rank.className = "rank";
        rank.textContent = (i + 1);
        line.appendChild(rank);
        
        var image = document.createElement("img");
        image.src = list[i].image;
        imageCell = document.createElement("td");
        imageCell.appendChild(image);
        line.appendChild(imageCell);
        
        var info = document.createElement("td");
        info.className = "info";
        
        var linkToProfile = document.createElement("a");
        linkToProfile.href = list[i].ref;
        linkToProfile.textContent = list[i].login;
        linkToProfile.className = "name";
        info.appendChild(linkToProfile);
        
        var karma  = document.createElement("div");                         
        karma.textContent = list[i].karma.toFixed(1) + "% ";
        karma.textContent += "(" + (list[i].testCount - list[i].correctTestCount) + " of " + list[i].testCount + " failed)";
        info.appendChild(karma);
        
        line.appendChild(info);
        list[i].worstTests.sort(devComp);
        
        var worstTestsPercent = document.createElement("td");
        var worstTestsLink = document.createElement("td");
        worstTestsPercent.className = "percent";
        worstTestsPercent.align = "right";
        worstTestsLink.className = "links";
        
        for (var j = 0; j < list[i].worstTests.length; j++) {
            
            var currentKarma = document.createElement("div");
            currentKarma.textContent = (list[i].worstTests[j].karma * 100).toFixed(1) + "% ";
            worstTestsPercent.appendChild(currentKarma);
            
            var currentTest  = document.createElement("a");
            currentTest.className = "test";
            currentTest.textContent = list[i].worstTests[j].builder + "/" + list[i].worstTests[j].name;
            currentTest.href = "http://test-results.appspot.com/dashboards/flakiness_dashboard.html#group=%40ToT%20Blink&tests=" + list[i].worstTests[j].name;
            worstTestsLink.appendChild(currentTest);
            worstTestsLink.appendChild(document.createElement("br"));
        }
        line.appendChild(worstTestsPercent);
        line.appendChild(worstTestsLink);
        
        
        ratingTable.appendChild(line);
    }
    
    document.body.appendChild(ratingTable);
}