progressbar = {}

progressbar.init = function() 
{
    progressbar.element = document.createElement("div");
    progressbar.element.className = "progressbarElement";
    
    progressbar.status = document.createElement("div");
    progressbar.status.textContent = "Loading...";
    progressbar.element.appendChild(progressbar.status);
    
    progressbar.pbar = document.createElement("progress");
    progressbar.pbar.value = 0;
    progressbar.pbar.max = 100;
    progressbar.pbar.className = "progressbar";
    progressbar.element.appendChild(progressbar.pbar);
    
    document.body.appendChild(progressbar.element);
}

progressbar.remove = function() 
{
    document.body.removeChild(progressbar.element);
}

progressbar.addValue = function(value) 
{
    progressbar.pbar.value += value;
}

